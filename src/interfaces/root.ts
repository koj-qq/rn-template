export type RootParamList = {
  Tab: undefined;
};

export type State = {
  key: string;
  index: number;
  routeNames: string[];
  type: string;
  routes: {
    key: string;
    name: string;
    params?: unknown;
  }[];
};
