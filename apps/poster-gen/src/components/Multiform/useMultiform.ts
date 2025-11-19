import { useEffect, useState } from 'react';
import { MultiformElementProps, NavigationState } from './types';
import { ImageStore } from '@store';
import { reaction } from 'mobx';

export const useMultiform = (
  elements: MultiformElementProps[],
  externalStore?: ImageStore
) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [navigationState, setNavigationState] = useState<NavigationState>({
    canGoNext: true,
    canGoPrev: false,
    nextLabel: 'Далее',
    prevLabel: 'Назад',
  });

  useEffect(() => {
    const updateNavigationState = () => {
      const isFirstStage = currentStage === 0;
      const isLastStage = currentStage === elements.length - 1;
      const currentElement = elements[currentStage];

      const defaultState: NavigationState = {
        canGoNext: !isLastStage,
        canGoPrev: !isFirstStage,
        nextLabel: isLastStage ? 'Отправить' : 'Далее',
        prevLabel: 'Назад',
      };

      if (currentElement?.getNavigationState && externalStore) {
        const customState = currentElement.getNavigationState(externalStore);
        setNavigationState({
          ...defaultState,
          ...customState,
        });
      } else {
        setNavigationState(defaultState);
      }
    };

    updateNavigationState();

    if (externalStore) {
      const dispose = reaction(
        () => ({
          hasImage: externalStore.hasImage,
          image: externalStore.image,
          currentStage,
          elementsLength: elements.length,
        }),
        () => {
          updateNavigationState();
        },
        { fireImmediately: false }
      );

      return dispose;
    }
  }, [currentStage, elements, externalStore]);

  const goToNext = () => {
    if (navigationState.canGoNext) {
      setCurrentStage(currentStage + 1);
    }
  };

  const goToPrev = () => {
    if (navigationState.canGoPrev) {
      setCurrentStage(currentStage - 1);
    }
  };

  return {
    currentStage,
    navigationState,
    goToNext,
    goToPrev,
  };
};
