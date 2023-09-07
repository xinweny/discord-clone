import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createDmSchema } from '../schema';

import type { CreateDMFields } from '../types';
import { RelationStatus } from '@features/relations/types';

import { useContacts } from '@features/relations/hooks';

import { SubmitButton } from '@components/ui/forms';
import { NullMessage } from '@components/ui/displays';

import { CreateDmFormHeader } from './create-dm-form-header';
import { ParticipantCheckboxInput } from './participant-checkbox-input';
import { ParticipantSearchInput } from './participant-search-input';
import { RemoveParticipantButtons } from './remove-participant-buttons';

import { useCreateDmMutation } from '../api';

const MAX_PARTICIPANTS = 10;

type CreateDMFormProps = {
  btnRef: React.RefObject<HTMLButtonElement>;
};

export function CreateDmForm({
  btnRef
}: CreateDMFormProps) {
  const [query, setQuery] = useState<string>('');

  const {
    contacts: friends,
    filterContactsByStatus,
  } = useContacts(query);

  useEffect(() => {
    filterContactsByStatus(RelationStatus.FRIENDS);
  }, []);

  const defaultValues = {
    participantIds: [],
  };

  const methods = useForm<CreateDMFields>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(createDmSchema),
  });
  const {
    handleSubmit,
    reset,
  } = methods;

  const [createDm] = useCreateDmMutation();

  const onSubmit = async (data: CreateDMFields) => {
    await createDm(data).unwrap();
    reset(defaultValues);
    btnRef.current?.click();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateDmFormHeader
          name="participantIds"
          maxMembers={MAX_PARTICIPANTS}
        />
        <div>
          <RemoveParticipantButtons
            friends={friends}
            name="participantIds"
          />
          <ParticipantSearchInput
            name="participantIds"
            query={query}
            setQuery={setQuery}
          />
        </div>
        {friends.length > 0
            ? friends.map((friend) => <ParticipantCheckboxInput
            key={friend._id}
            participant={friend.user}
            name="participantIds"
          />)
          : <NullMessage src="#" message="No friends found." />
        }
        <SubmitButton>Create DM</SubmitButton>
      </form>
    </FormProvider>
  );
}