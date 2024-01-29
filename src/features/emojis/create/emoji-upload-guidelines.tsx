import styles from './emoji-upload-guidelines.module.scss';

export function EmojiUploadGuidelines() {
  return (
    <div className={styles.container}>
      <span>Add up to 50 custom emojis that anyone can use in this server.</span>
      <h3>UPLOAD REQUIREMENTS</h3>
      <ul>
        <li>File type: JPEG, PNG, GIF</li>
        <li>Recommended file size: 256 KB</li>
        <li>Recommended dimensions: 128x128</li>
        <li>Naming: Emoji names must be at least 2 characters long and can only contain alphanumeric characters and underscores</li>
      </ul>
    </div>
  );
}