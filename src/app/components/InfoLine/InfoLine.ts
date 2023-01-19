import './InfoLine.sass';

import {div, span} from '@core/tags';
import {Component} from '@core/component';
import {Props, State} from '@core/types';
import {capitalizeFirstLetter} from '@core/utils';

export default class InfoLine extends Component<{}> {
  constructor() {
    super();
  }

  create(_: State, props: Props) {
    const name = (props.name as string).replace('_', ' ');
    const value = props.value as string;

    // prettier-ignore
    return (
      div('c=info_line;', [
        span('c=info_line__name text;', [capitalizeFirstLetter(name) || 'Loading...']),
        span('c=info_line__value text;', [value || 'Loading...']),
      ])
    );
  }
}
