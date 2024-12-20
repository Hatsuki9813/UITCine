import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import Header from "../components/Header";
import FilmDetails from "../pages/FilmDetails";
import Showtimes from "../pages/Showtimes";

import colors from "../themes/colors";

const TopTab = createMaterialTopTabNavigator();

const titles = {
    FilmDetails: "Thông tin",
    Showtimes: "Suất chiếu",
};

const renderTabBarLabel = (title, focused) => {
    return (
        <Text
            style={{
                fontSize: 16,
                fontFamily: focused ? "BVP_SemiBold" : "BVP_Regular",
                color: focused ? colors.lightPurple : colors.gray,
            }}
        >
            {title}
        </Text>
    );
};

export default function FilmBookingTop({ navigation, route }) {
    // Lấy thông tin film từ route params nếu có
    const film = route.params?.film;

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} title="Thông tin & Suất chiếu" />
            <TopTab.Navigator
                screenOptions={({ route }) => ({
                    tabBarLabel: ({ focused }) => renderTabBarLabel(titles[route.name], focused),
                    tabBarIndicatorStyle: { backgroundColor: colors.lightPurple },
                })}
            >
                <TopTab.Screen
                    name="FilmDetails"
                    component={FilmDetails}
                    initialParams={{ film }} // Truyền film vào `FilmDetails`
                />
                <TopTab.Screen
                    name="Showtimes"
                    component={Showtimes}
                    initialParams={{ film }} // Truyền film vào `Showtimes`
                />
            </TopTab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
