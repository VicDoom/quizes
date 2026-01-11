import { useCanvasText } from '@/hooks';
import { ImageCropper, Modal } from '@components';
import { useImageStore } from '@store';
import { useRef, useState } from 'react';

export const ImageEditor = () => {
  const { image, addImage } = useImageStore();
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const setCrop = (image: File) => {
    addImage(image);
    setCropModalOpen(false);
  }

  const { addText } = useCanvasText(canvasRef.current)

  return (
    <div className="image-editor">
      <div className="image-editor__toolbar">
        <button className="button" onClick={() => setCropModalOpen(true)}>
          <img src="/icons/crop.svg" alt="crop" />
        </button>
        <button className='button'>
          <img src='/icons/text.svg' alt='text' onClick={addText} />
        </button>
      </div>
      <img
        className="image-editor__view image"
        src={image ? URL.createObjectURL(image) : ''}
        alt="edit-image"
      />
      <canvas ref={canvasRef} />
      <Modal open={cropModalOpen} onChange={setCropModalOpen}>
        <ImageCropper image={image} setImage={setCrop} />
      </Modal>
    </div>
  );
};
