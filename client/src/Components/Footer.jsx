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
      <h5>
        Developed by{` `}
        <a
          href='https://www.linkedin.com/in/sscodes/'
          target='_blank'
          rel='noreferrer'
          style={{ color: 'whitesmoke' }}
        >
          sscodes
        </a>
      </h5>
    </Navbar>
  );
};

export default Footer;
