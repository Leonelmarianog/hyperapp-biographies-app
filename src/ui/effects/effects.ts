import { Action, Dispatch } from 'hyperapp';
import IState from '../state/IState';

type Effecter<S, P> = (
  dispatch: Dispatch<S>,
  payload: P
) => void | Promise<void>;

interface IFetchJsonOptions {
  url: string;
  action: Action<IState, any>;
}

// eslint-disable-next-line import/prefer-default-export
export const fetchJson: Effecter<IState, IFetchJsonOptions> = async (
  dispatch,
  options
) => {
  const response = await fetch(options.url);
  const data = await response.json();
  dispatch(options.action, data);
};
