import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../../contexts/AuthContext";

import colors from "../../themes/colors";

export default function SignOutButton({ navigation }) {
    const { logout } = useAuth();

    const goToSignIn = () => {
        navigation.replace("SignIn");
        logout();
    };

    const styles = getStyles();

    return (
        <TouchableOpacity onPress={goToSignIn} style={styles.container}>
            <Ionicons name={"log-out-outline"} size={24} color={"white"} />
            <Text style={styles.text}>Đăng xuất</Text>
        </TouchableOpacity>
    );
}

const getStyles = () =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.lightPurple,
            height: 50,
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            marginTop: 20,
        },
        text: {
            fontSize: 16,
            fontFamily: "BVP_SemiBold",
            color: "white",
        },
    });
