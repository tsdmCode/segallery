import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export function HeaderCard({ entry }) {
  const imageUrl = entry.fields.header.fields.file.url;
  const title = entry.fields.header.fields.title;

  return (
    <div>
      <img src={imageUrl} alt={title} />
      <div>{documentToReactComponents(entry.fields.gallerydescription)}</div>
    </div>
  );
}