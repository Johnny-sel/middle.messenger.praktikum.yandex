import { div, p, span, h1, h2, button } from '@core/vdom';
import { Component } from '@core/component';

export default class LoginPage extends Component {
  constructor(){
    super();
  }

  initState () {
    return {
      count: 0,
      number: 0,
      isActive: false,
      isFlag: false,
    }
  }

  didMount(){
    // setInterval(()=>{
    //   this.state.count = this.state.count + 1;
    //   this.state.isActive = true;
    //   this.state.isFlag = true;
    // },1000)

    setInterval(()=>{
      this.state.number = this.state.number + 1;
      this.state.isActive = false;
      this.state.isFlag = false;
    },1500)

    this.state.number = this.state.number + 1;
    // this.state.number = this.state.number + 1;
    // this.state.isActive = true;
  }

  render(state){ 
    const { count, number, isActive,isFlag } = state;
    const active = isActive ? ' active' : ' inactive';
    const flag = isFlag ? ' active' : ' inactive';

    return ( 
      div(`c=container ${active};`, [
        h1(`c=container ${flag};`,[count]),
        h2(`c=container ${flag};`,[number]),
        button(`c=container ${active};`, ['INCREMENT']),
      ],)
    );
  }
}