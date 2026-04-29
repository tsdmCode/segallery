import { useEffect, useState } from 'react';
import './App.css';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Grid } from './components/Grid/Grid';
import { GalleryPostCard } from './components/GalleryPostCard/GalleryPostCard';

const contentfulClient = createClient({
  space: import.meta.env.VITE_PUBLIC_SPACE_ID,
  accessToken: import.meta.env.VITE_PUBLIC_ACCESS_TOKEN,
  host: typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'localhost:5173/contentful' 
    : 'cdn.contentful.com',
});

function HeaderCard({ entry }) {
  const imageUrl = entry.fields.header.fields.file.url;
  const title = entry.fields.header.fields.title;

  return (
    <div>
      <img src={imageUrl} alt={title} />
      <div>{documentToReactComponents(entry.fields.gallerydescription)}</div>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllData() {
      try {
        console.log('Fetching from Contentful...');
        console.log('Space ID:', import.meta.env.VITE_PUBLIC_SPACE_ID);
        
        const [entries, header] = await Promise.all([
          contentfulClient.getEntries({ content_type: 'galleryPost' }),
          contentfulClient.getEntries({ content_type: 'headerimage' }),
        ]);

        setData(entries);
        setHeaderData(header);
        setError(null);
      } catch (error) {
        console.error('Error fetching from Contentful:', error);
        console.error('Error message:', error.message);
        console.error('Error status:', error.response?.status);
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
    </>
  );
}

export default App;
