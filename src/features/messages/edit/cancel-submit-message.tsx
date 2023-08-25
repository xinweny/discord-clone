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
    <p>escape to <button type="button" onClick={cancel}>cancel</button>·enter to <button type="button" onClick={submit}>save</button></p>
  );
}