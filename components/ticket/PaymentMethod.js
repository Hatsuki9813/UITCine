import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../themes/colors";

export default function PaymentMethod({ logoUrl, name, isLastChild, isSelected, onPress }) {
    const styles = getStyles(isLastChild);

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.payment}>
                <Image style={styles.logo} source={logoUrl}></Image>
                <Text style={styles.name}>{name}</Text>
            </View>
            {isSelected && <Ionicons name="checkmark-outline" size={24} color={colors.lightPurple} />}
        </TouchableOpacity>
    );
}

const getStyles = (isLastChild) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            height: 60,
            borderBottomColor: !isLastChild ? colors.lightGray : "",
            borderBottomWidth: !isLastChild ? 0.5 : 0,
        },
        payment: {
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
        },
        logo: {
            width: 30,
            height: 30,
        },
        name: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
            color: "black",
        },
    });
