import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { DMData, EditDMFields } from '../types';

import { editGroupAvatarSchema } from '../schema';

import { ImagePreview } from '@components/ui/media';
import { FileInput } from '@components/ui/forms';

import { useUpdateDmMutation } from '../api';

import defaultGroupAvatarSrc from '@assets/static/default-group-avatar.png';

import styles from './edit-group-avatar-form.module.scss';

type EditGroupAvatarFormProps = {
  dm: DMData,
};

export function EditGroupAvatarForm({ dm }: EditGroupAvatarFormProps) {
  const defaultValues = {
    dmId: dm._id,
    avatar: undefined,
  };

  const methods = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(editGroupAvatarSchema),
  });
  const { handleSubmit, reset } = methods;

  const [editDm] = useUpdateDmMutation();

  const onSubmit = async (data: EditDMFields) => {
    await editDm(data).unwrap();

    reset();
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form}>
        <label htmlFor="upload">
          <ImagePreview name="avatar" className={styles.preview}>
            <img src={dm.imageUrl || defaultGroupAvatarSrc} alt="" />
          </ImagePreview>
          <FileInput
            id="upload"
            name="avatar"
            accept="image/*"
            label="Upload"
            hidden
            rules={{
              onBlur: () => handleSubmit(onSubmit),
            }}
          />
        </label>
      </form>
    </FormProvider>
  );
}