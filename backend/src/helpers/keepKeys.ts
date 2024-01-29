type objType = { [key: string]: any };

export const keepKeys = (obj: objType, incKeys: string[]) => {
  return Object.keys(obj)
    .filter(k => incKeys.includes(k))
    .reduce((o: objType, k) => {
      o[k] = obj[k];
      return o;
    }, {});
};