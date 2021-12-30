import IState from '../state/IState';

type IResource = 'names' | 'bio';

// eslint-disable-next-line import/prefer-default-export
export const toggleLoading = (state: IState, resource: IResource) => {
  const loading = { ...state.loading };

  loading[resource] = !loading[resource];

  return loading;
};
