export const useCustomSubmitHandlers = (
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
) => {
  const enterSubmit: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const clickSubmit: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return {
    enterSubmit,
    clickSubmit,
  };
}

export const useCustomCancelHandlers = (cancel: () => void) => {
  const escapeCancel: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  };

  const clickCancel: React.MouseEventHandler = (e) => {
    e.preventDefault();
    cancel();
  };

  return {
    escapeCancel,
    clickCancel,
  };
};