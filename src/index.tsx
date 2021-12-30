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
  loading: {
    names: true,
    bio: false,
  },
};

app({
  init: [
    baseState,
    JsonFetcher('https://jsonplaceholder.typicode.com/users', GotNames),
  ],
  view: (state) => html`
    <main>
      ${state.loading.names
        ? html`<div data-cy="loading-names-helper">Loading...</div>`
        : html`<ul class="person-list" data-cy="person-list">
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
      ${state.loading.bio
        ? html`<div data-cy="loading-bio-helper">Loading bio...</div>`
        : html`<div data-cy="bio">${state.bio}</div>`}
    </main>
  `,
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
