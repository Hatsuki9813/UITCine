import { createStackNavigator } from "@react-navigation/stack";

import Cinema from "../pages/Cinema";
import CinemaShowtimes from "../pages/CinemaShowtimes";

export default function CinemaStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cinema" component={Cinema} />
            <Stack.Screen name="CinemaShowtimes" component={CinemaShowtimes} />
        </Stack.Navigator>
    );
}
