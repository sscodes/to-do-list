import { Button } from 'react-bootstrap';
import classes from './styles.module.css';

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
      className={classes.button}
    >
      {name}
    </Button>
  );
};

export default ButtonComponent;
