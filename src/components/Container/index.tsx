import React, { useEffect } from 'react';
import { StatusBar, ViewStyle, StyleProp } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Color } from '../../config';
import { useHeaderHeight } from '@react-navigation/stack';
import useToast from '@/hooks/useToast';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  hasHeader?: boolean;
  loading?: boolean;
}
const Container: React.FC<ContainerProps> = props => {
  const { hasHeader, style, loading, children } = props;
  const height = useHeaderHeight();
  const { startLoading, finishLoading } = useToast();

  useEffect(() => {
    if (loading) {
      startLoading();
    } else {
      finishLoading();
    }

    return () => {
      finishLoading();
    };
  }, [loading, startLoading, finishLoading]);

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: Color.white, paddingTop: hasHeader ? height : 0 }, style]}
      forceInset={{ top: 'never', bottom: hasHeader ? 'always' : 'never' }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0)" translucent />
      {children}
    </SafeAreaView>
  );
};
Container.defaultProps = {
  hasHeader: true,
};

export default Container;
