import { Mask } from '.';

export function AvatarStatusMask() {
  return (
    <Mask id="avatar-status">
      <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
      <circle fill="black" cx="0.84375" cy="0.84375" r="0.25"></circle>
    </Mask>
  );
}