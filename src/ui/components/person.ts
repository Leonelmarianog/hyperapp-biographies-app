import html from 'hyperlit';
import IState from '../state/IState';

interface IPersonProps {
  name: string;
  highlight: boolean;
  ontoggle: (number | ((state: IState, index: number) => IState))[];
}

const person = ({ name, highlight, ontoggle }: IPersonProps) => html`
  <li class=${{ person: true, 'person-active': highlight }} data-cy=${name}>
    <input type="checkbox" checked=${highlight} onclick=${ontoggle} />
    <p>${name}</p>
  </li>
`;

export default person;
