import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { DienVien } from '../Data/Data';
export default function DienVienContainer() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DienVien}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.avatar} style={styles.avatar} />
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id} 
        horizontal 
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    alignItems: 'center', // Căn giữa Avatar và Text
    marginRight: 20,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40, // Để tạo hình tròn
    borderWidth: 2,
    borderColor: 'black',
  },
  nameText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
