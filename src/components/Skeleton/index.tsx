import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './style.scss';

const SkeletonCard = () => {
  return (
    <div>
      <Skeleton width={250} height={150} />
        <div className="skeleton__line" data-testid="skeleton">
          <Skeleton height={12} count={4} />
        </div>
     </div>
  )
};

export default SkeletonCard;