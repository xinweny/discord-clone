interface LogoutButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function LogoutButton({ onClick }: LogoutButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      Log Out
    </button>
  )
}