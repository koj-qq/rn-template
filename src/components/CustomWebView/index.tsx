import React from 'react';
import WebView from 'react-native-webview';
import { View, StyleProp, ViewStyle } from 'react-native';
import { PlaceholderLine, Placeholder, Fade } from 'rn-placeholder';
import { WingBlank } from '@ant-design/react-native';
import { Size } from '@/config';

interface CustomWebViewProps {
  strings: string; //富文本生成的string
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}

export default function CustomWebView({ strings, style = { flex: 1 }, loading = false }: CustomWebViewProps) {
  if (loading) {
    return (
      <WingBlank style={{ marginTop: Size.px(16) }}>
        <Placeholder Animation={Fade}>
          <PlaceholderLine />
          <PlaceholderLine />
          <PlaceholderLine />
          <PlaceholderLine width={40} />
        </Placeholder>
      </WingBlank>
    );
  }
  return (
    <View style={style}>
      <WebView
        source={{ html: strings }}
        originWhitelist={['*']}
        allowUniversalAccessFromFileURLs={true}
        androidHardwareAccelerationDisabled={true} // false会导致安卓手机在9以及以上版本崩溃
        geolocationEnabled={false}
        mixedContentMode={'always'}
        javaScriptEnabled={true}
      />
    </View>
  );
}
