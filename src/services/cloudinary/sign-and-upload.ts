import { SignData, sign, upload } from './';

export const signAndUpload = async (file: File | File[], apiUrl: string, customId?: string) => {
  if (file instanceof File || file instanceof Blob) {
    const signature = await sign(apiUrl, file.name) as SignData;

    await upload(file, signature, customId);
  } else {
    const filenames = file.map(f => f.name);

    const signatures = await sign(apiUrl, filenames) as SignData[];

    await Promise.all(signatures.map((signature, i) => {
      upload(file[i], signature);
    }));
  }
};