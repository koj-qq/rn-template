import React from 'react';
import { ImageBackground, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import ShadowCard, { ShadowCardProps } from '../ShadowCard';

interface CardProps extends Omit<ShadowCardProps, 'style'> {
  image?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = props => {
  const { image, style, children, ...restProps } = props;
  if (image) {
    return (
      <ImageBackground
        source={image}
        style={[{ width: '100%', height: '100%' }, style]}
        imageStyle={{ borderRadius: restProps.cornerRadius }}
      >
        {children}
      </ImageBackground>
    );
  }
  return (
    <ShadowCard {...restProps} style={style}>
      {children}
    </ShadowCard>
  );
};
Card.defaultProps = {
  backgroundColor: '#ffffff',
  elevation: 3,
  cornerRadius: 5,
  opacity: 0.3,
};

export default Card;
