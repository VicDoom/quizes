import { useImageStore } from '@store';
import { createRef, useState } from 'react';
import "cropperjs/dist/cropper.css";
import Cropper, { ReactCropperElement } from 'react-cropper';

// TODO: переделать на https://www.npmjs.com/package/fabric
// Библиотеки для редактирования изображения:
// - react-easy-crop
// - react-cropper
export const ImageEditor = () => {
  const { image } = useImageStore();
  const [cropData, setCropData] = useState('#');
  const cropperRef = createRef<ReactCropperElement>();

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    image && (
      <div>
        <div style={{ width: '100%' }}>
          <Cropper
            ref={cropperRef}
            style={{ width: '100%' }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={URL.createObjectURL(image)}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        </div>
        <h1>
          <button style={{ float: 'right' }} onClick={getCropData}>
            Crop Image
          </button>
        </h1>
        <img style={{ width: '100%' }} src={cropData} alt="cropped" />
      </div>
    )
  );
};
