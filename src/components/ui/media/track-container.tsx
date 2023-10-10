type TrackContainerProps = {
  label: string;
  isMicrophoneEnabled: boolean;
  children: React.ReactNode;
}

export function TrackContainer({
  label,
  isMicrophoneEnabled,
  children,
}: TrackContainerProps) {
  return (
    <div>
      {children}
      <p>{label}</p>
      {isMicrophoneEnabled || <img src="" alt="Muted" />}
    </div>
  );
}