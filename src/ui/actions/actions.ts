import { Action } from 'hyperapp';
import IState from '../state/IState';
import { fetchJson } from '../effects/effects';

export type ActionDescriptor<S, P> = (P | Action<S, P>)[];

export const ToggleHighlight: Action<IState, number> = (state, index) => {
  const highlight = [...state.highlight];

  highlight[index] = !highlight[index];

  return {
    ...state,
    highlight,
  };
};

export const GotBio: Action<IState, any> = (state, data) => ({
  ...state,
  bio: data.company.bs,
});

export const GotNames: Action<IState, any> = (state, data) => {
  const names: string[] = data.slice(0, 5).map((person: any) => person.name);
  const ids: number[] = data.slice(0, 5).map((person: any) => person.id);

  return {
    ...state,
    ids,
    names,
    highlight: [false, false, false, false, false],
  };
};

export const Select: Action<IState, number> = (state, selected) => [
  { ...state, selected },
  [
    fetchJson,
    {
      url: `https://jsonplaceholder.typicode.com/users/${state.ids[selected]}`,
      action: GotBio,
    },
  ],
];
