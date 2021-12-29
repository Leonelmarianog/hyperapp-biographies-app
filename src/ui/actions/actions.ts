import { Action, Dispatch } from 'hyperapp';
import IState from '../state/IState';

type Effecter<S, P> = (
  dispatch: Dispatch<S>,
  payload: P
) => void | Promise<void>;

export const toggleHighlight: (state: IState, index: number) => IState = (
  state,
  index
) => {
  const highlight = [...state.highlight];

  highlight[index] = !highlight[index];

  return {
    ...state,
    highlight,
  };
};

export const gotBio: (state: IState, data: any) => IState = (state, data) => ({
  ...state,
  bio: data.company.bs,
});

interface IFetchJsonOptions {
  url: string;
  action: Action<IState, any>;
}

const fetchJson: Effecter<IState, IFetchJsonOptions> = async (
  dispatch,
  options
) => {
  const response = await fetch(options.url);
  const data = await response.json();
  dispatch(options.action, data);
};

export const select: Action<IState, number> = (state, selected) => [
  { ...state, selected },
  [
    fetchJson,
    {
      url: `https://jsonplaceholder.typicode.com/users/${state.ids[selected]}`,
      action: gotBio,
    },
  ],
];
