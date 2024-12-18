import { Text, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../themes/colors";

import { formatDate } from "../../modules/formatDateTime";

export default function ShowtimeDate({ isLastChild, isSelected, dayName, date, onPress }) {
    const styles = getStyles(isLastChild, isSelected);

    return (
        <TouchableOpacity style={styles.day} onPress={onPress} hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }}>
            <Text style={styles.dayText1}>{dayName}</Text>
            <Text style={styles.dayText2}>{formatDate(date)}</Text>
        </TouchableOpacity>
    );
}

const getStyles = (isLastChild, dateSelected) =>
    StyleSheet.create({
        day: {
            height: 50,
            width: 80,
            backgroundColor: dateSelected ? colors.lightPurple : null,
            justifyContent: "center",
            gap: 5,
            borderRadius: 5,
            marginRight: isLastChild ? 20 : 10,
        },
        dayText1: {
            color: dateSelected ? "white" : colors.lightPurple,
            textAlign: "center",
            fontFamily: "BVP_Regular",
            fontSize: 14,
        },
        dayText2: {
            color: dateSelected ? "white" : colors.lightPurple,
            textAlign: "center",
            fontFamily: "BVP_SemiBold",
            fontSize: 16,
        },
    });
