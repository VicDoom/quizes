import { ImageEditor, ImageViewer, Modal, Multiform } from '@components';
import { ImageStore, useImageStore } from '@store';
import { useState } from 'react';

export function App() {
  const imageStore = useImageStore();
  const [open, setOpen] = useState(true);
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
              id: 'image-editor',
              component: <ImageEditor />,
            },
          ]}
        />
      </div>
      <Modal open={open} onChange={setOpen}>Hello</Modal>
    </div>
  );
}

export default App;
