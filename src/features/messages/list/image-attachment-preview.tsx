import styles from './image-attachment-preview.module.scss';

type ImageAttachmentPreviewProps = {
  ext: string | null;
  src: string;
  alt?: string;
};

export function ImageAttachmentPreview({ ext, src, alt }: ImageAttachmentPreviewProps) {
  return (
    <div className={styles.card}>
      <a href={src} target="_blank">
        <img src={src} alt={alt} />
      </a>
      {ext === 'gif' && <div className={styles.label}>GIF</div>}
    </div>
  );
}