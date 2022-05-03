import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlcohol } from '../store/actionCreators';

function App() {
  const dispatch = useDispatch();
  const alcoholLoaded = useSelector(({ alcohol }: AlcoholsState) => alcohol.isLoaded);

  useEffect(() => {
    if (!alcoholLoaded) dispatch(getAlcohol());
  });
  return <div className="App">App</div>;
}

export default App;
