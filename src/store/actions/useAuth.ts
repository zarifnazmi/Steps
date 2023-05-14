// store/actions/useAuth.ts

import { useDispatch } from 'react-redux';
import { switchAuth } from '../reducers/authSlice';

interface AuthItem {
  switch: number;
}

const useAuth = () => {
  const dispatch = useDispatch();

  const switchOffOnboard = (item: AuthItem) => {
    dispatch(switchAuth(item));
  };

  return {
    switchOffOnboard,
  };
};

export default useAuth;
