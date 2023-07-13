import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function ServerSearchForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    navigate(`/servers?query=${data.query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text" id="query"
        {...register('query', { required: true })}
        placeholder="Explore Gaming servers"
      />
      <button type="submit">
        <img src="#" alt="Discover servers" />
      </button>
    </form>
  );
}