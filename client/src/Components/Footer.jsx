import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar
      className='bg-body-tertiary text-light py-3 d-flex justify-content-center'
      bg='dark'
      data-bs-theme='dark'
      fixed='bottom'
    >
      Developed by&nbsp;
      <a
        href='https://www.linkedin.com/in/sscodes/'
        target='_blank'
        rel='noreferrer'
        style={{ color: 'whitesmoke' }}
      >
        sscodes
      </a>
    </Navbar>
  );
};

export default Footer;
