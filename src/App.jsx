import { useEffect, useState } from 'react';
import './App.css';
import { createClient } from 'contentful';
import { Grid } from './components/Grid/Grid';
import { GalleryPostCard } from './components/GalleryPostCard/GalleryPostCard';
import { HeaderCard } from './components/HeaderCard/HeaderCard';

const contentfulClient = createClient({
  space: import.meta.env.VITE_PUBLIC_SPACE_ID,
  accessToken: import.meta.env.VITE_PUBLIC_ACCESS_TOKEN,
  host: typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'localhost:5173/contentful' 
    : 'cdn.contentful.com',
});

function App() {
  const [data, setData] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllData() {
      try {
        
        const [entries, header] = await Promise.all([
          contentfulClient.getEntries({ content_type: 'galleryPost' }),
          contentfulClient.getEntries({ content_type: 'headerimage' }),
        ]);

        setData(entries);
        setHeaderData(header);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchAllData();
  }, []);

  return (
    <>
      {error && (
        <div style={{ padding: '20px', color: 'red', backgroundColor: '#ffe6e6', margin: '10px' }}>
          <strong>Error loading gallery:</strong> {error}
        </div>
      )}
      
      {headerData?.items[0] && <HeaderCard entry={headerData.items[0]} /> }

      <Grid gtc={2} gap={25}>
        
      {data?.items.map((entry) => (
        <GalleryPostCard key={entry.sys.id} entry={entry} />
      ))}
      </Grid>
      <footer>Lavet af TROELS</footer>
    </>
  );
}

export default App;
