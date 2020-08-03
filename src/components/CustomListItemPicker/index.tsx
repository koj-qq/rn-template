import React from 'react';
import CustomPicker, { CustomPickerProps } from '../CustomPicker';
import { List } from '@ant-design/react-native';
import ListItemText from '../ListItemText';
import { ListItemPropsType } from '@ant-design/react-native/lib/list/PropsType';
import useToast from '@/hooks/useToast';

interface CustomListItemPickerProps extends CustomPickerProps, Pick<ListItemPropsType, 'arrow'> {
  onPress?: () => void;
  text: string;
  required?: boolean;
}
export default function CustomListItemPicker({
  cols = 1,
  title,
  extra,
  data = [],
  disabled = false,
  value,
  onChange,
  arrow = 'horizontal',
  onPress,
  text,
  required = false,
}: CustomListItemPickerProps) {
  const { toastFail } = useToast();
  const _extra = data.length > 0 ? '请选择' : '暂无数据';

  return (
    <CustomPicker
      cols={cols}
      title={title}
      extra={extra || _extra}
      data={data}
      disabled={disabled || data.length === 0}
      value={value}
      onChange={onChange}
    >
      <List.Item
        arrow={arrow}
        onPress={() => {
          if (onPress) {
            onPress();
            return;
          }
          if (data.length === 0) {
            toastFail('暂无数据');
            return;
          }
        }}
      >
        <ListItemText text={text} required={required} />
      </List.Item>
    </CustomPicker>
  );
}
