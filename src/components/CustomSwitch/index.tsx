import React, { useState, useEffect } from 'react';
import { Switch, SwitchProps } from 'react-native-switch';
import { Color, Size } from '@/config';

type CustomSwitchProps = Omit<SwitchProps, 'onValueChange'> & { onChange?: (value: boolean) => void };

const CustomSwitch: React.FC<CustomSwitchProps> = props => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.value || false);
  }, [props.value]);

  const handleChange = (value: boolean) => {
    setChecked(value);
    props.onChange && props.onChange(value);
  };

  return (
    <Switch
      useNativeDriver={true}
      value={checked}
      onValueChange={handleChange}
      backgroundActive={props.backgroundActive}
      backgroundInactive={props.backgroundInactive}
      circleActiveColor={props.circleActiveColor}
      circleInActiveColor={props.circleInActiveColor}
      circleBorderWidth={props.circleBorderWidth}
      circleActiveBorderColor={props.circleActiveBorderColor}
      circleInactiveBorderColor={props.circleInactiveBorderColor}
      disabled={props.disabled}
      renderActiveText={false}
      renderInActiveText={false}
    />
  );
};
CustomSwitch.defaultProps = {
  useNativeDriver: true,
  backgroundActive: Color.primary,
  backgroundInactive: Color.backgroundColor,
  circleActiveColor: Color.white,
  circleInActiveColor: Color.white,
  circleBorderWidth: Size.ONE_PIXEL,
  circleInactiveBorderColor: Color.borderColor,
  circleActiveBorderColor: Color.borderColor,
  disabled: false,
};

export default React.memo(CustomSwitch);
