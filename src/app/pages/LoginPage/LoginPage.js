import { div, p, span, h1, h2, button } from '@core/tags';
import { Component } from '@core/component';

export default class LoginPage extends Component {
  constructor(props){
    super(props);
  }

  init(){
    this.state = this.setInitState({
      count: 0,
      number: 0,
      active: false,
    })

    setInterval(()=>{
      this.state.count = this.state.count + 1;
      // this.state.number = this.state.number + 1;
    },1000)
  }

  render(){ 
    const {count, number, active} = this.state;
    return ( 
      div(`c=container state-active ${active ? 'active' : 'inactive'};`, [
        h1('state=count;',[count]),
        h2('state=number;',[number]),
        button(['INCREMENT']),
      ],)
    );
  }
}