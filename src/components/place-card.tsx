import React from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../stores';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../navigator/root-navigator';
import {addHistory} from '../stores/history-slice';
import {Prediction} from '../types/place';

type Navigation = NativeStackNavigationProp<RootParamList>;

export default function PlaceCard(place: Prediction) {
  const navigation = useNavigation<Navigation>();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(addHistory(place));
        navigation.navigate('map', {placeId: place.place_id});
      }}>
      <View style={{gap: 8, flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="locate" size={22} color="#DD2534" />
        <View style={{gap: 4, flex: 1}}>
          <Text style={{fontWeight: '600'}}>
            {place.structured_formatting.main_text}
          </Text>
          <Text style={{fontSize: 12, fontWeight: '200'}}>
            {place.structured_formatting.secondary_text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
