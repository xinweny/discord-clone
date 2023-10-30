import styles from './acronym.module.scss';

type AcronymProps = {
  name: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Acronym({
  name,
  ...props
}: AcronymProps) {
  const acronym = name
    .split(' ')
    .map(str => str[0])
    .join('');

  return (
    <div {...props} className={`${props.className || ''} ${styles.acronym}`}>
      <h3>{acronym}</h3>
    </div>
  );
}