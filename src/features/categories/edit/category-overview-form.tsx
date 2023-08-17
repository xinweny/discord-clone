import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { EditCategoryFields } from '../types';

import { editCategorySchema } from '../schema';

import { CategoryContext } from '../context';

import {
  FormGroup,
  TextInput,
} from '@components/ui/forms';

import { FormChangesAlert } from '@components/ui/forms';

import { useEditCategoryMutation } from '../api';

export function CategoryOverviewForm() {
  const { serverId } = useParams();
  const category = useContext(CategoryContext);

  const [editCategory] = useEditCategoryMutation();

  const defaultValues = {
    name: category?.name || '',
    categoryId: category?._id,
    serverId,
  };

  const methods = useForm<EditCategoryFields>({
    defaultValues,
    resolver: zodResolver(editCategorySchema),
    mode: 'onChange',
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: EditCategoryFields) => {
    const category = await editCategory(data).unwrap();
    const { name } = category;
    
    reset({
      name,
      serverId,
      categoryId: category._id,
    });
  };

  if (!category) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="Category Name" htmlFor="category-name">
        <TextInput
          name="name"
          id="category-name"
          label="Category Name"
          maxLength={100}
        />
      </FormGroup>
        <FormChangesAlert defaultValues={defaultValues} />
      </form>
    </FormProvider>
  );
}