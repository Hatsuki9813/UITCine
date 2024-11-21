import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window'); // Lấy chiều rộng màn hình

export default function MoviePosterContainer({moviename, poster, navigation }) {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('BookingInfoNewsTopTab', { movieTitle: moviename, poster })}>
      <Image
        source={poster}
        style={styles.image} 
        resizeMode="cover" 
      />
      <Text style={styles.text}>{moviename}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.4,
    borderRadius: 15, // Bo góc
    backgroundColor: '#fff', // Màu nền của card
    elevation: 10, // Đổ bóng cho Android
    borderWidth: 1, // Đường viền
    borderColor: '#ddd', // Màu viền
    alignItems: 'center', // Căn giữa nội dung
    margin: 10, // Khoảng cách giữa các container
    overflow: 'hidden', // Đảm bảo bo góc áp dụng cho hình ảnh
  },
  image: {
    width: '100%', // Chiều rộng ảnh = chiều rộng của container
    height: 200, // Đặt chiều cao cố định
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold'
  },
});
