import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Text, SafeAreaView, StyleSheet } from "react-native";

import Tickets from "../pages/Tickets";
import UsedTickets from "../pages/UsedTickets";

import colors from "../themes/colors";

import Header from "../components/Header";

const titles = {
    UnusedTicket: "Vé chưa dùng",
    UsedTicket: "Vé đã dùng",
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

export default function TicketsTop({ navigation }) {
    const TopTab = createMaterialTopTabNavigator();

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} title="Vé của tôi" />
            <TopTab.Navigator
                screenOptions={({ route }) => {
                    return {
                        tabBarLabel: ({ focused }) => renderTabBarLabel(titles[route.name], focused),
                        tabBarIndicatorStyle: { backgroundColor: colors.lightPurple },
                    };
                }}
            >
                <TopTab.Screen name="UnusedTicket" component={Tickets} />
                <TopTab.Screen name="UsedTicket" component={UsedTickets} />
            </TopTab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
