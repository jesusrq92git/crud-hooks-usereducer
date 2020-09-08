
export const saveLS = (state) => {
  try {
    const tmp = {
      ...loadLS(),
      ...state
    }
    const serializedState = JSON.stringify(tmp);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err)
  }
}

export const loadLS = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null){
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    return undefined;
  }
}
