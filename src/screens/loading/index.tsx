import React, { useEffect } from 'react';
import { View } from 'react-native';
import useToast from '@/hooks/useToast';

export default () => {
  const { startLoading, finishLoading } = useToast();

  useEffect(() => {
    startLoading();

    return () => {
      finishLoading();
    };
  }, [startLoading, finishLoading]);

  return <View />;
};
