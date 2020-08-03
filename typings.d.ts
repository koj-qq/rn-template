declare const navigator = any;
declare module 'react-native-config-reader';
declare module 'react-native-background-timer';
declare module 'react-native-settings';

declare module 'react-native-switch' {
  export interface SwitchProps {
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    backgroundActive?: string;
    backgroundInactive?: string;
    circleActiveColor?: string;
    circleInActiveColor?: string;
    circleBorderWidth?: number;
    circleInactiveBorderColor?: string;
    circleActiveBorderColor?: string;
    disabled?: boolean;
    useNativeDriver?: boolean;
  }

  export class Switch extends React.Component<SwitchProps> {}
}

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
