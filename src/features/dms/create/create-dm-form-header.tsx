import { useFormContext } from 'react-hook-form';
import pluralize from 'pluralize';

import { ErrorMessage } from '@components/ui/forms';

type CreateDmFormHeaderProps = {
  name: string;
  maxMembers: number;
};

export function CreateDmFormHeader({
  name,
  maxMembers,
}: CreateDmFormHeaderProps) {
  const {  watch } = useFormContext();

  const participantIds = watch(name);

  const limitMsg = `This group has a limit of ${maxMembers} members.`;

  return (
    <div>
      <h3>Select Friends</h3>
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
    </div>
  );
}