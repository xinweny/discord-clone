import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createCategorySchema } from './schema';

import { CreateCategoryFields } from '../types';

import {
  FormGroup,
  TextInput,
  ResetSubmitButtons,
} from '@components/ui/forms';

import { useCreateCategoryMutation } from '../api';

type CreateCategoryFormProps = {
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

export function CreateCategoryForm({ closeBtnRef }: CreateCategoryFormProps) {
  const { serverId } = useParams();

  const methods = useForm<CreateCategoryFields>({
    defaultValues: { serverId, name: '' },
    resolver: zodResolver(createCategorySchema),
  });
  const { handleSubmit, reset } = methods;

  const [createCategory] = useCreateCategoryMutation();

  const onSubmit = async (data: CreateCategoryFields) => {
    await createCategory(data).unwrap();

    reset();
    if (closeBtnRef) closeBtnRef.current?.click();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="channel name" htmlFor="channel-name">
          <TextInput
            name="name"
            label="Category Name"
            id="category-name"
            placeholder="New Category"
            maxLength={100}
          />
        </FormGroup>
        <ResetSubmitButtons closeBtnRef={closeBtnRef} submitLabel="Create Category" />
      </form>
    </FormProvider>
  );
}