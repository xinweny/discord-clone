import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SearchIcon from '@assets/icons/search.svg?react';
import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './server-search-form.module.scss';

type ServerSearchFormProps = {
  page?: number;
  className?: string;
};

export function ServerSearchForm({
  page = 1,
  className,
}: ServerSearchFormProps) {
  const [params] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: { query: params.get('query') || '' },
  });
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    navigate(`/servers?query=${data.query}&page=${page}&limit=12`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} ${className || ''}`}>
      <input
        type="text" id="query"
        {...register('query', { required: true })}
        placeholder="Explore communities"
      />
      <button
        type={isDirty ? 'reset' : 'submit'}
        onClick={() => { if (isDirty) reset(); }}
      >
        {isDirty
          ? (
            <div className={styles.reset}>
              <CrossIcon />
            </div>
          )
          : <SearchIcon />
        }
      </button>
    </form>
  );
}