import { TouchableOpacity, StyleSheet, Text } from "react-native";

import colors from "../../themes/colors";

export default function AuthButton({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.pink,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "black",
        fontSize: 20,
    },
});
