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

interface Props {
  back?: boolean;
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}
export default function NavBar(props: Props) {
  const navigation = useNavigation();
  const {back, title, containerStyle, titleStyle} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
      )}

      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 16,
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
