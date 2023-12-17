import { Button } from 'react-bootstrap';

const ButtonComponent = ({ variant, name, type, disabled }) => {
  return (
    <Button type={type} variant={variant} disabled={disabled} size='lg'>
      {name}
    </Button>
  );
};

export default ButtonComponent;
