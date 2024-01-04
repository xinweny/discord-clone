import styles from './portals.module.scss';

type PortalsProps = {
  ids: string[];
};

export function Portals({ ids }: PortalsProps) {
  return (
    <div className={styles.portals}>
      {ids.map(id => (
        <div key={id} id={id} className={styles.container}></div>
      ))}
    </div>
  )
}