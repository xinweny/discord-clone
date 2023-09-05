import { ContentLayout } from '@components/layouts';

import { useActiveIds } from '@hooks';

import { ContactsNavbar } from '@features/relations/nav';
import { ContactsList } from '@features/relations/list';

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
          ? <form>Add friend</form>
          : <ContactsList activeTab={id!} />
        }
      </ContentLayout>
    </div>
  )
}