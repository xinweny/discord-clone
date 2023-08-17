import { useState } from 'react';

import type { CustomEmojiData } from '../types';

import { EditEmojiForm } from './edit-emoji-form';

type EditEmojiButtonProps = {
  emoji: CustomEmojiData;
};

export function EditEmojiButton({ emoji }: EditEmojiButtonProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const closeForm = () => { setShowForm(false); };

  return showForm
    ? <EditEmojiForm emoji={emoji} closeForm={closeForm} />
    : (
      <div>:
        <button
          type="button"
          onClick={() => { setShowForm(true); }}
        >{emoji.name}</button>
      :</div>
    );
}