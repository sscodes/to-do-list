import { Button } from 'react-bootstrap';

interface ButtonComponentProps {
  variant?: string;
  name: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonComponent = ({
  variant,
  name,
  type = 'submit',
  disabled = false,
  onClick,
}: ButtonComponentProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      style={{
        fontSize: '1rem',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#3737c8ff',
      }}
    >
      {name}
    </Button>
  );
};

export default ButtonComponent;
