import { useEffect, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { editRoleSchema } from '../schema';

import type { EditRoleFields } from '../types';

import { ServerContext } from '@features/server/context';

import type { RoleTabsHookData } from '@hooks';

import { FormChangesAlert } from '@components/ui/forms';

import { RoleDisplayFormSection } from './role-display-form-section';
import { RolePermissionsFormSection } from './role-permissions-form-section';

import { useEditRoleMutation } from '../api';

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

  const { _id: serverId } = useContext(ServerContext)!;

  const defaultValues = {
    name: role?.name,
    color: role?.color,
    permissions: role?.permissions,
    serverId,
    roleId: role?._id,
  };

  const methods = useForm<EditRoleFields>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(editRoleSchema),
  });
  const { handleSubmit, reset } = methods;

  const [editRole] = useEditRoleMutation();

  useEffect(() => {
    if (!checkPermissions(['Display'], label)) {
      changeTab('Permissions');
    }
  }, [label, role]);

  useEffect(() => { reset(defaultValues); }, [role]);

  if (!role) return null;

  const onSubmit = async (data: EditRoleFields) => {
    const role = await editRole(data).unwrap();
    
    if (role) reset(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
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