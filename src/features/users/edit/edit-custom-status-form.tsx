import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { UpdateUserFields } from '../types';

import { editCustomStatusSchema } from '../schema';

import { useGetUserData } from '@features/auth/hooks';
import { useGetUserQuery } from '../api';

import { ModalForm } from '@components/ui/forms';

import {
  FormGroup,
  TextInput,
  ResetSubmitButtons,
} from '@components/ui/forms';

import { useUpdateUserMutation } from '../api';

type EditCustomStatusFormProps = {
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

export function EditCustomStatusForm({
  closeBtnRef,
}: EditCustomStatusFormProps) {
  const { user } = useGetUserData();
  const userId = user.data!.id;

  const { data: self } = useGetUserQuery(userId);

  const defaultValues = {
    userId,
    customStatus: self?.customStatus || '',
  };

  const methods = useForm<UpdateUserFields>({
    defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(editCustomStatusSchema),
  });

  const { handleSubmit } = methods;

  const [editCustomStatus] = useUpdateUserMutation();

  if (!self) return null;

  const { displayName, bannerColor, username } = self;

  const onSubmit = async (data: UpdateUserFields) => {
    const { customStatus } = data;

    if (customStatus && customStatus !== self.customStatus) {
      await editCustomStatus({
        userId,
        username,
        displayName,
        bannerColor,
        customStatus,
      });
    }

    closeBtnRef.current?.click();
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        onSubmit={handleSubmit(onSubmit)}
        submitComponent={<ResetSubmitButtons
          submitLabel="Save"
          closeBtnRef={closeBtnRef}
        />}
      >
        <FormGroup
          label={`What's cookin', ${user.data!.username}?`}
          htmlFor="custom status"
          name="customStatus"
        >
          <TextInput
            type="text"
            id="custom-status"
            name="customStatus"
            rules={{ maxLength: 128 }}
          />
        </FormGroup>
      </ModalForm>
    </FormProvider>
  );
}