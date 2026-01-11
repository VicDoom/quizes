import { Canvas, Textbox } from 'fabric';
import { useEffect, useRef } from 'react';

const addText = (canvas: HTMLCanvasElement | null, fabricInstance: Canvas | null) => {
  const text = 'example';
  const fontSize = 32;
  const textColor = '#FF00000'

  if (!canvas || !text.trim()) return;

  return () => {
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
  
    fabricInstance?.add(textObj);
    fabricInstance?.setActiveObject(textObj);
    fabricInstance?.renderAll();
  }
};

export const useCanvasText = (canvasInstance: HTMLCanvasElement | null) => {
  const fabricCanvas = useRef<Canvas>(null);

  useEffect(() => {
    if (!canvasInstance) return;

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

    return () => {
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
      }
    };
  }, []);

  return {
    addText: addText(canvasInstance, fabricCanvas.current)
  }
}