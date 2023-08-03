import { CheckboxInput } from '@components/ui';

export function PrivateChannelSection() {
  return (
    <div>
      <div>
        <img src="" alt="" />
        <label htmlFor="private-channel">Private Channel</label>
      </div>
      <CheckboxInput
        name="private"
        id="private-channel"
        label="Private Channel"
      />
    </div>
  );
}