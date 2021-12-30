import { app } from 'hyperapp';
import html from 'hyperlit';
import {
  ToggleHighlight,
  Select,
  GotNames,
  SelectUp,
  SelectDown,
} from './ui/actions/actions';
import IState from './ui/state/IState';
import person from './ui/components/person';
import { fetchJson } from './ui/effects/effects';
import { onKeydown } from './ui/subscriptions/subscriptions';

const baseState: IState = {
  names: null,
  highlight: [],
  selected: null,
  bio: null,
  ids: [],
};

app({
  init: [
    baseState,
    [
      fetchJson,
      {
        url: `https://jsonplaceholder.typicode.com/users`,
        action: GotNames,
      },
    ],
  ],
  view: (state) => html`
    <main>
      ${state.names &&
      html`<ul class="person-list" data-cy="person-list">
        ${state.names.map((name, index) =>
          person({
            name,
            highlight: state.highlight[index],
            selected: state.selected === index,
            ontoggle: [ToggleHighlight, index],
            onselect: [Select, index],
          })
        )}
      </ul>`}
      ${state.bio &&
      state.bio.length > 0 &&
      html`<div data-cy="bio">${state.bio}</div>`}
    </main>
  `,
  subscriptions: (state) => [
    state.selected !== null &&
      state.selected > 0 &&
      onKeydown('ArrowUp', SelectUp),
    state.selected !== null &&
      state.selected < state.ids.length - 1 &&
      onKeydown('ArrowDown', SelectDown),
  ],
  node: document.getElementById('root')!,
});
