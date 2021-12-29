import { Action } from 'hyperapp';
import IState from '../state/IState';
import { fetchJson } from '../effects/effects';

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
