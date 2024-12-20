import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import colors from "../themes/colors";
import Header from "../components/Header";

const BoxInfo = ({ icon, text }) => {
    return (
        <View style={styles.boxInfo}>
            {icon ? <Ionicons name={icon} size={24} color={colors.lightPurple} /> : null}
            <Text style={styles.boxInfoText}>{text}</Text>
        </View>
    );
};

export default function CinemaShowtimes({ navigation }) {
    return (
        <SafeAreaView>
            <Header title="Suất chiếu" navigation={navigation} />
            <View style={styles.cinemaDetails}>
                <Text style={styles.cinemaName}>CGV Vincom Center Landmark 81</Text>
                <Text style={styles.cinemaAddress}>B1, Vincom Center Landmark 81, 722 Điện Biên Phủ, P. 22, Q. Bình Thạnh</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.days} horizontal={true}>
                <View style={styles.day}>
                    <Text style={styles.dayText1}>Thứ hai</Text>
                    <Text style={styles.dayText2}>6 / 12</Text>
                </View>

                <View style={styles.day}>
                    <Text style={styles.dayText1}>Thứ hai</Text>
                    <Text style={styles.dayText2}>6 / 12</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.dayText1}>Thứ hai</Text>
                    <Text style={styles.dayText2}>6 / 12</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.dayText1}>Thứ hai</Text>
                    <Text style={styles.dayText2}>6 / 12</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.dayText1}>Thứ hai</Text>
                    <Text style={styles.dayText2}>6 / 12</Text>
                </View>
            </ScrollView>
            <ScrollView style={styles.cinemaShowtimes}>
                <View style={styles.filmShowtimes}>
                    <View style={styles.filmDetails}>
                        <Image
                            style={styles.poster}
                            source={{ uri: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/c/g/cgv_800x1200.jpg" }}
                        ></Image>
                        <View style={styles.filmInfo}>
                            <Text style={styles.filmName}>HÀNH TRÌNH CỦA MOANA 2</Text>
                            <View style={styles.icons}>
                                <BoxInfo icon={"time-outline"} text="120 phút" />
                                <BoxInfo text="T13" />
                            </View>
                        </View>
                    </View>
                    <Text style={styles.showtimesFormat}>2D PHỤ ĐỀ</Text>
                    <View style={styles.showtimes}>
                        <TouchableOpacity style={styles.showtime} onPress={() => navigation.navigate("SeatsBooking")}>
                            <Text style={styles.showtimeText}>10:00</Text>
                        </TouchableOpacity>

                        <View style={styles.showtime}>
                            <Text style={styles.showtimeText}>10:00</Text>
                        </View>
                        <View style={styles.showtime}>
                            <Text style={styles.showtimeText}>10:00</Text>
                        </View>
                        <View style={styles.showtime}>
                            <Text style={styles.showtimeText}>10:00</Text>
                        </View>
                        <View style={styles.showtime}>
                            <Text style={styles.showtimeText}>10:00</Text>
                        </View>
                        <View style={styles.showtime}>
                            <Text style={styles.showtimeText}>10:00</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cinemaDetails: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        gap: 10,
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGray,
    },
    cinemaName: {
        fontFamily: "BVP_SemiBold",
        fontSize: 16,
        color: colors.lightPurple,
    },
    cinemaAddress: {
        fontFamily: "BVP_Regular",
        fontSize: 16,
        color: "black",
        textAlign: "center",
    },
    days: {
        paddingVertical: 20,
        flexDirection: "row",
        paddingLeft: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGray,
    },
    day: {
        height: 50,
        width: 80,
        backgroundColor: colors.lightPurple,
        justifyContent: "center",
        gap: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    dayText1: {
        color: "white",
        textAlign: "center",
        fontFamily: "BVP_Regular",
        fontSize: 14,
    },
    dayText2: {
        color: "white",
        textAlign: "center",
        fontFamily: "BVP_SemiBold",
        fontSize: 16,
    },
    cinemaShowtimes: {
        paddingTop: 20,
    },
    poster: {
        width: 80,
        height: 120,
        borderRadius: 5,
    },

    filmShowtimes: {
        marginHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGray,
    },
    filmDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    filmInfo: {
        flex: 1,
    },
    filmName: {
        fontFamily: "BVP_Medium",
        fontSize: 20,
        color: "black",
    },
    icons: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },
    boxInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderWidth: 1,
        borderColor: colors.lightPurple,
        padding: 5,
        borderRadius: 5,
    },
    boxInfoText: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
    },
    showtimes: {
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    showtime: {
        height: 40,
        width: "22%",
        borderWidth: 1,
        borderColor: colors.lightPurple,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 10,
    },
    showtimesFormat: {
        fontFamily: "BVP_Regular",
        fontSize: 16,
        color: "black",
        marginTop: 20,
    },
    showtimeText: {
        color: "black",
        fontFamily: "BVP_Medium",
        fontSize: 16,
    },
});
