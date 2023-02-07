import {VirtualNode} from '../../../core/types';
import './Popover.sass';

import {div, span} from '@core/tags';
import {Component} from '@core/component';

interface PopoverProps {
  show: boolean;
  load: boolean;
  children: VirtualNode[];
  className: string;
  position: {
    left?: string | 'auto';
    right?: string | 'auto';
    top?: string | 'auto';
    bottom?: string | 'auto';
  };
}

export default class Popover extends Component<{}, PopoverProps> {
  constructor() {
    super();
  }

  create() {
    const {children, show = false, load, position = {}, className = ''} = this.props;
    const {bottom = 'auto', left = 'auto', right = 'auto', top = 'auto'} = position;

    const active = show ? '--active' : '';

    // prettier-ignore
    return (
      div(`
        c=${className} popover${active};
        s=bottom:${bottom}, top:${top}, left:${left}, right:${right}`,
      load? [span('c=text;', ['Creating...'])] : [...children],
      )
    );
  }
}
