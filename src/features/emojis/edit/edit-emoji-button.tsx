import { useState } from 'react';

import type { CustomEmojiData } from '../types';

import { EditEmojiForm } from './edit-emoji-form';

import styles from './edit-emoji-button.module.scss';

type EditEmojiButtonProps = {
  emoji: CustomEmojiData;
};

export function EditEmojiButton({ emoji }: EditEmojiButtonProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const closeForm = () => { setShowForm(false); };

  return (
    <div className={styles.button}>
      {showForm
        ? <EditEmojiForm emoji={emoji} closeForm={closeForm} />
        : <button
          type="button"
          onClick={() => { setShowForm(true); }}
        >{emoji.name}</button>
      }
    </div>
  );
}