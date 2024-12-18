import { Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import colors from "../themes/colors";

import HomeStack from "./HomeStack";
import AccountStack from "./AccountStack";
import CinemaStack from "./CinemaStack";

const titles = {
    HomeStack: "Trang chủ",
    CinemaStack: "Rạp phim",
    AccountStack: "Tài khoản",
};

const renderTabBarLabel = (title, focused) => {
    return (
        <Text
            style={{
                fontSize: 12,
                fontFamily: focused ? "BVP_SemiBold" : "BVP_Regular",
                color: focused ? colors.lightPurple : colors.gray,
            }}
        >
            {title}
        </Text>
    );
};

export default function MainBottom() {
    const BottomTab = createBottomTabNavigator();

    let tabBarStyle = {};

    // Kiểm tra nếu là Android, thay đổi chiều cao của tab bar
    if (Platform.OS === "android") {
        tabBarStyle = { height: 60 };
    }

    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => {
                return {
                    headerTitleStyle: {
                        fontSize: 20,
                        fontFamily: "BVP_SemiBold",
                        color: "black",
                    },
                    tabBarIcon: ({ focused, color }) => {
                        let iconName;

                        if (route.name === "HomeStack") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "CinemaStack") {
                            iconName = focused ? "film" : "film-outline";
                        } else if (route.name === "AccountStack") {
                            iconName = focused ? "person" : "person-outline";
                        }

                        return <Ionicons name={iconName} size={24} color={color} />;
                    },
                    tabBarLabel: ({ focused }) => renderTabBarLabel(titles[route.name], focused),
                    tabBarActiveTintColor: colors.lightPurple,
                    tabBarInactiveTintColor: colors.gray,
                    tabBarStyle: tabBarStyle,
                };
            }}
        >
            <BottomTab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
            <BottomTab.Screen name="CinemaStack" component={CinemaStack} options={{ headerShown: false }} />
            <BottomTab.Screen name="AccountStack" component={AccountStack} options={{ headerShown: false }} />
        </BottomTab.Navigator>
    );
}
