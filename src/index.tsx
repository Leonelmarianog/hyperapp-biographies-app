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
import { JsonFetcher } from './ui/effects/effects';
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
    JsonFetcher('https://jsonplaceholder.typicode.com/users', GotNames),
  ],
  view: (state) => {
    const gotBio =
      state.bio !== null &&
      typeof state.bio === 'string' &&
      state.bio.length > 0;

    const gotNames = state.names !== null && Array.isArray(state.names);

    return html`
      <main>
        ${gotNames &&
        html`<ul class="person-list" data-cy="person-list">
          ${state.names!.map((name, index) =>
            person({
              name,
              highlight: state.highlight[index],
              selected: state.selected === index,
              ontoggle: [ToggleHighlight, index],
              onselect: [Select, index],
            })
          )}
        </ul>`}
        ${gotBio && html`<div data-cy="bio">${state.bio}</div>`}
      </main>
    `;
  },
  subscriptions: (state) => {
    const topmostPersonNotSelected =
      state.selected !== null && state.selected > 0;
    const bottomPersonNotSelected =
      state.selected !== null && state.selected < state.ids.length - 1;

    return [
      topmostPersonNotSelected && onKeydown('ArrowUp', SelectUp),
      bottomPersonNotSelected && onKeydown('ArrowDown', SelectDown),
    ];
  },
  node: document.getElementById('root')!,
});
