import { Text, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../../themes/colors";

export default function Seat({ seatStatus, key, row, col }) {
    const styles = getStyles(seatStatus);

    <TouchableOpacity key={key} style={[styles.cell, styles.seat]}>
        <Text style={styles.seatText}>
            {row}
            {col}
        </Text>
    </TouchableOpacity>;
}

const getStyles = (seatStatus) =>
    StyleSheet.create({
        cell: {
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            margin: 2,
        },
        seat: {
            backgroundColor: seatStatus == "blank" ? "white" : seatStatus == "selecting" ? colors.lightPurple : colors.lightGray,
            borderWidth: 0.5,
            borderColor: seatStatus == "blank" || seatStatus == "selecting" ? colors.lightPurple : colors.lightGray,
            borderRadius: 3,
        },
        seatText: {
            color: seatStatus == "blank" ? "black" : seatStatus == "selecting" ? "white" : colors.lightGray,
            fontSize: 12,
        },
    });
