import { createStackNavigator } from "@react-navigation/stack";

import Home from "../pages/Home";
import FilmBookingTop from "./FilmBookingTop";

export default function HomeStack({ navigation }) {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen navigation={navigation} name="Home" component={Home} />
            <Stack.Screen navigation={navigation} name="FilmBookingTop" component={FilmBookingTop} />
        </Stack.Navigator>
    );
}
