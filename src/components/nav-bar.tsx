import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconProps} from 'react-native-vector-icons/Icon';

interface Props {
  back?: boolean;
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  iconRight?: IconProps;
  iconRightOnPress?: () => void;
}
export default function NavBar(props: Props) {
  const navigation = useNavigation();
  const {back, title, containerStyle, titleStyle, iconRight, iconRightOnPress} =
    props;

  return (
    <View style={[styles.container, containerStyle]}>
      {back ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <Text style={[styles.title, titleStyle]}>{title}</Text>

      {iconRight && (
        <TouchableOpacity onPress={iconRightOnPress}>
          <Icon size={24} {...iconRight} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
});
