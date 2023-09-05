import { ActiveIdState } from '@hooks';

type TabButtonProps = {
  tab: string;
  children: React.ReactNode;
  className?: string;
} & ActiveIdState;

export function TabButton({
  set, id, tab, children, className
}: TabButtonProps) {
  return (
    <button
      className={`${className || ''} ${id === tab ? 'active' : ''}`}
      onClick={() => { set(tab); }}
    >
      {children}
    </button>
  )
}