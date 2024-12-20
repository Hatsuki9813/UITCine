import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../themes/colors";

import { test1, test2, test, getShowtimeBase } from "../../database/database";

export default function RowButton({ navigation, buttonText, iconName, pageName, lastButton, userData }) {
    const styles = getStyles(lastButton);

    const goToPage = () => {
        if (pageName == "Tickets" || pageName == "AccountDetails") navigation.navigate(pageName, { userData });
        else if (pageName == "Settings") test1();
        else if (pageName == "Contacts") getShowtimeBase(1);
    };

    return (
        <TouchableOpacity style={styles.background} onPress={goToPage}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Ionicons name={iconName} size={24} color={colors.lightPurple} />
                    <Text style={styles.text}>{buttonText}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={24} color={colors.lightPurple} />
            </View>
        </TouchableOpacity>
    );
}

const getStyles = (lastButton) =>
    StyleSheet.create({
        background: {
            borderBottomColor: !lastButton ? colors.lightGray : "",
            borderBottomWidth: !lastButton ? 0.5 : 0,
            height: 60,
        },
        container: {
            flex: 1,
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        textContainer: {
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
        },
        text: {
            fontSize: 16,
            fontFamily: "BVP_Medium",
        },
    });
