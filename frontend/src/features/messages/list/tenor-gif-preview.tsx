import styles from './tenor-gif-preview.module.scss';

type TenorGifPreviewProps = {
  url: string;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TenorGifPreview({ url, setError }: TenorGifPreviewProps) {
  return (
    <img
      className={styles.gif}
      src={url}
      alt="GIF"
      onError={() => { setError(true); }}
    />
  );
}