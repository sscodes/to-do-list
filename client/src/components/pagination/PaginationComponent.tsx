import Pagination from 'react-bootstrap/Pagination';

interface PaginationComponentProps {
  count: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationComponent = ({
  count,
  page,
  setPage,
}: PaginationComponentProps) => (
  <div className='d-flex justify-content-center pt-5'>
    <Pagination>
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
