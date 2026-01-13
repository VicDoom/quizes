import { Canvas, Textbox, FabricImage, util } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useCanvas = (canvasInstance: HTMLCanvasElement | null) => {
  const fabricCanvas = useRef<Canvas>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  useEffect(() => {
    if (!canvasInstance) {
      setIsCanvasReady(false);
      return;
    }

    fabricCanvas.current = new Canvas(canvasInstance, {
      backgroundColor: '#f0f0f0',
      selection: true,
    });

    const defaultText = new Textbox('Загрузите изображение и добавьте текст', {
      left: 50,
      top: 50,
      fontSize: 24,
      fill: '#666',
      selectable: false,
    });
    fabricCanvas.current.add(defaultText);

    setIsCanvasReady(true);

    return () => {
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
        fabricCanvas.current = null;
      }
      setIsCanvasReady(false);
    };
  }, [canvasInstance]);

  const addText = useCallback(() => {
    const canvas = fabricCanvas.current;

    if (!isCanvasReady || !canvas) {
      console.warn('Canvas is not rendered yet');
      return;
    }
  
    const text = 'example';
    const fontSize = 32;
    const textColor = '#FF00000';

    if (!canvas || !text.trim()) return;

    const textObj = new Textbox(text, {
      left: canvas.width / 2,
      top: canvas.height / 2,
      fontSize: fontSize,
      fill: textColor,
      fontFamily: 'Arial',
      selectable: true,
      hasControls: true,
      lockScalingFlip: true,
    });

    textObj.set({
      left: canvas.width / 2 - textObj.width / 2,
      top: canvas.height / 2 - textObj.height / 2,
    });

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();
  }, [isCanvasReady]);

  const drawImage = useCallback(
    async (imageUrl: string) => {
      const canvas = fabricCanvas.current;

      if (!isCanvasReady || !canvas) {
        console.warn('Canvas is not rendered yet');
        return;
      }

      try {
        const imgEl = await util.loadImage(imageUrl, {
          crossOrigin: 'anonymous',
        } as util.LoadImageOptions);

        if (!imgEl) return;

        const img = new FabricImage(imgEl);

        canvas?.clear();

        const width = imgEl.width;
        const height = imgEl.height;

        canvas?.setDimensions({ width, height });

        img.set({
          left: width / 2,
          top: height / 2,
          selectable: false,
          evented: false,
        });

        canvas?.add(img);
        canvas?.renderAll();
      } catch (error) {
        console.error('Ошибка загрузки изображения:', error);
      }
    },
    [isCanvasReady]
  );

  return {
    addText,
    drawImage,
    isCanvasReady
  };
};
