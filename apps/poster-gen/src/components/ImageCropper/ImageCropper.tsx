import 'cropperjs/dist/cropper.css';
import { createRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';

interface ImageCropperProps {
  image: File | null,
  setImage: (image: File) => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ image, setImage }) => {
  const cropperRef = createRef<ReactCropperElement>();

  const getCropData = () => {
    const imageElement = cropperRef.current;
    if (imageElement) {
      console.log(imageElement)
      // Get the cropped canvas
      const canvas = imageElement.cropper.getCroppedCanvas();

      if (canvas) {
        console.log(canvas)
        // Convert the canvas to a Blob
        canvas.toBlob((blob) => {
          if (blob) {
            console.log(blob)
            // Create a File object from the Blob
            // You can customize the filename and type as needed
            const croppedImageFile = new File([blob], 'image.png', {
              type: 'image/png',
            });
            
            // Now you can use the croppedImageFile (e.g., upload it to a server)
            console.log('Cropped image file:', croppedImageFile);
            // Example: uploadFile(croppedImageFile);

            setImage(croppedImageFile);

          } else {
            console.error('Failed to create blob from canvas');
          }
        }, 'image/png'); // Specify the MIME type
      } else {
        console.error('Failed to get cropped canvas');
      }
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <Cropper
        ref={cropperRef}
        style={{ height: '100%', width: '100%' }}
        zoomTo={0.5}
        initialAspectRatio={1}
        preview=".img-preview"
        src={image ? URL.createObjectURL(image) : ''}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        guides={true}
      />
      <button
        className="button"
        style={{ float: 'right' }}
        onClick={getCropData}
      >
        Crop Image
      </button>
    </div>
  );
};
