import { SignData, sign, upload } from './';

export const signAndUpload = async (file: File | FileList, apiUrl: string, customId?: string) => {
  if (file instanceof File) {
    const signature = await sign(apiUrl, file.name) as SignData;

    await upload(file, signature, customId);
  } else if (file instanceof FileList) {
    const filenames = Array.from(file).map(f => f.name);

    const signatures = await sign(apiUrl, filenames) as SignData[];

    await Promise.all(signatures.map((signature, i) => {
      upload(file[i], signature);
    }));
  }
};