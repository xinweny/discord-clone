import { useFormContext, useWatch } from 'react-hook-form';
import _ from 'lodash';

import { FormGroup, CheckboxInput } from '@components/ui/forms';

import CrossIcon from '@assets/icons/cross.svg?react';
import CheckmarkIcon from '@assets/icons/checkmark.svg?react';

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
                  className={`${styles.checkbox} ${permissions[name] ? styles.checked : ''}`}
                >
                  <div className={styles.slider}>
                    {permissions[name]
                      ? <CheckmarkIcon />
                      : <CrossIcon />
                    }
                  </div>
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