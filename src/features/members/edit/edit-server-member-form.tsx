import { useForm, FormProvider } from 'react-hook-form';

import type { ServerMemberData } from '../types';

import {
  TextInput,
  ColorInput,
  TextAreaInput,
  FormGroup,
  FormChangesAlert,
} from '@components/ui/forms';


type EditServerMemberFormProps = {
  member: ServerMemberData;
};

export function EditServerMemberForm({
  member,
}: EditServerMemberFormProps) {
  const defaultValues = {
    memberId: member?._id,
    displayName: member?.displayName || '',
    bio: member?.bio || '',
    bannerColor: member?.bannerColor || '',
  };

  const methods = useForm({
    defaultValues,
  });
  const {
    watch,
    handleSubmit,
  } = methods;

  const {
    displayName,
    bannerColor,
    bio,
  } = watch();

  return (
    <FormProvider {...methods}>
      <form>
        <div>
          <FormGroup label="Server Nickname" htmlFor="display-name">
            <TextInput
              id="display-name"
              name="displayName"
              value={displayName}
            />
          </FormGroup>
          <FormGroup label="Banner Color" htmlFor="banner-color">
            <ColorInput
              id="banner-color"
              name="bannerColor"
              value={bannerColor}
            />
          </FormGroup>
          <FormGroup label="About Me" htmlFor="bio">
            <TextAreaInput
              id="bio"
              name="bio"
              value={bio}
              maxLength={190}
            />
          </FormGroup>
        </div>
        <FormChangesAlert defaultValues={defaultValues} />
      </form>
    </FormProvider>
  );
}