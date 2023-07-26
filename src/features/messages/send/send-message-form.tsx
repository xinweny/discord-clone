import { useForm } from 'react-hook-form';

import { FormTextArea } from '@components/ui';

type SendMessageFormProps = {
  disable?: boolean;
  placeholder?: string;
};

export function SendMessageForm({ disable = false, placeholder }: SendMessageFormProps) {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    console.log('Submit MSG');
  };

  const enterSubmit: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit(onSubmit)();
  };

  return (
    <form>
      <FormTextArea
        label="body"
        name="body"
        id="body"
        register={register}
        onKeyDown={enterSubmit}
        placeholder={placeholder}
        disabled={disable}
      />
    </form>
  );
}