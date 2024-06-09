import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary'

class CloudinaryHelper {
  upload (file:any){
    return new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload(file, (err:any, result:UploadApiResponse) => {
        if (err) reject(err);
        resolve(result.secure_url);
      })
    })
  }

  destroy (secureUrl: string) {
    const splitedSecureUrl = secureUrl.split('/');
    const fileName = splitedSecureUrl[splitedSecureUrl.length - 1];
    const publicId = fileName.split('.')[0]
    cloudinary.uploader.destroy(publicId);
  }
}

const cloudinaryHelper = new CloudinaryHelper();
export default cloudinaryHelper;