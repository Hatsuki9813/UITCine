import { createStackNavigator } from "@react-navigation/stack";

import MainBottom from "./MainBottom";
import SeatsBooking from "../pages/SeatsBooking";
import Payment from "../pages/Payment";

export default function MainStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainBottom" component={MainBottom} />
            <Stack.Screen name="SeatsBooking" component={SeatsBooking} />
            <Stack.Screen name="Payment" component={Payment} />
        </Stack.Navigator>
    );
}
