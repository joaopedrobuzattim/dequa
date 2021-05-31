import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';
import { Request, Express } from 'express';
import AppError from '@shared/errors/AppError';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: multer.StorageEngine;
    fileFilter: (request: Request, file: Express.Multer.File, callbacl: multer.FileFilterCallback) => void;
  };

  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.NODE_ENV === 'production' ? process.env.PROD_STORAGE_DRIVER : 'disk',

  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
          throw new AppError('JWT token ausente!', 401);
        }

        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
    fileFilter(request: Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void {
      const isAccepted = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'].find(
        (acceptedFormat) => acceptedFormat === file.mimetype,
      );

      if (isAccepted) {
        request.multerFileFormatError = false;
        return callback(null, true);
      }
      request.multerFileFormatError = true;
      return callback(null, false);
    },
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-dequa',
    },
  },
} as IUploadConfig;
