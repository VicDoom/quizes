import { useImageStore } from '@store';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

export const ImageViewer = observer(() => {
  const { image, addImage } = useImageStore();

  const [params, setParams] = useState<{
    width: number;
    height: number;
    url: string;
  } | null>(null);

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

  useEffect(() => {
    if (image) {
      const img = new Image();
      const url = URL.createObjectURL(image);
      
      img.onload = function() {
        setParams({
          width: img.width,
          height: img.height,
          url,
        });
      };
      
      img.onerror = function() {
        console.error("Ошибка загрузки изображения");
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    } else {
      setParams(null);
    }
  }, [image])

  return (
    <div className="imageViewer">
      {image && (
        <div className="fileInfo">
          <p className="fileTitle">{image.name}</p>
          <p className="fileSubTitle">{(image.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>{params?.width} х {params?.height}</p>
        </div>
      )}

      {params?.url && (
        <img
            src={params?.url}
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
          className='button'
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
