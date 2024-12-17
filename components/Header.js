import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../themes/colors";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function Header({ title, navigation }) {
    return (
        <View style={styles.header}>
            {navigation ? (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="arrow-back-outline" size={24} color={colors.lightPurple} />
                </TouchableOpacity>
            ) : null}
            <View style={styles.textView}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGray,
        paddingVertical: 10,
        justifyContent: "center",
    },
    button: {
        position: "absolute",
        left: 10,
        height: "100%",
        zIndex: 1,
    },
    textView: {
        flex: 1,
        alignItems: "center",
        zIndex: 2,
        marginHorizontal: 60,
    },
    title: {
        fontSize: 20,
        fontFamily: "BVP_Medium",
        zIndex: 0,
    },
});
