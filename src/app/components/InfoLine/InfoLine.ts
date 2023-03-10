import './InfoLine.sass';

import {div, span} from '@core/tags';
import {Component} from '@core/component';
import {capitalizeFirstLetter} from '@core/utils';

export default class InfoLine extends Component<{}, InfoLineProps> {
  constructor() {
    super();
  }

  create() {
    const name = (this.props.name as string).replace('_', ' ');
    const value = this.props.value as string;

    // prettier-ignore
    return (
      div('c=info_line;', [
        span('c=info_line__name text;', [capitalizeFirstLetter(name) || 'Loading...']),
        span('c=info_line__value text;', [value || 'Loading...']),
      ])
    );
  }
}

type InfoLineProps = {
  name: string;
  value: string;
};
