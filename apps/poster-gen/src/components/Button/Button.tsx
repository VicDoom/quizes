interface ButtonProps {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  id,
  label,
  disabled,
  onClick,
}) => {
  return (
    <button className="button" id={id} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};
