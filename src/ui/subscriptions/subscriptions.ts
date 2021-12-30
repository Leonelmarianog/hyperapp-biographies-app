import { Subscription, Dispatch, Unsubscribe, Action } from 'hyperapp';
import IState from '../state/IState';

type Subscriber<S, P = any> = (
  dispatch: Dispatch<S>,
  payload: P
) => Unsubscribe;

interface IkeydownSubscriberOptions {
  key: string;
  action: Action<IState>;
}

const keydownSubscriber: Subscriber<IState, IkeydownSubscriberOptions> = (
  dispatch,
  options
) => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== options.key) {
      return;
    }

    dispatch(options.action);
  };

  document.addEventListener('keydown', handleKeydown);

  return () => document.removeEventListener('keydown', handleKeydown);
};

// Subscription Creator
// eslint-disable-next-line import/prefer-default-export
export const onKeydown: (
  key: string,
  action: Action<IState>
) => Subscription<IState, IkeydownSubscriberOptions> = (key, action) => [
  keydownSubscriber,
  { key, action },
];
