import { Button } from 'react-bootstrap';

const ButtonComponent = ({ variant, name, type }) => {
  return (
    <Button type={type} variant={variant} size='lg'>
      {name}
    </Button>
  );
};

export default ButtonComponent;
