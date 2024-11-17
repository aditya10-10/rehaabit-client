export const uploadImageToCloudinary = async (file) => {
    try {
        console.log('Cloud Name:', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
        console.log('Upload Preset:', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
        
        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Cloudinary Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw error;
    }
};