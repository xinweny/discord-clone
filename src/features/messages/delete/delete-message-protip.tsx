import styles from './delete-message-protip.module.scss';

export function DeleteMessageProtip() {
  return (
    <div className={styles.container}>
      <span>PROTIP:</span>
      <p>You can hold down shift when clicking <strong>delete message</strong> to bypass this confirmation entirely.</p>
    </div>
  );
}