import { useState } from 'react';

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
        if (typeof result === 'string') setPreviewUrl(reader.result as string);
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
          className="hidden"
        />
        <label
          htmlFor="imageUpload"
          className="inline-block px-6 py-3 bg-gray-600 text-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-700"
        >
          <span aria-label="image-emoji" role="img">
            📁
          </span>{' '}
          Выбрать изображение
        </label>
      </div>

      {selectedImage && (
        <div className="my-4 p-3 bg-gray-100 text-black rounded">
          <p className="font-bold mb-1">{selectedImage.name}</p>
          <p className="text-sm">
            {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      {previewUrl && (
        <div className="mt-4 max-w-[1080px]">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-auto rounded border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};
