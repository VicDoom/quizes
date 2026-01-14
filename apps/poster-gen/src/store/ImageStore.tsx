import { createContext, useContext, ReactNode } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { makeAutoObservable } from 'mobx';

export class ImageStore {
  image: File | null = null;

  imageDimensions = { width: 0, height: 0 };

  constructor() {
    makeAutoObservable(this);
  }

  addImage = (image: File) => {
    this.image = image;
  };

  setDimensions = (dimensions: { width: number; height: number }) => {
    this.imageDimensions = dimensions;
  };

  get hasImage() {
    return this.image !== null;
  }
}

export const ImageStoreContext = createContext<ImageStore | null>(null);

export const ImageStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const store = useLocalObservable(() => new ImageStore());
  return (
    <ImageStoreContext.Provider value={store}>
      {children}
    </ImageStoreContext.Provider>
  );
};

// Хук для использования store
export const useImageStore = (): ImageStore => {
  const store = useContext(ImageStoreContext);
  if (!store) {
    throw new Error('useImageStore must be used within ImageStoreProvider');
  }
  return store;
};
