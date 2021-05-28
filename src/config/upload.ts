import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';
import { Request, Express } from 'express';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: multer.StorageEngine;
  };

  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
  };
}

export default {
  driver: process.env.NODE_ENV === 'production' ? 's3' : 'disk',

  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
  },
} as IUploadConfig;
