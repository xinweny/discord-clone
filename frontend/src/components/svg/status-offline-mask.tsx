import { Mask } from '.';

export function StatusOfflineMask() {
  return (
    <Mask id="status-offline">
      <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
      <circle fill="black" cx="0.5" cy="0.5" r="0.25"></circle>
    </Mask>
  );
}