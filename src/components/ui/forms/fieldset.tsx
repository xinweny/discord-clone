import styles from './fieldset.module.scss';

type FieldSetGroupProps = {
  legend: string;
  children: React.ReactNode;
};

export function Fieldset({ legend, children }: FieldSetGroupProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend>{legend.toUpperCase()}</legend>
      <div className={styles.options}>
        {children}
      </div>
    </fieldset>
  );
}