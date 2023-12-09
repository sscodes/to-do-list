import { Button } from 'react-bootstrap';

const ButtonComponent = ({ variant, name }) => {
  return <Button variant={variant} size="lg">{name}</Button>;
};

export default ButtonComponent;
