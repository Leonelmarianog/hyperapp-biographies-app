import { app } from 'hyperapp';
import html from 'hyperlit';
import { ToggleHighlight, Select } from './ui/actions/actions';
import IState from './ui/state/IState';
import person from './ui/components/person';

const baseState: IState = {
  names: [
    'Leanne Graham',
    'Ervin Howell',
    'Clementine Bauch',
    'Patricia Lebsack',
    'Chelsey Dietrich',
  ],
  highlight: [false, true, false, false, false],
  selected: null,
  bio: null,
  ids: [1, 2, 3, 4, 5],
};

app({
  init: baseState,
  view: (state) => html`
    <main>
      <ul class="person-list" data-cy="person-list">
        ${state.names.map((name, index) =>
          person({
            name,
            highlight: state.highlight[index],
            selected: state.selected === index,
            ontoggle: [ToggleHighlight, index],
            onselect: [Select, index],
          })
        )}
      </ul>
      ${state.bio &&
      state.bio.length > 0 &&
      html`<div data-cy="bio">${state.bio}</div>`}
    </main>
  `,
  node: document.getElementById('root')!,
});
