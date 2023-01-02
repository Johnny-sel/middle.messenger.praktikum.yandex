import { div, p, span, h1, h2, button } from '@core/tags';
import { getState } from '@core/state';

export default LoginPage = ()=> {
  const initialState = { count: 0, key: '1234' };
  const state = getState(initialState);

  setInterval(()=>{
    console.log('state:', state.count)
    state.count++;
  }, 1000);

  return ( 
      div(`c=container ${state.active ? 'active' : 'inactive'};`, [
        h1('k=1234', [state.count]),
        button(['INCREMENT']),
      ],)
  );
}