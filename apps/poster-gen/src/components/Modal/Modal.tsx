import { PropsWithChildren } from 'react';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onChange: (value: boolean) => unknown;
}

export const Modal: React.FC<ModalProps> = ({ open, onChange, children }) => {
  return (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal__overlay" />
      <div className="modal__content">
        <div className="modal__close" onClick={() => onChange(false)}>
          <img src="/icons/close.svg" alt="close" />
        </div>
        {children}
      </div>
    </div>
  );
};
