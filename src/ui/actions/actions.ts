import IState from '../state/IState';

// eslint-disable-next-line import/prefer-default-export
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

export const select: (state: IState, selected: number) => IState = (
  state,
  selected
) => ({ ...state, selected });
