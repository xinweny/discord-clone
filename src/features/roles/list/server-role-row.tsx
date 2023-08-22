import type { RoleData } from '../types';

type ServerRoleRowProps = {
  role: RoleData;
};

export function ServerRoleRow({ role }: ServerRoleRowProps) {
  return (
    <tr>
      <td>
        <img src="#" alt={role.color} />
        <p>{role.name}</p>
      </td>
      <td>
        <p>{role.memberCount || 0}</p>
        <img src="#" />
      </td>
      <td>
        <button type="button">Edit</button>
      </td>
      <td>
        <button type="button">
          <img src="#" alt="" />
        </button>
      </td>
    </tr>
  )
}