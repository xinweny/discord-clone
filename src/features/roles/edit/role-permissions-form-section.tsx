import { useFormContext, useWatch } from 'react-hook-form';
import _ from 'lodash';

import { FormGroup, CheckboxInput } from '@components/ui/forms';

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
        >
          {Object.entries(obj).map(([name, description]) => (
            <div key={name}>
              <div>
                <h4>{_.startCase(name)}</h4>
                <CheckboxInput
                  id={_.kebabCase(name)}
                  name={`permissions.${name}`}
                  label={name}
                  checked={permissions[name]}
                />
              </div>
              <p>{description}</p>
            </div>
          ))}
          {i === 0 && (
            <button
              type="button"
              onClick={clearPermissions}
            >
              Clear permissions
            </button>
          )}
        </FormGroup>
      ))}
    </>
  );
}