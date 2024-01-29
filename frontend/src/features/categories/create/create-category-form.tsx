import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createCategorySchema } from '../schema';

import type { CreateCategoryFields } from '../types';

import { ModalForm } from '@components/ui/forms';

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
      <ModalForm
        onSubmit={handleSubmit(onSubmit)}
        submitComponent={<ResetSubmitButtons
          closeBtnRef={closeBtnRef}
          submitLabel="Create Category"
        />}
      >
        <FormGroup label="category name" htmlFor="category-name">
          <TextInput
            name="name"
            label="Category Name"
            id="category-name"
            placeholder="New Category"
            maxLength={100}
          />
        </FormGroup>
      </ModalForm>
    </FormProvider>
  );
}