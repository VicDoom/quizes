import { ImageCropper, Modal } from '@components';
import { useImageStore } from '@store';
import { useState } from 'react';

export const ImageEditor = () => {
  const { image, addImage } = useImageStore();
  
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const setCrop = (image: File) => {
    addImage(image);
    setCropModalOpen(false);
  }
  return (
    <div className="image-editor">
      <div className="image-editor__toolbar">
        <button className="button" onClick={() => setCropModalOpen(true)}>
          <img src="/icons/crop.svg" alt="crop" />
        </button>
      </div>
      <img
        className="image-editor__view image"
        src={image ? URL.createObjectURL(image) : ''}
        alt="edit-image"
      />
      <Modal open={cropModalOpen} onChange={setCropModalOpen}>
        <ImageCropper image={image} setImage={setCrop} />
      </Modal>
    </div>
  );
};
