import { createStackNavigator } from "@react-navigation/stack";

import Account from "../pages/Account";
import TicketDetails from "../pages/TicketDetails";
import TicketsTop from "../controllers/TicketsTop";
import AccountDetails from "../pages/AccountDetails";

export default function AccountStack({ navigation }) {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen navigation={navigation} name="Account" component={Account} options={{ headerShown: false }} />
            <Stack.Screen name="Tickets" component={TicketsTop} options={{ headerShown: false }} />
            <Stack.Screen name="TicketDetails" component={TicketDetails} options={{ headerShown: false }} />
            <Stack.Screen name="AccountDetails" component={AccountDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
