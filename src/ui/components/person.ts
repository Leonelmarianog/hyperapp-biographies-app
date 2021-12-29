import { Action } from 'hyperapp';
import html from 'hyperlit';
import IState from '../state/IState';

interface IPersonProps {
  name: string;
  highlight: boolean;
  selected: boolean;
  ontoggle: (number | ((state: IState, index: number) => IState))[];
  onselect: (number | Action<IState, number>)[];
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
    data-cy=${name.replace(/\s+/g, '-').toLowerCase()}
    onclick=${onselect}
  >
    <input
      type="checkbox"
      checked=${highlight}
      onclick=${(_: any, event: Event) => {
        event.stopPropagation();
        return ontoggle;
      }}
    />
    <p>${name}</p>
  </li>
`;

export default person;
