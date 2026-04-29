import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import style from "./gallerypostcard.module.scss";

export function GalleryPostCard({ entry }) {
  const imageUrl = entry.fields.image.fields.file.url;

  return (
        <div className={style.card}>
      <div className={style.imageContainer}>
        <img 
          className={style.image}
          src={imageUrl} 
          alt={entry.fields.image.fields.title} 
        />
      </div>
      <div className={style.description}>
        {documentToReactComponents(entry.fields.description)}
      </div>
    </div>
  );
}