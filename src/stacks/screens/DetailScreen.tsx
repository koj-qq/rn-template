import * as React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { SharedElement } from '@td-design/react-navigation-shared-element';
import { StackNavigationProp } from '@react-navigation/stack';

import { Icon } from '../components';
import { Item, defaultItem } from '../data';

type Props = {
  navigation: StackNavigationProp<any>;
  route: any; // v5
  modal: 'none' | 'full' | 'sheet';
  resizeMode?: 'cover' | 'contain';
  onPress?: ({ navigation, item }: { navigation: any; item: Item }) => void;
};

export const DetailScreen = (props: Props) => {
  const { navigation, route, modal, resizeMode, onPress } = props;
  const params = route?.params;
  const item: Item = params?.item || defaultItem;
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={0.5}
          disabled={!onPress}
          onPress={onPress ? () => onPress({ navigation, item }) : undefined}
        >
          <SharedElement id={`${item.id}.image`} style={StyleSheet.absoluteFill}>
            <Image style={styles.image} resizeMode={resizeMode || 'cover'} source={item.image} />
          </SharedElement>
        </TouchableOpacity>
        <Text style={[styles.text, resizeMode === 'contain' ? styles.textDark : styles.textLight]}>{item.title}</Text>
        <View style={[styles.header, modal === 'sheet' ? styles.sheetHeader : undefined]}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <SharedElement id="close">
              <Icon style={styles.icon} name="ios-close" />
            </SharedElement>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    left: 16,
    top: 32,
  },
  sheetHeader: {
    left: 16,
    top: 16,
  },
  icon: {
    fontSize: 40,
    color: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 20,
    fontSize: 60,
    fontWeight: 'bold',
  },
  textDark: {
    color: 'black',
  },
  textLight: {
    color: 'white',
  },
});
