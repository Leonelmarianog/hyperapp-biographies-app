interface IState {
  names: string[];
  highlight: boolean[];
  selected: number | null;
  bio: null | string;
  ids: number[];
}

export default IState;
