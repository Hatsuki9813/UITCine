import { createStackNavigator } from "@react-navigation/stack";

import Account from "../pages/Account";
import TicketDetails from "../pages/TicketDetails";
import TicketsTop from "../controllers/TicketsTop";
import AccountDetails from "../pages/AccountDetails";
import AccountDetailChange from "../pages/AccountDetailChange";
import ChangePw from "../pages/ChangePw";
import FAQ from "../pages/FAQ";
import Contacts from "../pages/Contacts";
import Settings from "../pages/Settings";
import TermsOfUse from "../pages/TermsOfUse";

export default function AccountStack({ navigation }) {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen navigation={navigation} name="Account" component={Account} options={{ headerShown: false }} />
            <Stack.Screen name="Tickets" component={TicketsTop} options={{ headerShown: false }} />
            <Stack.Screen name="TicketDetails" component={TicketDetails} options={{ headerShown: false }} />
            <Stack.Screen name="AccountDetails" component={AccountDetails} options={{ headerShown: false }} />
            <Stack.Screen name="AccountDetailChange" component={AccountDetailChange} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePw" component={ChangePw} options={{ headerShown: false }} />
            <Stack.Screen navigation={navigation} name="FAQ" component={FAQ} options={{ headerShown: false }} />
            <Stack.Screen navigation={navigation} name="Contact" component={Contacts} options={{ headerShown: false }} />
            <Stack.Screen navigation={navigation} name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen navigation={navigation} name="TermsOfUse" component={TermsOfUse} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
