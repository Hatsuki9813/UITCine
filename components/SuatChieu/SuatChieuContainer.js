import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SuatChieuContainer({time}) {
  return (
    <TouchableOpacity style={styles.Container}>
      <Text style={styles.Time}>{time}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    Container: {
        borderWidth: 1,
        borderRadius: 8,
        margin:10,
        padding: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',

    },
    Time: {
        textAlign: 'center'
    }
})