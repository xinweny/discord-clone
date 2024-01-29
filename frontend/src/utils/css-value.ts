export const cssValue = (property: string) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(property);
};