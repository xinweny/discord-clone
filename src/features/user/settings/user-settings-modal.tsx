interface UserSettingsModal {
  display: boolean;
  hide: React.ReactEventHandler;
}

export function UserSettingsModal({
  display,
  hide,
}: UserSettingsModal) {
  if (!display) return null;

  return (
    <div>
      <button onClick={hide}>
        <img src="#" alt="x" />
      </button>
    </div>
  );
}