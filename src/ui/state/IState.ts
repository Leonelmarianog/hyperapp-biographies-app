interface IState {
  names: null | string[];
  highlight: [] | boolean[];
  selected: number | null;
  bio: null | string;
  ids: [] | number[];
  loading: Record<string, boolean>;
}

export default IState;
