import { ContentLayout } from '@components/layouts';

import { useActiveIds } from '@hooks';

import { setDocumentTitle } from '@utils';

import { ContactsTabs } from '@features/relations/types';

import { ContactsNavbar } from '@features/relations/nav';
import { ContactsContainer } from '@features/relations/list';
import { SendFriendRequestForm } from '@features/relations/create';

export function ContactsPage() {
  const activeTabState = useActiveIds('online');

  const { set, id } = activeTabState;

  setDocumentTitle(['Friends']);

  return (
    <ContentLayout
      header={<ContactsNavbar
        set={set}
        id={id}
      />}
    >
      {id === 'add_friend'
        ? <SendFriendRequestForm />
        : <ContactsContainer activeTab={id! as ContactsTabs} />
      }
    </ContentLayout>
  );
}