import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import type { RoleData, EditRoleFields } from '../types';

import type { RoleTabsHookData, TabData } from '@hooks';

import { FormChangesAlert } from '@components/ui/forms';

import { RoleDisplayFormSection } from './role-display-form-section';
import { RolePermissionsFormSection } from './role-permissions-form-section';

type EditRoleFormSectionsProps = {
  state: RoleTabsHookData;
};

export function EditRoleFormSections({
  state
}: EditRoleFormSectionsProps) {
  const role = state.activeRole.data;
  const {
    checkPermissions,
    activeTab,
    changeTab,
  } = state;
  const { label } = activeTab;

  const defaultValues = {
    name: role?.name,
    color: role?.color,
    permissions: role?.permissions,
  };

  const methods = useForm<EditRoleFields>({
    defaultValues,
    mode: 'onChange',
  });
  const { reset } = methods;

  useEffect(() => {
    if (!checkPermissions(['Display'], label)) {
      changeTab('Permissions');
    }
  }, [label, role]);

  useEffect(() => { reset(defaultValues); }, [role]);

  if (!role) return null;

  return (
    <FormProvider {...methods}>
      <form>
        {label === 'Display' && (
          <RoleDisplayFormSection />
        )}
        {label === 'Permissions' && (
          <RolePermissionsFormSection />
        )}
        <FormChangesAlert />
      </form>
    </FormProvider>
  )
}