import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../../themes/colors";

import { Ionicons } from "@expo/vector-icons";

export default function AccountRowButton({ title, value, lastButton, danger, option, navigation }) {
    const styles = getStyles(lastButton, value, danger);

    const goAction = () => {
        if (option.field == "userInfo" && !option.denyChange) {
            navigation.navigate("AccountDetailChange", { title: title, value: value });
            return;
        }
        if (option.field == "security" && option.action == "changePw") {
            navigation.navigate("ChangePw");
            return;
        }
    };

    return (
        <TouchableOpacity onPress={goAction}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.value}>
                    <Text style={styles.valueText}>{value}</Text>
                </View>
                <View style={styles.icon}>{!option.denyChange && <Ionicons name="chevron-forward-outline" size={24} color={colors.lightPurple} />}</View>
            </View>
        </TouchableOpacity>
    );
}

const getStyles = (lastButton, value, danger) =>
    StyleSheet.create({
        container: {
            marginLeft: 10,
            borderBottomColor: !lastButton ? colors.lightGray : "",
            borderBottomWidth: !lastButton ? 0.5 : 0,
            flex: 1,
            flexDirection: "row",
            gap: 1,
            height: 50,
        },
        title: {
            flex: value ? 3 : 9.2,
            justifyContent: "center",
        },
        titleText: {
            fontFamily: "BVP_Medium",
            fontSize: 16,
            color: danger ? colors.redPastel : "black",
        },
        value: {
            flex: value ? 6 : 0,
            justifyContent: "center",
        },
        valueText: {
            fontFamily: "BVP_Regular",
            fontSize: 16,
            textAlign: "right",
            color: colors.lightGray,
        },
        icon: {
            flex: 0.8,
            justifyContent: "center",
            alignItems: "center",
        },
    });
