import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, StatusBar, Image} from "react-native";
import colors from "../themes/colors";
const logo = require("../assets/uit-cine-logo.png");

export default function LoadingScreen() {
    return (
        <SafeAreaView style={[styles.background]}>
                <StatusBar barStyle={"light-content"} />
                <View style={styles.container}>
                    <View style={styles.row1}>
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.logoName}>UITCine</Text>
                        <Text style={styles.sologan}>Điện ảnh tuyệt đối</Text>
                        <ActivityIndicator size="large" color="#e2b0ee" />
                    </View>
                </View>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#333",
    },
    background: {
        flex: 1,
        backgroundColor: colors.purple,
    },
    container: {
        marginHorizontal: 30,
        marginVertical: 50,
        flex: 1,
    },
    row1: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    row2: {
        flex: 8,
        gap: 20,
    },
    row3: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        height: 120,
        aspectRatio: 1,
        resizeMode: "contain",
    },
    logoName: {
        color: colors.pink,
        fontFamily: "BVP_Bold",
        fontSize: 32,
    },
    sologan: {
        color:'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 18

    }
});
