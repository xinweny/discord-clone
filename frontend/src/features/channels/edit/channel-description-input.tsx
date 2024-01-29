import { FormGroup, TextAreaInput } from '@components/ui/forms';

export function ChannelDescriptionInput() {
  return (
    <FormGroup label="Channel Topic" htmlFor="description">
      <TextAreaInput
        name="description"
        id="description"
        label="Channel Topic"
        placeholder="Let everyone know how to use this channel!"
        maxLength={1024}
        options={{ showCharCount: true }}
      />
    </FormGroup>
  );
}