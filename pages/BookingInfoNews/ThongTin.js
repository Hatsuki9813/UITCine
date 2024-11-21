import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native'
import React, { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import DienVienContainer from '../../components/DienVienContainer/DienVienContainer';
export default function ThongTin({ poster }) {
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.PosterAndDescription}> 
        <Image source={poster} style={styles.poster} />
        <View style={styles.textContainer}>

      <Text style={styles.TheLoai}>
        Thể loại: 
      </Text>
      <Text stlye={styles.NoiDung}>
        Nội dung abcxyz
      </Text>
      </View>
      </View>
      <View style={styles.TrailerContainer}> 
      <Text style={styles.ProduceText}>
        Trailer
      </Text>
      <YoutubePlayer
        height={300}
        videoId={"jxcKe1I4HtQ"}
      />
 
      </View>
      <View style={styles.DienVienContainer}> 
      <Text style={styles.ProduceText}>
        Thông tin diễn viên
      </Text>
      <DienVienContainer/>

      </View>
    </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  PosterAndDescription: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  poster: {
    width: 200,
    height: 300,
    marginBottom: 16,
    resizeMode: 'cover',

  },
  TheLoai: {
    fontSize: 16,
  },
  NoiDung: {
    fontSize: 16,
  },
  ProduceText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9747FF',

  },
  textContainer: {
    flex: 1,
    marginLeft: 10, // Tạo khoảng cách giữa poster và text
    flexDirection: 'column', // Sắp xếp Text theo chiều dọc
  }, 
  TrailerContainer: {
    flex: 1,

  },
  DienVienContainer: {
    flex:1,
  }
})