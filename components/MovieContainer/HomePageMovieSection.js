import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import MoviePosterContainer from './MoviePosterContainer';
import {movies} from '../Data/Data'

export default function HomePageMovieSection({sectionName, navigation}) {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{sectionName}</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
            <MoviePosterContainer moviename={item.title} poster={item.image} navigation={navigation} 
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal // Cuộn ngang
          showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn
          contentContainerStyle={styles.list}
          navigation={navigation}
        />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
      },
      header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#9747FF',
        marginLeft: 10,
        marginBottom: 10,
      },
      list: {
        alignItems: 'center', // Căn giữa các phần tử FlatList
      },
})