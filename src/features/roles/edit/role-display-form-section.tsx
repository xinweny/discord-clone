import { useWatch, useFormContext } from 'react-hook-form';

import {
  FormGroup,
  TextInput,
} from '@components/ui/forms';

export function RoleDisplayFormSection() {
  const { control } = useFormContext();
  const roleName = useWatch({ control, name: 'name' });

  return (
    <>
      <FormGroup label="Role Name" htmlFor="role-name">
        <TextInput
          name="name"
          id="role-name"
          label="Role Name"
          value={roleName}
        />
      </FormGroup>
    </>
  );
}