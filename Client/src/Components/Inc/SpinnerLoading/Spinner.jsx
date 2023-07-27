import Spinner from 'react-bootstrap/Spinner';

function SpinnerLoading() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <Spinner animation="grow" size="sm" className='me-2'  variant="secondary"/>
      <Spinner animation="grow" size="sm" className='me-2'  variant="secondary"/>
      <Spinner animation="grow" size="sm" className='me-2'  variant="secondary"/>
    </div>
  );
}

export default SpinnerLoading;