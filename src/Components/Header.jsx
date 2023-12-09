import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar
      className='bg-body-tertiary'
      bg='dark'
      data-bs-theme='dark'
      sticky='top'
    >
      <Container>
        <Navbar.Brand>
          <h1>To-Do-List</h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>Signed in as: Otto Octavius</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
