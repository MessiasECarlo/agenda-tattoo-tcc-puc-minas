import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/container/providers/StorageProvider/implementations/S3StorageProvider';
import SupabaseProvider from '@shared/container/providers/StorageProvider/implementations/SupabaseProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
  supabase: SupabaseProvider
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver]
);
