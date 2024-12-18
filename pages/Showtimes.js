import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";

import ShowtimeDate from "../components/showtimes/ShowtimeDate";

import { getFilmsShowtimes, getAllProvinces, getCinemasByProvince } from "../database/database";
import { getDayOfWeek } from "../modules/getDayOfWeek";

import colors from "../themes/colors";

export default function Showtimes({ route, navigation }) {
    const { film } = route.params;
    const [selectedProvince, setSelectedProvince] = useState(1);
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [provinceValue, setProvinceValue] = useState([]);
    const [cinemaValue, setCinemaValue] = useState([]);
    const [showtimeValue, setShowtimeValue] = useState([]);
    const [showtimeDates, setShowtimeDates] = useState([]);
    const [selected, setSelected] = useState(0);
    const [showtimesByDate, setShowtimesByDate] = useState([]);

    const fetchProvinceData = async () => {
        try {
            const provinceData = await getAllProvinces();
            setProvinceValue(provinceData);
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };

    const fetchCinemaData = async () => {
        try {
            const cinemaData = await getCinemasByProvince(selectedProvince);
            setCinemaValue(cinemaData);
        } catch (error) {
            console.error("Error fetching cinemas:", error);
        }
    };

    const renderShowtimes = async () => {
        try {
            const showtimeData = await getFilmsShowtimes(selectedProvince, selectedCinema, film.id);
            setShowtimeValue(showtimeData);

            const uniqueDates = Array.from(
                new Set(
                    showtimeData.map((item) => {
                        const showtimeDate = new Date(item.showtime);
                        return showtimeDate.toISOString().split("T")[0];
                    })
                )
            ).sort((a, b) => new Date(a) - new Date(b));

            setShowtimeDates(uniqueDates);
        } catch (error) {
            console.error("Error fetching showtimes:", error);
        }
    };

    useEffect(() => {
        fetchProvinceData();
    }, []);

    useEffect(() => {
        fetchCinemaData();
        setShowtimeValue([]); // Reset showtimes when province changes
        setShowtimesByDate([]); // Reset grouped showtimes when province changes
        renderShowtimes(); // Fetch new showtimes based on the selected province
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedCinema) {
            setShowtimeValue([]); // Reset showtimes when cinema changes
            setShowtimesByDate([]); // Reset grouped showtimes when cinema changes
            renderShowtimes(); // Fetch new showtimes based on the selected cinema
        }
    }, [selectedCinema]);

    useEffect(() => {
        if (showtimeDates.length > 0) {
            // Tự động chọn ngày đầu tiên (index 0)
            const firstDate = showtimeDates[0];
            setSelected(0);
            getShowtimeByDate(firstDate); // Gọi hàm để lấy suất chiếu cho ngày đầu tiên
        }
    }, [showtimeDates]); // Khi showtimeDates thay đổi, tự động render ngày đầu tiên

    const getShowtimeByDate = (date) => {
        const showtimes = showtimeValue.filter((showtimeDetail) => {
            const showtimeDate = new Date(showtimeDetail.showtime);
            const targetDate = new Date(date);
            return showtimeDate.toISOString().split("T")[0] === targetDate.toISOString().split("T")[0];
        });

        // Group showtimes by cinema and format
        const groupedByCinemaAndFormat = showtimes.reduce((acc, showtime) => {
            const cinemaName = showtime.cinema_name;

            // Combine theater format (e.g., IMAX, STARIUM) with film format (e.g., 2D, 3D)
            const theaterFormat = showtime.theater_format ? showtime.theater_format : ""; // Use an empty string if theater_format is empty
            const format = `${theaterFormat} ${showtime.film_format} ${showtime.format}`.trim(); // Concatenate and trim any extra spaces

            const showtimeTime = new Date(showtime.showtime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            if (!acc[cinemaName]) {
                acc[cinemaName] = {};
            }

            if (!acc[cinemaName][format]) {
                acc[cinemaName][format] = [];
            }

            // Push both time and index
            acc[cinemaName][format].push({
                time: showtimeTime,
                index: showtimeValue.indexOf(showtime), // Get the index from showtimeValue
            });

            return acc;
        }, {});

        setShowtimesByDate(groupedByCinemaAndFormat);
    };

    return (
        <View style={styles.container}>
            <View style={styles.dropdowns}>
                <View style={styles.col1}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={provinceValue}
                        maxHeight={300}
                        labelField="name"
                        valueField="id"
                        placeholder="Tỉnh/ Thành phố"
                        value={selectedProvince}
                        onChange={(item) => {
                            setSelectedProvince(item.id);
                            setSelectedCinema(null);
                        }}
                    />
                </View>
                <View style={styles.col2}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={cinemaValue}
                        labelField="name"
                        valueField="id"
                        placeholder="Rạp Phim"
                        value={selectedCinema}
                        onChange={(item) => {
                            setSelectedCinema(item.id);
                        }}
                        selectedTextProps={{ numberOfLines: 1 }}
                    />
                </View>
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
                    {Object.keys(showtimesByDate).map((cinemaName) => (
                        <View key={cinemaName} style={styles.cinemaShowtimes}>
                            <Text style={styles.cinemaName}>{cinemaName}</Text>
                            {Object.keys(showtimesByDate[cinemaName]).map((format) => (
                                <View key={format}>
                                    <Text style={styles.showtimesFormat}>{format}</Text>
                                    <View style={styles.showtimes}>
                                        {showtimesByDate[cinemaName][format].map(({ time, index }, idx) => (
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropdowns: {
        marginTop: 20,
        flexDirection: "row",
        gap: 10,
        marginHorizontal: 20,
        height: 40,
    },
    col1: {
        flex: 3,
    },
    col2: {
        flex: 4,
    },
    dropdown: {
        borderColor: colors.lightPurple,
        borderWidth: 1,
        flex: 1,
        borderRadius: 8,
        backgroundColor: "white",
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
        paddingLeft: 10,
        color: colors.lightGray,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
        paddingLeft: 10,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
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
        borderTopWidth: 0.5,
    },
    cinemaShowtimes: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
    },
    cinemaName: {
        fontFamily: "BVP_Medium",
        fontSize: 16,
        color: "black",
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
