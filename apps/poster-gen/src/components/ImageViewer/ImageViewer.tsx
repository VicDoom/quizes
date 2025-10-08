import { useState } from 'react';

import styles from './ImageViewer.module.css';

export const ImageViewer = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImage(file || selectedImage);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(previewUrl ?? null);
    }
  };

  return (
    <div className="image-upload-container">
      <div className="upload-section">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />
        <label htmlFor="imageUpload" className={styles.customFileButton}>
          <span aria-label="image-emoji" role="img">
            📁
          </span>{' '}
          Выбрать изображение
        </label>
      </div>

      {selectedImage && (
        <div className={styles.fileDetails}>
          <p className={styles.fileName}>{selectedImage.name}</p>
          <p className={styles.fileSize}>
            {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      {previewUrl && (
        <div className={styles.imagePreview}>
          <img src={previewUrl} alt="Preview" className={styles.previewImage} />
        </div>
      )}
    </div>
  );
};
