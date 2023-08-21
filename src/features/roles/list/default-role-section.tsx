import type { RoleData } from '../types';

type DefaultRoleSectionProps = {
  role: RoleData;
};

export function DefaultRoleSection({ role }: DefaultRoleSectionProps) {
  return (
    <div>
      <p>Use roles to group your server members and assign permissions.</p>
      <button type="button">
        <div>
          <img src="#" alt="#" />
          <div>
            <h3>Default permissions</h3>
            <p>@everyone·applies to all server members</p>
          </div>
          <img src="#" alt=">" />
        </div>
      </button>
    </div>
  )
}