import * as zod from 'zod';
import bytes from 'bytes';

const baseValidatorSingle = (maxSize: string, allowedExtensions: string[]) => zod
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
  );

const baseValidatorMulti = (maxNum: number, maxSize: string) => zod
  .array(zod.instanceof(File))
  .refine(
    files => files.length <= maxNum,
    `Maximum number of attachments is ${maxNum}`
  )
  .refine(
    files => files.length === 0 || !files.some(file => file.size >= bytes.parse(maxSize)),
    `Max file size is ${maxSize}`
  );

const fileValidator = {
  avatar: baseValidatorSingle('1MB', ['jpeg', 'jpg', 'png', 'gif', 'webp']),
  attachments: baseValidatorMulti(10, '1MB'),
};

export { fileValidator };