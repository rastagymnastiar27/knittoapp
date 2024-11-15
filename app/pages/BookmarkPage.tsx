import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ImageCard from '../components/ImageCard';

const BookmarkPage = () => {
  const { bookmarkedImages } = useSelector((state: RootState) => state.bookmark);

  const renderItem = ({ item }: { item: any }) => (
    <ImageCard image={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedImages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No bookmarked images yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default BookmarkPage;
