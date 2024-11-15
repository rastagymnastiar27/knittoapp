import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetImagesQuery } from '../api/pixabayApi';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppRouter';
import ImageCard from '../components/ImageCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<any[]>([]); // State untuk data gabungan
  const [triggerSearch, setTriggerSearch] = useState(false);

  const { data, isLoading, isError, isFetching } = useGetImagesQuery({ query, page, skip: !triggerSearch });

  useEffect(() => {
    if (data?.hits) {
      if (page === 1) {
        setImages(data.hits);
      } else {
        setImages((prevImages) => [...prevImages, ...data.hits]);
      }
    }
  }, [data]);

  const handleSearch = () => {
    setPage(1);
    setImages([]); // Reset data sebelumnya
    setTriggerSearch(true);
  };

  const handleLoadMore = () => {
    if (!isFetching && data?.hits.length) {
      setPage(page + 1);
    }
  };

  const renderFooter = () => {
    return isFetching ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  const renderItem = ({ item }: { item: any }) => (
    <ImageCard image={item} />
  );

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search Images" />
      <View style={styles.bookmarkContainer}>
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => navigation.navigate('Bookmark')}
        >
          <Text style={styles.bookmarkButtonText}>Bookmarked</Text>
        </TouchableOpacity>
      </View>

      {isError && <Text style={styles.error}>Failed to fetch images, try again.</Text>}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={images} // Data dari state lokal
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  bookmarkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  bookmarkButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default HomePage;
