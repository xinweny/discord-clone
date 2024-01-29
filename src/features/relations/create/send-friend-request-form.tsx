import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { RelationStatus, type CreateRelationFields } from '../types';

import { handleServerError } from '@utils';

import { sendFriendRequestSchema } from '../schema';

import { useGetUserData } from '@features/auth/hooks';

import {
  SubmittedMessage,
  SubmitButton,
  TextInput
} from '@components/ui/forms';
import { NullMessage } from '@components/ui/displays';

import { useCreateRelationMutation } from '../api';

import wumpus2 from '@assets/static/wumpus_2.svg';
import CompassIcon from '@assets/icons/compass.svg?react';
import RightArrowIcon from '@assets/icons/right-arrow.svg?react';

import styles from './send-friend-request.module.scss';

export function SendFriendRequestForm() {
  const { user } = useGetUserData();

  const navigate = useNavigate();

  const [submittedName, setSubmittedName] = useState<string>('');

  const defaultValues = {
    status: RelationStatus.PENDING_TO,
    senderId: user.data!.id,
    username: '',
  };

  const methods = useForm<CreateRelationFields>({
    defaultValues,
    resolver: zodResolver(sendFriendRequestSchema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { isValid },
  } = methods;

  const [createRelation] = useCreateRelationMutation();

  const onSubmit = async (data: CreateRelationFields) => {
    try {
      await createRelation(data).unwrap();

      setSubmittedName(data.username!);

      reset(defaultValues);
    } catch (error) {
      let errMsg = '';

      ['User not found.', 'Cannot add self.'].forEach(message => {
        handleServerError(error, {
          status: 400,
          message,
        }, () => { errMsg = 'Hm, that didn\'t work. Double-check that the username is correct.' });
      });

      handleServerError(error, {
        status: 400,
        message: 'Relation already exists.',
      }, () => {
        errMsg = 'You have already added/befriended/blocked this user.';
      });

      setError('username', {
        type: 'custom',
        message: errMsg,
      });
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.form}>
        <h3>ADD FRIEND</h3>
        <p>You can add friends with their Discord username.</p>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.input} ${!isValid ? styles.withError : ''}`}>
              <TextInput
                name="username"
                label="username"
                id="username"
                placeholder="You can add friends with their Discord username."
                required
              />
              <SubmitButton>Send Friend Request</SubmitButton>
            </div>
            <div className={`${styles.message} ${!isValid ? styles.withError : ''}`}>
              <SubmittedMessage
                name="username"
                successMsg={`Success! Your friend request to ${submittedName} was sent.`}
              />
            </div>
          </form>
        </FormProvider>
      </div>
      <div className={styles.footer}>
        <h3>OTHER PLACES TO MAKE FRIENDS</h3>
        <button onClick={() => { navigate('/servers'); }}>
          <div>
            <CompassIcon />
          </div>
          <p>Explore Discoverable Servers</p>
          <RightArrowIcon />
        </button>
      </div>
      <NullMessage
        src={wumpus2}
        message="Wumpus is waiting on friends. You don't have to, though!"
      />
    </div>
  );
}