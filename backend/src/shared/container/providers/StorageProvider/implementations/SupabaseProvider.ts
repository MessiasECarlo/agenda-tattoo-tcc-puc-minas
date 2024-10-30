import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import mime from 'mime';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class SupabaseProvider implements IStorageProvider {
  private client: SupabaseClient<any, 'public', any>;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE
    );
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) throw new Error('File not found!');

    const image = await fs.promises.readFile(originalPath);

    const filename = this.getFilenameByPath(originalPath);
    const fileNameToUpload = `${filename}`;

    const response = await this.client.storage
      .from(process.env.STORAGE_BUCKET)
      .upload(`${fileNameToUpload}`, image, {
        contentType: ContentType
      });

    if (response.error) {
      const error = response.error.message;
      throw new Error(`Error on upload file: ${error}`);
    }

    const publicUrl = this.client.storage
      .from(process.env.STORAGE_BUCKET)
      .getPublicUrl(response.data?.path);

    const upload = {
      path: publicUrl.data.publicUrl
    };

    await fs.promises.unlink(originalPath);

    const filenameToReturn = this.getFilenameByUrl(upload.path);

    return filenameToReturn;
  }

  private getFilenameByPath(filePath: string): string {
    return filePath.split(path.sep).pop();
  }

  private getFilenameByUrl(url: string): string {
    return url.split('/').pop();
  }

  public async deleteFile(file: string): Promise<void> {
    const { error } = await this.client.storage
      .from(process.env.STORAGE_BUCKET)
      .remove([file]);

    if (error) {
      console.error('Erro ao deletar o arquivo:', error.message);
    } else {
      console.log('Arquivo deletado com sucesso!');
    }
  }
}

export default SupabaseProvider;
