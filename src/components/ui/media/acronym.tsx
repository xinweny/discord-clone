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
      <p>{acronym}</p>
    </div>
  );
}