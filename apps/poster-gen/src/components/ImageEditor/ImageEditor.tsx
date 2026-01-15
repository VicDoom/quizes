import { useCanvas } from '@/hooks';
import { ImageCropper, Modal } from '@components';
import { useImageStore } from '@store';
import { useEffect, useRef, useState } from 'react';

export const ImageEditor = () => {
  const { image, addImage, imageDimensions } = useImageStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imageUrl, setImageUrl] = useState<string>('');
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const setCrop = (image: File) => {
    addImage(image);
    setCropModalOpen(false);
  };

  const { addText, drawImage, isImageDrawn, isCanvasReady } = useCanvas(
    canvasRef.current
  );

  useEffect(() => {
    if (!image) return;
    const url = URL.createObjectURL(image);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  useEffect(() => {
    if (isCanvasReady && imageUrl) {
      drawImage(imageUrl);
    }
  }, [isCanvasReady, drawImage, imageUrl]);

  return (
    <div className="image-editor">
      <div className="image-editor__toolbar">
        <button className="button" onClick={() => setCropModalOpen(true)}>
          <img src="/icons/crop.svg" alt="crop" />
        </button>
        <button className="button">
          <img src="/icons/text.svg" alt="text" onClick={addText} />
        </button>
      </div>
      <div className="loader-wrapper">
        <div className={`loader ${!isImageDrawn && 'loader-active'}`}></div>
        <canvas
          className={`image-editor__view ${
            !isImageDrawn && 'image-editor__view-hidden'
          } image`}
          ref={canvasRef}
        />
      </div>
      <Modal open={cropModalOpen} onChange={setCropModalOpen}>
        <ImageCropper image={image} setImage={setCrop} />
      </Modal>
    </div>
  );
};
