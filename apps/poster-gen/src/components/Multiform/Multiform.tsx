import { Button } from '@components';
import { MultiformProps } from './types';
import { useMultiform } from './useMultiform';
import { observer } from 'mobx-react';
import { useImageStore } from '@store';

export const Multiform: React.FC<MultiformProps> = observer(({ elements }) => {
  const imageStore = useImageStore();
  const { currentStage, navigationState, goToNext, goToPrev } = useMultiform(
    elements,
    imageStore
  );

  const currentElement = elements[currentStage];
  const { canGoPrev, canGoNext, prevLabel, nextLabel } = navigationState;

  return (
    <div className="multiform">
      <div id={currentElement.id}>{currentElement.component}</div>
      <div className='multiform-controls'>
        <Button
          id="button-prev"
          onClick={goToPrev}
          label={prevLabel}
          disabled={!canGoPrev}
        />
        <Button
          id="button-next"
          onClick={goToNext}
          label={nextLabel}
          disabled={!canGoNext}
        />
      </div>
    </div>
  );
});
