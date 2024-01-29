export const setDocumentTitle = (strs: string[] = []) => {
  const title = ['Discord Clone', ...strs].join(' | ');

  document.title = title;
};