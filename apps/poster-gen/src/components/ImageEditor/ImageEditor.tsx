import { useImageStore } from '@store';
import FilerobotImageEditor from 'react-filerobot-image-editor';

export const ImageEditor = () => {
  const { image } = useImageStore();
  return (
    image && (
      <FilerobotImageEditor
        source={URL.createObjectURL(image)}
        savingPixelRatio={4}
        previewPixelRatio={0}
        tabsIds={[]}
      />
    )
  );
};
