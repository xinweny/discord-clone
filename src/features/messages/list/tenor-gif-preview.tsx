type TenorGifPreviewProps = {
  url: string;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};



export function TenorGifPreview({ url, setError }: TenorGifPreviewProps) {
  return (
    <img src={url} alt="GIF" onError={() => { setError(true); }} />
  );
}