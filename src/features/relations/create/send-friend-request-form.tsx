import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import type { SendFriendRequestFields } from '../types';
import type { ErrorResponse } from '@types';

import { sendFriendRequestSchema } from '../schema';

import { useGetUserData } from '@hooks';

import {
  SubmittedMessage,
  SubmitButton,
  TextInput
} from '@components/ui/forms';

import { useSendFriendRequestMutation } from '../api';

export function SendFriendRequestForm() {
  const { user } = useGetUserData();

  const navigate = useNavigate();

  const [submittedName, setSubmittedName] = useState<string>('');

  const defaultValues = {
    senderId: user.data!.id,
    username: '',
  };

  const methods = useForm<SendFriendRequestFields>({
    defaultValues,
    resolver: zodResolver(sendFriendRequestSchema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    reset,
    setError,
  } = methods;

  const [sendFriendRequest] = useSendFriendRequestMutation();

  const onSubmit = async (data: SendFriendRequestFields) => {
    try {
      await sendFriendRequest(data).unwrap();

      setSubmittedName(data.username!);

      reset(defaultValues);
    } catch (error) {
      const err = error as ErrorResponse;

      let errMsg = '';

      if (
        err.status === 400 &&
        (err.data.message === 'User not found.' ||
        err.data.message === 'Cannot add self.')
      ) errMsg = 'Hm, that didn\'t work. Double-check that the username is correct.';

      if (err.status === 400 && err.data.message === 'Relation already exists.') errMsg = 'You have already added/befriended/blocked this user.';

      setError('username', {
        type: 'custom',
        message: errMsg,
      });
    }
  };

  return (
    <div>
      <div>
        <h3>ADD FRIEND</h3>
        <p>You can add friends with their Discord usernames.</p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="username"
            label="username"
            id="username"
            placeholder="You can add friends with their Discord usernames."
            required
          />
          <SubmitButton>Send Friend Request</SubmitButton>
          <SubmittedMessage
            name="username"
            successMsg={`Success! Your friend request to ${submittedName} was sent.`}
          />
        </form>
      </FormProvider>
      <div>
        <h3>OTHER PLACES TO MAKE FRIENDS</h3>
        <button onClick={() => { navigate('/servers'); }}>
          <div>
            <img src="#" alt="#" />
            <p>Explore Discoverable Servers</p>
          </div>
          <img src="#" alt="#" />
        </button>
        <div>
          <img src="#" alt="#" />
          <p>Wumpus is waiting on friends. You don't have to, though!</p>
        </div>
      </div>
    </div>
  );
}