import styles from './portals.module.scss';

type PortalsProps = {
  numLayers: number;
};

export function Portals({ numLayers }: PortalsProps) {
  const nums = [...Array(numLayers).keys()];

  return (
    <div className={styles.portals}>
      {nums.map((n) => (
        <div
          key={n}
          id={`portal_layer_${n}`}
          className={styles.container}
          style={{ zIndex: n + 1 }}
        ></div>
      ))}
    </div>
  )
}