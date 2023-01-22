import {VirtualNode} from './../../../core/types';
import './Tooltip.sass';

import {div} from '@core/tags';
import {Component} from '@core/component';

interface TooltipProps {
  show: boolean;
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
    const {children, show = false} = this.props;
    const active = show ? 'tooltip--active' : '';

    // prettier-ignore
    return (
      div(`c=tooltip ${active};`, [
        ...children,
      ])
    );
  }
}
