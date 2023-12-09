import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary text-light py-3 d-flex justify-content-center'
      bg='dark'
      data-bs-theme='dark'
      fixed='bottom'
    >
      <h5>Developed by sscodes</h5>
    </Navbar>
  );
};

export default Footer;
