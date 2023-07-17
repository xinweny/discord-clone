interface UserSettingsButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function UserSettingsButton({
  onClick
}: UserSettingsButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      <img src="#" alt="User settings" />
    </button>
  )
}