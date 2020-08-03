import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { List } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemText from '../ListItemText';

interface CustomItemProps {
  title: ReactNode | string; // 主标题
  extra?: ReactNode | string; // 右面的文字
  brief?: string | ReactNode; // 主标题下面的副标题
  thumb?: ReactNode | null; // 图标
  navigateTo?: string; // 跳转的stackName
  onPress?: () => void;
  style?: StyleProp<ViewStyle>; // 自定义style
  isError?: boolean; // 提交表单时是否处于error状态，为true时title会标记为红色
  arrow?: boolean; // 是否显示右边箭头
  wrap?: boolean; // 是否折行
  multipleLine?: boolean; // 是否显示成多行
}

// eslint-disable-next-line complexity
const CustomListItem = ({
  title,
  brief,
  thumb,
  onPress,
  style,
  extra,
  navigateTo,
  isError,
  arrow = true,
  wrap = false,
  multipleLine = false,
}: CustomItemProps) => {
  const Item = List.Item;
  const Brief = Item.Brief;
  const navigation = useNavigation();

  const childrenComp = brief ? (
    <>
      {typeof title === 'string' ? <ListItemText isError={isError} text={title} /> : title}
      <Brief>{brief}</Brief>
    </>
  ) : (
    <>{typeof title === 'string' ? <ListItemText isError={isError} text={title} /> : title}</>
  );

  return (
    <Item
      style={style}
      thumb={thumb}
      extra={extra}
      wrap={wrap}
      multipleLine={multipleLine}
      arrow={arrow ? (navigateTo || onPress) && 'horizontal' : ''}
      onPress={navigateTo ? () => navigation.navigate(navigateTo) : onPress}
    >
      {childrenComp}
    </Item>
  );
};

export default CustomListItem;
