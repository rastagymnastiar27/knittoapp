import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../features/bookmarkSlice'; // Action bookmark
import { RootState } from '../store'; // Import RootState untuk akses state

const ImageCard = ({ image }: { image: any }) => {
  const dispatch = useDispatch();
  const bookmarkedImages = useSelector((state: RootState) => state.bookmark.bookmarkedImages); // Ambil daftar gambar yang dibookmark dari Redux

  // Cek apakah gambar ini sudah dibookmark
  const isBookmarked = bookmarkedImages.some((item) => item.id === image.id);

  const handleBookmark = () => {
    if (isBookmarked) {
      // Jika gambar sudah dibookmark, hapus dari bookmark
      dispatch(removeBookmark(image));
    } else {
      // Jika gambar belum dibookmark, tambahkan ke bookmark
      dispatch(addBookmark(image));
    }
  };

  return (
    <View style={styles.card}>
      {/* Gambar */}
      <Image source={{ uri: image.webformatURL }} style={styles.image} />

      {/* User */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>User:</Text>
        <Text style={styles.title}>{image.user}</Text>
      </View>

      {/* Tags */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tags:</Text>
        <View style={styles.tagsContainer}>
          {image.tags.split(',').map((tag: string, index: number) => (
            <Text key={index} style={styles.tag}>#{tag.trim()}</Text>
          ))}
        </View>
      </View>

      {/* Tombol Bookmark */}
      <TouchableOpacity 
        style={[styles.bookmarkButton, isBookmarked && styles.bookmarked]}
        onPress={handleBookmark}
      >
        <Text style={styles.buttonText}>
          {isBookmarked ? "Remove from Bookmark" : "Add to Bookmark"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 7,
  },
  tag: {
    fontSize: 14,
    color: '#007BFF',
    marginRight: 8,
    marginBottom: 6,
  },
  bookmarkButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  bookmarked: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageCard;
