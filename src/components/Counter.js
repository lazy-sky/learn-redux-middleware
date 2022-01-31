import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease } from '../modules/counter';

function Counter() {
  const number = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const handleClickIncrease = () => {
    dispatch(increase());
  }

  const handleClickDecrease = () => {
    dispatch(decrease());
  }
  
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={handleClickIncrease}>+1</button>
      <button onClick={handleClickDecrease}>-1</button>
    </div>
  )
}

export default Counter;