import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator  } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RapPhimScreen from '../Rap';
import TrangChuScreen from '../TrangChu';
import TaiKhoanScreen from '../TaiKhoan';
import TinTuc from '../BookingInfoNews/TinTuc';
import ThongTin from '../BookingInfoNews/ThongTin';
import LichChieu from '../BookingInfoNews/LichChieu';
import { NavigationContainer } from '@react-navigation/native';
function BookingInfoNewTopTabs({route}) {
   const { movieTitle,poster  } = route.params || {}; // Lấy movieTitle từ route params

   const TopTab = createMaterialTopTabNavigator();
   return (  
    <TopTab.Navigator screenOptions={{swipeEnabled: false, headerTitle: movieTitle , tabBarIndicatorStyle: {backgroundColor: '#9747FF', height: 3, },  tabBarActiveTintColor: '#9747FF',  tabBarInactiveTintColor: 'gray' }}>
      <TopTab.Screen name="Lịch chiếu" component={LichChieu} />
      <TopTab.Screen  name="Thông tin"  children={() => <ThongTin poster={poster} />}      />
      <TopTab.Screen  name="Tin tức" component={TinTuc} />
    </TopTab.Navigator>
  )
}
function DatveStack() {
  const Stack = createStackNavigator();
  return (  
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={TrangChuScreen} options={{headerShown:false}}/>
      <Stack.Screen name="BookingInfoNewsTopTab" component={BookingInfoNewTopTabs}  options={({ route }) => ({
    title: route.params?.movieTitle// Hiển thị tên phim trong header
  })}/>
    </Stack.Navigator>
  )
}
function BottomTabs() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      initialRouteName='TrangChu'
      screenOptions={({ route }) => ({
        headerTintColor: 'black', 
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#9747FF',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'TrangChu') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Rap') {
            iconName = focused ? 'movie' : 'movie-outline';
          } else if (route.name === 'Taikhoan') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          } 
          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <BottomTab.Screen
        name="TrangChu"
        component={DatveStack}
        options={{headerShown:false}}
        
      />
      <BottomTab.Screen
        name="Rap"
        component={RapPhimScreen}
        options={{headerShown:false}}

      />
      <BottomTab.Screen
        name="Taikhoan"
        component={TaiKhoanScreen}
        options={{headerShown:false}}

      />
    </BottomTab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}


