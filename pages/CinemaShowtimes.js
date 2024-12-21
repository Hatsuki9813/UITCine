import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import colors from "../themes/colors";
import Header from "../components/Header";
import ShowtimeDate from "../components/showtimes/ShowtimeDate";
import { getDayOfWeek } from "../modules/getDayOfWeek";

import { getCinemaShowtimes } from "../database/database";

const BoxInfo = ({ icon, text }) => {
    return (
        <View style={styles.boxInfo}>
            {icon ? <Ionicons name={icon} size={24} color={colors.lightPurple} /> : null}
            <Text style={styles.boxInfoText}>{text}</Text>
        </View>
    );
};

export default function CinemaShowtimes({ route, navigation }) {
    const { cinemaId, cinemaName, cinemaAddress } = route.params;
    const [selected, setSelected] = useState(0);
    const [showtimeValue, setShowtimeValue] = useState([]);
    const [showtimeDates, setShowtimeDates] = useState([]);
    const [showtimesByDate, setShowtimesByDate] = useState([]);

    const fetchShowtimes = async () => {
        const showtimes = await getCinemaShowtimes(cinemaId);
        setShowtimeValue(showtimes);
        console.log("cinemaShowtime value in CinemaShowTimes"+JSON.stringify(showtimes))
        const uniqueDates = Array.from(
            new Set(
                showtimes.map((item) => {
                    const showtimeDate = new Date(item.showtime);
                    return showtimeDate.toISOString().split("T")[0];
                })
            )
        ).sort((a, b) => new Date(a) - new Date(b));

        setShowtimeDates(uniqueDates);
    };

    const getShowtimeByDate = (date) => {
        const showtimes = showtimeValue.filter((showtimeDetail) => {
            const showtimeDate = new Date(showtimeDetail.showtime);
            const targetDate = new Date(date);
            return showtimeDate.toISOString().split("T")[0] === targetDate.toISOString().split("T")[0];
        });

        // Group showtimes by cinema and format
        const groupedByFilmAndFormat = showtimes.reduce((acc, showtime) => {
            const filmName = showtime.film_name;

            // Combine theater format (e.g., IMAX, STARIUM) with film format (e.g., 2D, 3D)
            const theaterFormat = showtime.theater_format ? showtime.theater_format : ""; // Use an empty string if theater_format is empty
            const format = `${theaterFormat} ${showtime.film_format} ${showtime.format}`.trim(); // Concatenate and trim any extra spaces

            const showtimeTime = new Date(showtime.showtime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            if (!acc[filmName]) {
                acc[filmName] = {};
            }

            if (!acc[filmName][format]) {
                acc[filmName][format] = [];
            }

            // Push both time and index
            acc[filmName][format].push({
                time: showtimeTime,
                index: showtimeValue.indexOf(showtime), // Get the index from showtimeValue
            });

            return acc;
        }, {});

        setShowtimesByDate(groupedByFilmAndFormat);
    };

    useEffect(() => {
        fetchShowtimes();
    }, []);

    useEffect(() => {
        if (showtimeDates.length > 0) {
            // Tự động chọn ngày đầu tiên (index 0)
            const firstDate = showtimeDates[0];
            setSelected(0);
            getShowtimeByDate(firstDate); // Gọi hàm để lấy suất chiếu cho ngày đầu tiên
        }
    }, [showtimeDates]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Suất chiếu" navigation={navigation} />
            <View style={styles.container}>
                <View style={styles.cinemaDetails}>
                    <Text style={styles.cinemaName}>{cinemaName}</Text>
                    <Text style={styles.cinemaAddress}>{cinemaAddress}</Text>
                </View>
                <View style={styles.days}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        {showtimeDates.map((date, index) => {
                            const dayName = getDayOfWeek(date);
                            return (
                                <ShowtimeDate
                                    isLastChild={index === showtimeDates.length - 1}
                                    isSelected={selected === index}
                                    key={index}
                                    dayName={dayName}
                                    date={date}
                                    onPress={() => {
                                        setSelected(index);
                                        getShowtimeByDate(date);
                                    }}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={styles.showtimesList}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {Object.keys(showtimesByDate).map((filmName) => (
                            <View key={filmName} style={styles.cinemaShowtimes}>
                                <View style={styles.filmDetails}>
                                    <Image style={styles.poster} source={{ uri: showtimeValue.find((item) => item.film_name === filmName)?.film_poster }}></Image>
                                    <View style={styles.filmInfo}>
                                        <Text style={styles.filmName}>{filmName}</Text>
                                        <View style={styles.icons}>
                                            <BoxInfo icon={"time-outline"} text={showtimeValue.find((item) => item.film_name === filmName)?.film_duration + " phút"} />
                                            <BoxInfo text={showtimeValue.find((item) => item.film_name === filmName)?.film_ageRating} />
                                        </View>
                                    </View>
                                </View>
                                {Object.keys(showtimesByDate[filmName]).map((format) => (
                                    <View key={format}>
                                        <Text style={styles.showtimesFormat}>{format}</Text>
                                        <View style={styles.showtimes}>
                                            {showtimesByDate[filmName][format].map(({ time, index }, idx) => (
                                                <TouchableOpacity
                                                    key={idx}
                                                    style={styles.showtime}
                                                    onPress={() => {
                                                        // Truyền suất chiếu sang SeatsBooking
                                                        navigation.navigate("SeatsBooking", {
                                                            data: showtimeValue[index],
                                                        });
                                                    }}
                                                >
                                                    <Text style={styles.showtimeText}>{time}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cinemaDetails: {
        paddingVertical: 20,
        marginHorizontal: 20,
        gap: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    cinemaName: {
        fontFamily: "BVP_SemiBold",
        fontSize: 16,
        color: colors.lightPurple,
        textAlign: "center",
    },
    cinemaAddress: {
        fontFamily: "BVP_Regular",
        fontSize: 16,
        color: "black",
        textAlign: "center",
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
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        backgroundColor: "red",
    },
    poster: {
        width: 80,
        height: 120,
        borderRadius: 5,
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
    days: {
        marginTop: 20,
        flexDirection: "row",
        paddingLeft: 20,
    },
    showtimesList: {
        marginTop: 10,
        marginHorizontal: 20,
        flex: 1,
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
    },
    cinemaShowtimes: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
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
