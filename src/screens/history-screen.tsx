import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Prediction} from '../types/place';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavBar from '../components/nav-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../navigator/root-navigator';
import {historySelector} from '../stores/history-slice';

type Navigation = NativeStackNavigationProp<RootParamList>;

function HistoryScreen() {
  const navigation = useNavigation<Navigation>();
  const history = useSelector(historySelector);

  const renderItem: ListRenderItem<Prediction> = useCallback(({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('map', {placeId: item.place_id})}>
        <View style={{gap: 8, flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="locate" size={22} color="#DD2534" />
          <View style={{gap: 4, flex: 1}}>
            <Text style={{fontWeight: '600'}}>
              {item.structured_formatting.main_text}
            </Text>
            <Text style={{fontSize: 12, fontWeight: '200'}}>
              {item.structured_formatting.secondary_text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <NavBar back title="History" />
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.place_id}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: history.length > 0 ? 'flex-start' : 'center',
          gap: 20,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Empty />}
      />
    </SafeAreaView>
  );
}

const Empty = () => {
  return (
    <View style={styles.empty}>
      <Icon name="cloud-offline-outline" size={72} />
      <Text style={styles.emptyBody}>No history yet</Text>
    </View>
  );
};

export default HistoryScreen;

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
