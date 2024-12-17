import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";

import ShowingList from "../pages/ShowingList";
import ComingSoonList from "../pages/ComingSoonList";

import colors from "../themes/colors";

const TopTab = createMaterialTopTabNavigator();

const titles = {
    Showing: "Đang chiếu",
    ComingSoon: "Sắp chiếu",
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

export default function MainTop({ navigation }) {
    return (
        <TopTab.Navigator
            screenOptions={({ route }) => {
                return {
                    tabBarLabel: ({ focused }) => renderTabBarLabel(titles[route.name], focused),
                    tabBarIndicatorStyle: { backgroundColor: colors.lightPurple },
                };
            }}
        >
            <TopTab.Screen name="Showing" navigation={navigation} component={ShowingList} options={titles.Showing} />
            <TopTab.Screen name="ComingSoon" navigation={navigation} component={ComingSoonList} options={titles.ComingSoon} />
        </TopTab.Navigator>
    );
}
