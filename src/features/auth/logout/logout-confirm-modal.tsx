interface LogoutConfirmModalProps {
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

export function LogoutConfirmModal({
  onCancel, onConfirm,
}: LogoutConfirmModalProps) {
  return (
    <div>
      <h2>Log Out</h2>
      <p>Are you sure you want to log out?</p>
      <div>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="button" onClick={onConfirm}>Log Out</button>
      </div>
    </div>
  )
}