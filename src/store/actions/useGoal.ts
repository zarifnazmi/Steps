// store/actions/useGoal.ts

import { useDispatch } from 'react-redux';
import { saveGoal } from '../reducers/goalSlice';

interface GoalItem {
  step: number;
}

const useGoal = () => {
  const dispatch = useDispatch();

  const setGoals = (item: GoalItem) => {
    dispatch(saveGoal(item));
  };

  return {
    setGoals,
  };
};

export default useGoal;
