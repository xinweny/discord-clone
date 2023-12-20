import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@assets/icons/search.svg?react';
import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './server-search-form.module.scss';

export function ServerSearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    navigate(`/servers?query=${data.query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        type="text" id="query"
        {...register('query', { required: true })}
        placeholder="Explore communities"
      />
      <button
        type={isDirty ? 'reset' : 'submit'}
        onClick={() => { if (isDirty) reset(); }}
      >
        {isDirty ? <CrossIcon /> : <SearchIcon />}
      </button>
    </form>
  );
}