import { useEffect, useState } from 'react';
import './App.css';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const contentfulClient = createClient({
  space: import.meta.env.VITE_PUBLIC_SPACE_ID,
  accessToken: import.meta.env.VITE_PUBLIC_ACCESS_TOKEN,
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

function GalleryPostCard({ entry }) {
  const imageUrl = entry.fields.image.fields.file.url;

  return (
    <div>
      <img src={imageUrl} alt={entry.fields.image.fields.title} />
      <div>{documentToReactComponents(entry.fields.description)}</div>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [entries, header] = await Promise.all([
          contentfulClient.getEntries({ content_type: 'galleryPost' }),
          contentfulClient.getEntries({ content_type: 'headerimage' }),
        ]);

        setData(entries);
        setHeaderData(header);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchAllData();
  }, []);

  return (
    <>
      {headerData?.items[0] && <HeaderCard entry={headerData.items[0]} /> }
      {data?.items.map((entry) => (
        <GalleryPostCard key={entry.sys.id} entry={entry} />
      ))}
    </>
  );
}

export default App;
