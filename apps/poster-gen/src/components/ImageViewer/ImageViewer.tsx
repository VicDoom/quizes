import { useImageStore } from '@store';
import { observer } from 'mobx-react';

export const ImageViewer = observer(() => {
  const { image, addImage } = useImageStore();
  const imageUrl = image && URL.createObjectURL(image);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      addImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
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

      {imageUrl && (
        <img
            src={imageUrl}
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
});
