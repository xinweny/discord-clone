import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { createDmSchema } from '../schema';

import type { CreateDMFields } from '../types';
import type { ErrorResponse } from '@types';
import { ContactsTabs } from '@features/relations/types';

import { handleServerError } from '@utils';

import { useGetUserData } from '@features/auth/hooks';
import { useContacts, useSearchContacts } from '@features/relations/hooks';

import { SubmitButton } from '@components/ui/forms';
import { NullMessage } from '@components/ui/displays';

import { CreateDmFormHeader } from './create-dm-form-header';
import { ParticipantCheckboxInput } from './participant-checkbox-input';
import { ParticipantSearchInput } from './participant-search-input';
import { RemoveParticipantButtons } from './remove-participant-buttons';

import { useGetRelationsQuery } from '@features/relations/api';
import { useCreateDmMutation } from '../api';

import magnifyingGlass from '@assets/static/magnifying-glass.svg';

import styles from './create-dm-form.module.scss';

const MAX_PARTICIPANTS = 10;

type CreateDMFormProps = {
  btnRef: React.RefObject<HTMLButtonElement>;
};

export function CreateDmForm({
  btnRef
}: CreateDMFormProps) {
  const [query, setQuery] = useState<string>('');

  const { user } = useGetUserData();
  const { data: relations } = useGetRelationsQuery(user.data!.id);

  const friends = useContacts(relations, ContactsTabs.ALL);
  const searchedFriends = useSearchContacts(friends, query);

  const navigate = useNavigate();

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
    try {
      const dm = await createDm(data).unwrap();

      reset(defaultValues);
      btnRef.current?.click();
      navigate(`/channels/@me/${dm._id}`);
    } catch (err) {
      const error = err as ErrorResponse;

      handleServerError(error, {
        status: 400,
        message: 'DM already exists.',
      }, () => {
        reset(defaultValues);
        btnRef.current?.click();
        navigate(`/channels/@me/${error.data.data._id}`);
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <CreateDmFormHeader
          name="participantIds"
          maxMembers={MAX_PARTICIPANTS}
        >
          <RemoveParticipantButtons
            friends={friends}
            name="participantIds"
          />
          <ParticipantSearchInput
            name="participantIds"
            query={query}
            setQuery={setQuery}
          />
        </CreateDmFormHeader>
        <div className={styles.list}>
          {searchedFriends.length > 0
              ? searchedFriends.map((friend) => <ParticipantCheckboxInput
              key={friend._id}
              participant={friend.user}
              name="participantIds"
            />)
            : <NullMessage src={magnifyingGlass} message="No friends found." gap={20} className={styles.noResult} />
          }
        </div>
        <div className={styles.submitContainer}>
          <SubmitButton>Create DM</SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
}