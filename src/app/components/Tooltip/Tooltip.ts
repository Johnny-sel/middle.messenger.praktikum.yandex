import {VirtualNode} from './../../../core/types';
import './Tooltip.sass';

import {div, span} from 'src/core/vdom/tags/tags';
import {Component} from '@core/component';

interface TooltipProps {
  show: boolean;
  load: boolean;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  children: VirtualNode[];
}

export default class Tooltip extends Component<{}, TooltipProps> {
  constructor() {
    super();
  }

  create() {
    const {children, show = false, load} = this.props;
    const active = show ? 'tooltip--active' : '';

    // prettier-ignore
    return (
      div(`c=tooltip ${active};`, 
      load? [span('c=text;', ['Creating...'])] : [...children],
      )
    );
  }
}
