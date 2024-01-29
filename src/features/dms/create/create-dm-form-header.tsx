import { useFormContext } from 'react-hook-form';
import pluralize from 'pluralize';

import { ErrorMessage } from '@components/ui/forms';

import styles from './create-dm-form-header.module.scss';

type CreateDmFormHeaderProps = {
  name: string;
  maxMembers: number;
  children: React.ReactNode;
};

export function CreateDmFormHeader({
  name,
  maxMembers,
  children,
}: CreateDmFormHeaderProps) {
  const {  watch } = useFormContext();

  const participantIds = watch(name);

  const limitMsg = `This group has a limit of ${maxMembers} members.`;

  return (
    <div className={styles.header}>
      <h1>Select Friends</h1>
      <ErrorMessage
        name={name}
        validatedMsg={(participantIds.length === maxMembers)
          ? limitMsg
          : `You can add ${pluralize(
            'more friend',
            (maxMembers - 1) - participantIds.length,
            true
          )}.`
        }
      />
      <div className={styles.search}>
        {children}
      </div>
    </div>
  );
}