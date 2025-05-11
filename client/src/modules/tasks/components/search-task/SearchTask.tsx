import { Form } from 'react-bootstrap';
// import { useSelector } from 'react-redux';

interface SearchTaskProps {
  placeholder: string;
  setSearchedText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchTask = ({ placeholder, setSearchedText }: SearchTaskProps) => {
  // const { theme } = useSelector((state) => state.theme);
  return (
    <Form.Control
      type='text'
      placeholder={placeholder}
      // className={`${theme === 'DARK' && 'form-control-dark'}`}
      onChange={(e) => setSearchedText(e.target.value)}
      style={{ fontSize: '1rem' }}
    />
  );
};

export default SearchTask;
