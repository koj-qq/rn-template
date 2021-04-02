import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@td-design/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container: React.FC<{ hasHeader?: boolean }> = ({ hasHeader = true, children }) => {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.white }}
      edges={hasHeader ? ['bottom', 'left', 'right'] : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {children}
    </SafeAreaView>
  );
};

export default Container;
