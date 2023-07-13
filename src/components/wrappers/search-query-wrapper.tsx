import { useSearchParams } from 'react-router-dom';

interface SearchQueryWrapperProps {
  children: React.ReactNode;
  result: React.ReactNode;
}

export function SearchQueryWrapper({
  children,
  result,
}: SearchQueryWrapperProps) {
  const [params] = useSearchParams();

  if (params.size > 0) return result;

  return <>{children}</>;
}