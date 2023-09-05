import { ContentLayout } from '@components/layouts';

import { useActiveIds } from '@hooks';

import { ContactsNavbar } from '@features/relations/nav';
import { ContactsList } from '@features/relations/list';
import { SendFriendRequestForm } from '@features/relations/create';

export function ContactsPage() {
  const activeTabState = useActiveIds('online');

  const { set, id } = activeTabState;

  return (
    <div>
      <ContentLayout
        header={<ContactsNavbar
          set={set}
          id={id}
        />}
      >
        {id === 'add_friend'
          ? <SendFriendRequestForm />
          : <ContactsList activeTab={id!} />
        }
      </ContentLayout>
    </div>
  )
}