import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { DMData, EditDMFields } from '../types';

import { editGroupNameSchema } from '../schema';

import { getDmInfo } from '../utils';

import { useGetUserData } from '@features/auth/hooks';

import { TextInput } from '@components/ui/forms';

import { useUpdateDmMutation } from '../api';

import styles from './edit-group-name-form.module.scss';

type EditGroupNameFormProps = {
  dm: DMData
};

export function EditGroupNameForm({ dm }: EditGroupNameFormProps) {
  const { name } = dm;

  const { user } = useGetUserData();

  const { name: defaultName } = getDmInfo(dm, user.data!._id);

  const defaultValues = {
    dmId: dm._id,
    name: name || defaultName,
  };

  const [editDm] = useUpdateDmMutation();

  const methods = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(editGroupNameSchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: EditDMFields) => {
    if (data.name?.trim() === defaultName) return;

    await editDm(data).unwrap();

    reset(data);
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form}>
        <TextInput
          name="name"
          id="name"
          rules={{
            onBlur: handleSubmit(onSubmit),
          }}
        />
      </form>
    </FormProvider>
  );
}