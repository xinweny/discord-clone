import { useEffect, useState } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';

import type { CreateDMFields } from '../types';
import { RelationStatus } from '@features/relations/types';

import { useContacts } from '@features/relations/hooks';

import { SubmitButton } from '@components/ui/forms';

import { CreateDmFormHeader } from './create-dm-form-header';
import { ParticipantCheckboxInput } from './participant-checkbox-input';
import { ParticipantSearchInput } from './participant-search-input';
import { RemoveParticipantButtons } from './remove-participant-buttons';

const MAX_PARTICIPANTS = 10;

export function CreateDmForm() {
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
  });
  const {
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = async (data: CreateDMFields) => {
    console.log(data.participantIds);
    reset(defaultValues);
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
        {friends.map((friend) => <ParticipantCheckboxInput
          key={friend._id}
          participant={friend.user}
          name="participantIds"
        />)}
        <SubmitButton>Create DM</SubmitButton>
      </form>
    </FormProvider>
  );
}