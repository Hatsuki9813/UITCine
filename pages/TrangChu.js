import { StyleSheet, Text, View, Dimensions , ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";
import HomePageMovieSection from "../components/MovieContainer/HomePageMovieSection"
import {SomeImage} from '../components/Data/Data'


export default function TrangChuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
      <SliderBox
        images={SomeImage}
        resizeMethod={'resize'}
        resizeMode={'cover'}     
        sliderBoxHeight={200}
        dotStyle={styles.dotStyle}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
      />
      
      <HomePageMovieSection sectionName={'Đang chiếu'} navigation={navigation}/>
      <HomePageMovieSection sectionName={'Sắp chiếu'} />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});