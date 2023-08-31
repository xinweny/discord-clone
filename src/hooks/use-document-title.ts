import { useEffect } from 'react'

export const useDocumentTitle = (title: string, deps: any[]) => {
  useEffect(() => {
    document.title = title;
  }, deps || []);
}