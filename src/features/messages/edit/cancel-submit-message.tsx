import styles from './cancel-submit-message.module.scss';

type CancelSubmitMessageProps = {
  clickHandlers: {
    cancel: React.MouseEventHandler;
    submit: React.MouseEventHandler;
  };
};

export function CancelSubmitMessage({
  clickHandlers
}: CancelSubmitMessageProps) {
  const { cancel, submit } = clickHandlers;

  return (
    <p className={styles.message}>escape to <button type="button" onClick={cancel}>cancel</button> · enter to <button type="button" onClick={submit}>save</button></p>
  );
}