import React, {useCallback} from 'react';
import InputForm from '../components/input-form';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions, searchSelector} from '../stores/search-slice';
import {debounce} from 'lodash';
import {AppDispatch} from '../stores';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Prediction} from '../types/place';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavBar from '../components/nav-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../navigator/root-navigator';
import PlaceCard from '../components/place-card';

type Navigation = NativeStackNavigationProp<RootParamList>;

function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const dispatch = useDispatch<AppDispatch>();
  const {searching, predictions, error} = useSelector(searchSelector);

  const search = debounce((text: string) => {
    const input = text.trim();

    dispatch(searchActions.autocomplete({input}));
  }, 500);

  const renderItem: ListRenderItem<Prediction> = useCallback(({item}) => {
    return <PlaceCard {...item} />;
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <NavBar
        title="Home"
        iconRight={{name: 'time-outline'}}
        iconRightOnPress={() => navigation.navigate('history')}
      />
      <InputForm
        placeholder="Search"
        clearButtonMode="while-editing"
        onChangeText={search}
      />
      <FlatList
        data={predictions}
        renderItem={renderItem}
        keyExtractor={item => item.place_id}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: predictions.length > 0 ? 'flex-start' : 'center',
          gap: 20,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          searching ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Error />
          ) : (
            <Empty />
          )
        }
      />
    </SafeAreaView>
  );
}

const Error = () => {
  return (
    <View style={styles.empty}>
      <Icon name="alert" size={72} color="#DD2534" />
      <Text style={styles.emptyBody}>Can't find your location</Text>
    </View>
  );
};

const Empty = () => {
  return (
    <View style={styles.empty}>
      <Icon name="search" size={72} />
      <Text style={styles.emptyBody}>Search your location</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyBody: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});
