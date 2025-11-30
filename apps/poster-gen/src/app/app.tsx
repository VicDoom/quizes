import { ImageEditor, ImageViewer, Multiform } from '@components';
import { ImageStore, useImageStore } from '@store';

export function App() {
  const imageStore = useImageStore();
  return (
    <div className="root">
      <div className="page">
        <Multiform
          externalStore={imageStore}
          elements={[
            {
              id: 'image-viewer',
              component: <ImageViewer />,
              getNavigationState: (storeData?: ImageStore) => ({
                canGoNext: !!storeData?.image,
              }),
            },
            {
              id: 'page-2',
              component: <ImageEditor />,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
