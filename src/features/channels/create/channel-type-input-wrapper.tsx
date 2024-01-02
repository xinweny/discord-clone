import { useWatch, useFormContext } from 'react-hook-form';

import styles from './channel-type-input-wrapper.module.scss';

type ChannelTypeInputWrapperProps = {
  value: string;
  radioInput: React.ReactNode;
  icon: React.ReactNode;
  label: string;
  description: string;
};

export function ChannelTypeInputWrapper({
  value,
  radioInput,
  icon,
  label,
  description,
}: ChannelTypeInputWrapperProps) {
  const { control, setValue } = useFormContext();

  const name = 'type';

  const val = useWatch({ control, name });

  return (
    <div
      className={`${styles.field} ${val === value ? styles.selected : ''}`} role="radio"
      onClick={() => { setValue(name, value); }}
    >
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.content}>
        <h4>{label}</h4>
        <span>{description}</span>
      </div>
      {radioInput}
    </div>
  );
}