import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ count, page, setPage }) => (
  <div className='d-flex justify-content-center pt-5'>
    <Pagination size='md'>
      {[...Array(count)].map((_, i) => (
        <Pagination.Item
          className={`pagination-item ${
            i === 0
              ? 'pagination-first'
              : i === count - 1
              ? 'pagination-last'
              : ''
          }`}
          active={page === i}
          key={i}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  </div>
);

export default PaginationComponent;
