import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const SearchTask = ({ placeholder, setSearchedText }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <Form.Control
      type='text'
      placeholder={placeholder}
      className={`${theme === 'DARK' && 'form-control-dark'}`}
      onChange={(e) => setSearchedText(e.target.value)}
      style={{ fontSize: '1rem' }}
    />
  );
};

export default SearchTask;
