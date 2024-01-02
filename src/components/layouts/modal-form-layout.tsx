import styles from './modal-form-layout.module.scss';

type ModalFormLayoutProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  submitComponent?: React.ReactNode;
};

export function ModalFormLayout({
  onSubmit,
  children,
  submitComponent,
}: ModalFormLayoutProps) {
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