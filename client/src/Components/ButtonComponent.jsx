import { Button } from 'react-bootstrap';

const ButtonComponent = ({ variant, name, type, disabled, onClick }) => {
  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      style={{ fontSize: '1rem' }}
    >
      {name}
    </Button>
  );
};

export default ButtonComponent;
