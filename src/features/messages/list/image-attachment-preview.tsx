import { Gif } from '@components/ui/media';

type ImageAttachmentPreviewProps = {
  ext: string | null;
  src: string;
  alt?: string;
};

export function ImageAttachmentPreview({ ext, src, alt }: ImageAttachmentPreviewProps) {
  return (
    <div>
      {ext === 'gif'
        ? <Gif src={src} alt={alt} />
        : <img src={src} alt={alt} />
      }
      {ext === 'gif' && <div>GIF</div>}
    </div>
  )
}