import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const GoBackButton = state => {
  const location = useLocation();
  const backUrl = useRef(location.state ?? '/movies');
  return (
    <Link to={backUrl.current}>
      <button>Go back</button>
    </Link>
  );
};

export default GoBackButton;
