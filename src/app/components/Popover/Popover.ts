import {VirtualNode} from '../../../core/types';
import './Popover.sass';

import {div, span} from '@core/tags';
import {Component} from '@core/component';

interface PopoverProps {
  show: boolean;
  load: boolean;
  children: VirtualNode[];
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
    const {children, show = false, load, position = {}} = this.props;
    const {bottom = 'auto', left = 'auto', right = 'auto', top = 'auto'} = position;

    const active = show ? 'tooltip--active' : '';

    // prettier-ignore
    return (
      div(`
        c=tooltip ${active};
        s=bottom:${bottom}, top:${top}, left:${left}, right:${right}`,
      load? [span('c=text;', ['Creating...'])] : [...children],
      )
    );
  }
}
