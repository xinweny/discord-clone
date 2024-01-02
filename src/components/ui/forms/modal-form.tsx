import styles from './modal-form.module.scss';

type ModalFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  submitComponent?: React.ReactNode;
};

export function ModalForm({
  onSubmit,
  children,
  submitComponent,
}: ModalFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.content}>
        {children}
      </div>
      {submitComponent && (
        <div className={styles.submit}>
          {submitComponent}
        </div>
      )}
    </form>
  );
}