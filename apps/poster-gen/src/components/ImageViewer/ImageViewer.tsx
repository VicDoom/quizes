import { useState } from 'react';
import { useImageStore } from '@store';

export const ImageViewer = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { image, addImage } = useImageStore();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      addImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(previewUrl ?? null);
    }
  };

  return (
    <div className="imageViewer">
      {image && (
        <div className="fileInfo">
          <p className="fileTitle">{image.name}</p>
          <p className="fileSubTitle">{(image.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      {previewUrl && (
        <img
            src={previewUrl}
            alt="Preview"
            className="image"
          />
      )}

      <div className="fileButton">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label
          htmlFor="imageUpload"
        >
          <span aria-label="image-emoji" role="img">
            📁
          </span>{' '}
          Выбрать изображение
        </label>
      </div>
    </div>
  );
};
