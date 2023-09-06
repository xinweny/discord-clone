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
    control,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'participantIds',
    rules: { minLength: 1, maxLength: 9 },
  });

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
        {fields.map((field, index) => <ParticipantCheckboxInput
          key={field.id}
          participant={friend.user}
          name={`participantIds.${index}.value`}
        />)}
        <SubmitButton>Create DM</SubmitButton>
      </form>
    </FormProvider>
  );
}