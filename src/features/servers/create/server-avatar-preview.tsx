type ServerAvatarPreviewProps = {
  placeholderSrc: string;
  previewSrc: string | null | undefined;
};

export function ServerAvatarPreview({ placeholderSrc, previewSrc }: ServerAvatarPreviewProps) {
  return (
    <div>
      <img
        src={previewSrc || placeholderSrc}
        alt={previewSrc ? 'Preview' : 'Upload'}
      />
    </div> 
  )
}