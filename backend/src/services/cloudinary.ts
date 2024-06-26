import path from 'path';

import { cloudinary, cld } from '@config/cloudinary.js';

import env from '@config/env.js';

import { getPublicId } from '@helpers/getPublicId.js';

const createSignature = (filename: string, folderPath: string, customPublicId?: string) => {
  const timestamp = new Date().getTime();

  const folder = `discord_clone/${folderPath}`;
  const { name } = path.parse(filename);
  const publicId = customPublicId ? customPublicId : name;

  const signature = cloudinary.utils.api_sign_request({
    folder,
    public_id: encodeURIComponent(publicId),
    timestamp,
  }, env.CLOUDINARY_API_SECRET);

  return { signature, timestamp, folder };
};

const generateUrl = (filename: string, folder: string, customPublicId?: string) => {
  const folderPath = `discord_clone/${folder}`;

  const { name, ext } = path.parse(filename);

  const publicId = encodeURIComponent(customPublicId ? customPublicId : name);

  const resource = cld.image(`${folderPath}/${publicId}`)
    .setVersion(Math.floor(Date.now() / 1000));

  const url = resource.toURL().replace(/\?_a=[A-Za-z0-9]+$/, '') + ext;

  return url;
};

const deleteByUrl = async (url: string) => {
  const publicId = getPublicId(url);
  const res = await cloudinary.uploader.destroy(publicId);

  return res;
};

const deleteByFolder = async (folderPath: string, withRaw = false) => {
  const path = `discord_clone/${folderPath}`;
  const parentDir = path.split('/').slice(0, -1).join('/');

  const res = await cloudinary.api
    .sub_folders(parentDir)
    .catch(() => null);

  if (!res) return null;

  const folder = res.folders[0].path as string;

  await Promise.all([
    cloudinary.api.delete_resources_by_prefix(folder),
    withRaw
      ? cloudinary.api.delete_resources_by_prefix(folder, { resource_type: 'raw' })
      : Promise.resolve(),
  ]);

  await cloudinary.api.delete_folder(folder);

  return path;
};

export const cloudinaryService = {
  createSignature,
  generateUrl,
  deleteByUrl,
  deleteByFolder,
};