import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MainStack from "./MainStack";
import LoadingScreen from "../pages/InitialLoading";
export default function AuthStack() {
    const Stack = createStackNavigator();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mô phỏng thời gian loading (5 giây)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer); // Xóa timer khi component bị unmount
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="MainStack" component={MainStack} />
        </Stack.Navigator>
    );
}
