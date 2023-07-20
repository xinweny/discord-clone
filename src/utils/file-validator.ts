import * as zod from 'zod';
import bytes from 'bytes';

const baseValidator = (maxSize: string, allowedExtensions: string[]) => zod
  .preprocess(
    file => (file instanceof(FileList)) ? undefined : file,
    zod.instanceof(File)
      .optional()
      .refine(
        file => !file || file.size <= bytes.parse(maxSize),
        `Max file size is ${maxSize}`
      )
      .refine(
        file => !file || allowedExtensions.includes(file.type.split('/')[1]),
        `File type must be one of the following: ${allowedExtensions.join(', ')}`
      )
  )

const fileValidator = {
  avatar: baseValidator('1MB', ['jpeg', 'jpg', 'png', 'gif', 'webp']),
};

export { fileValidator };