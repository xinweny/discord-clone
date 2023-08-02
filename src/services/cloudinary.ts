import path from 'path';

import { cloudinary, cld } from '@config/cloudinary';

import env from '@config/env';

import { formatDataUri } from '@helpers/formatDataUri';
import { getPublicId } from '@helpers/getPublicId';

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

  const publicId = customPublicId ? customPublicId : name;

  const resource = cld.image(`${folderPath}/${publicId}`);

  const url = resource.toURL().replace(/\?_a=[A-Za-z0-9]+$/, '') + ext;

  return url;
};

const upload = async (file: Express.Multer.File, folderPath: string, url?: string) => {
  const dataUri = formatDataUri(file.buffer, file.mimetype);

  const ext = file.originalname.split('.').slice(-1)[0];

  const res = await cloudinary.uploader.upload(dataUri, {
    folder: `discord_clone/${folderPath}`,
    use_filename: true,
    resource_type: (ext === 'pdf') ? 'raw' : 'auto',
    ...(url && { public_id: getPublicId(url, ext === 'pdf') }),
  });

  return res;
};

const deleteByUrl = async (url: string) => {
  const publicId = getPublicId(url);
  const res = await cloudinary.uploader.destroy(publicId);

  return res;
};

const deleteByFolder = async (folderPath: string) => {
  const path = `discord_clone/${folderPath}/`;

  const prefix = await Promise.all(
    ['image', 'raw', 'video'].map(
      resourceType => cloudinary.api.delete_resources_by_prefix(path, { resource_type: resourceType })
    )
  );

  const folder = await cloudinary.api.delete_folder(path);

  return { prefix, folder };
};

export const cloudinaryService = {
  createSignature,
  generateUrl,
  upload,
  deleteByUrl,
  deleteByFolder,
};