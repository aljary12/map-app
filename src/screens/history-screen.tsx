import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {Prediction} from '../types/place';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavBar from '../components/nav-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import {clearHistory, historySelector} from '../stores/history-slice';
import PlaceCard from '../components/place-card';

function HistoryScreen() {
  const dispatch = useDispatch();
  const history = useSelector(historySelector);

  const renderItem: ListRenderItem<Prediction> = useCallback(({item}) => {
    return <PlaceCard {...item} />;
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <NavBar
        back
        title="History"
        iconRight={{name: 'trash-outline'}}
        iconRightOnPress={() => dispatch(clearHistory())}
      />
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
