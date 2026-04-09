import { useQuery } from '@tanstack/react-query';
import { getDashboard } from './dashboard.api';

const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });
};

export default useDashboard;