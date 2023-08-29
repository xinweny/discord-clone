import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';

export function AddReactionForm() {

  return (
    <form>
      <Picker
        data={data}
        onEmojiSelect={console.log}
        theme="dark"
        skinTonePosition="none"
        set="twitter"
      />
    </form>
  );
}