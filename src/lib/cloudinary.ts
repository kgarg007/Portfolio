import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadToCloudinary(
  fileBase64OrUrl: string,
  folder: string = 'krishna_portfolio',
  resourceType: 'image' | 'raw' | 'video' | 'auto' = 'auto'
): Promise<{ url: string; publicId: string; width?: number; height?: number; format?: string }> {
  try {
    const result = await cloudinary.uploader.upload(fileBase64OrUrl, {
      folder: `krishna_portfolio/${folder}`,
      resource_type: resourceType,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.message || 'Failed to upload asset to Cloudinary');
  }
}

export async function deleteFromCloudinary(publicId: string, resourceType: string = 'image'): Promise<boolean> {
  if (!publicId) return false;
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result.result === 'ok' || result.result === 'not found';
  } catch (error) {
    console.error('Cloudinary delete error for publicId:', publicId, error);
    return false;
  }
}

export { cloudinary };
