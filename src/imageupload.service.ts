import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dr54a7gze',
  api_key: '868275163814591',
  api_secret: 'U0-E-H34SF1Dl1vpyroUU361AUQ',
});

@Injectable()
export class ImageUploadSerive {
  async uploadImage(path: string): Promise<any> {
    try {
      const imageUrl = await cloudinary.uploader.upload(path);
      return imageUrl.secure_url;
    } catch (err) {
      return err;
    }
  }
}
