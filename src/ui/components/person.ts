import html from 'hyperlit';
import IState from '../state/IState';
import { fromSpaceSeparatedToHyphenSeparated } from '../../utils/utils';
import { ActionDescriptor } from '../actions/actions';

interface IPersonProps {
  name: string;
  highlight: boolean;
  selected: boolean;
  ontoggle: ActionDescriptor<IState, number>;
  onselect: ActionDescriptor<IState, number>;
}

const person = ({
  name,
  highlight,
  selected,
  ontoggle,
  onselect,
}: IPersonProps) => html`
  <li
    class=${{
      person: true,
      'person-active': highlight,
      'person-selected': selected,
    }}
    data-cy=${fromSpaceSeparatedToHyphenSeparated(name)}
    onclick=${onselect}
  >
    <input
      type="checkbox"
      checked=${highlight}
      onclick=${(_state: IState, event: Event) => {
        event.stopPropagation();
        return ontoggle;
      }}
    />
    <p>${name}</p>
  </li>
`;

export default person;
