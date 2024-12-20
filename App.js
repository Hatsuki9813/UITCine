import { NavigationContainer } from "@react-navigation/native";

import loadFonts from "./themes/fonts";

import AuthStack from "./controllers/AuthStack";
import { AuthProvider } from "./contexts/AuthContext";

import { startDatabase } from "./database/database";

export default function App() {
    loadFonts();
    startDatabase();

    return (
        <AuthProvider>
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        </AuthProvider>
    );
}
