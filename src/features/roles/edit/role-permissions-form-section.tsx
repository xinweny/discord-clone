import { useFormContext, useWatch } from 'react-hook-form';
import _ from 'lodash';

import { FormGroup, CheckboxInput } from '@components/ui/forms';
import { Separator } from '@components/ui/displays';

import styles from './role-permissions-form-section.module.scss';

import {
  PERMISSION_DESCRIPTIONS,
  RESET_PERMISSIONS,
} from './data';

export function RolePermissionsFormSection() {
  const { control, setValue } = useFormContext();
  const permissions = useWatch({ control, name: 'permissions' });

  const clearPermissions = () => {
    setValue('permissions', RESET_PERMISSIONS);
  };

  return (
    <>
      {Object.entries(PERMISSION_DESCRIPTIONS).map(([category, obj], i) => (
        <FormGroup
          key={_.camelCase(category)}
          label={category}
          className={styles.container}
        >
          {Object.entries(obj).map(([name, description]) => (
            <div key={name} className={styles.group}>
              <div>
                <h4>{_.startCase(name)}</h4>
                <CheckboxInput
                  id={_.kebabCase(name)}
                  name={`permissions.${name}`}
                  label={name}
                  checked={permissions[name]}
                >
                  <></>
                </CheckboxInput>
              </div>
              <p>{description}</p>
            </div>
          ))}
          {i === 0 && (
            <button
              type="button"
              onClick={clearPermissions}
              disabled={_.isEqual(permissions, RESET_PERMISSIONS)}
              className={styles.resetButton}
            >
              Clear permissions
            </button>
          )}
        </FormGroup>
      ))}
    </>
  );
}