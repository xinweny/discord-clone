import { useWatch, useFormContext } from 'react-hook-form';

import { Separator } from '@components/ui/displays';

import {
  FormGroup,
  TextInput,
  ColorInput,
} from '@components/ui/forms';

import styles from './role-display-form-section.module.scss';

export function RoleDisplayFormSection() {
  const { control } = useFormContext();
  const roleName = useWatch({ control, name: 'name' });
  const roleColor = useWatch({ control, name: 'name' });

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
      <Separator className={styles.separator} />
      <FormGroup label="Role Color" htmlFor="role-color">
        <ColorInput
          name="color"
          id="role-color"
          label="Role Color"
          value={roleColor}
        />
      </FormGroup>
    </>
  );
}