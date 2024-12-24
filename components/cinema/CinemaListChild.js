import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../themes/colors";

export default function CinemaListChild({ navigation, cinemaName, cinemaAddress, cinemaId }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("CinemaShowtimes", { cinemaId: cinemaId, cinemaName: cinemaName, cinemaAddress: cinemaAddress })}>
            <View style={styles.container}>
                <Text style={styles.cinemaName}>{cinemaName}</Text>
                <Text style={styles.cinemaAddress}>{cinemaAddress}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 0.5,
        justifyContent: "center",
        gap: 10,
        paddingVertical: 10,
    },
    cinemaName: {
        fontSize: 20,
        fontFamily: "BVP_SemiBold",
        color: colors.lightPurple,
    },
    cinemaAddress: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
        color: "black",
    },
});
