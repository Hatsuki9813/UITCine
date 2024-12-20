import { SafeAreaView, View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useState, useEffect } from "react";
import Header from "../components/Header";

import colors from "../themes/colors";

import { getShowtimeBase, demoUsedTicket } from "../database/database";
import { formatFullDate } from "../modules/formatDateTime";

export default function TicketDetails({ navigation, route }) {
    const [posterContainerWidth, setPosterContainerWidth] = useState(0);
    const [showtimeData, setShowtimeData] = useState({});

    const styles = getStyles(posterContainerWidth);

    const { ticketData } = route.params;

    useEffect(() => {
        const fetchShowtimeBase = async () => {
            try {
                const showtimeData = await getShowtimeBase(ticketData.showtime_id);
                setShowtimeData(showtimeData[0]);
            } catch (error) {
                console.error("Error fetching showtime data: ", error);
            }
        };

        fetchShowtimeBase();
    }, []);

    const DashLine = () => {
        return (
            <Text ellipsizeMode="clip" numberOfLines={1} style={styles.dashLine}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            </Text>
        );
    };

    const priceFormat = (price) => {
        return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    };

    const demoUseTicket = async () => {
        try {
            await demoUsedTicket(ticketData.id);
        } catch (error) {
            console.error("Error using ticket: ", error);
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <Header navigation={navigation} title="Thông tin vé" />
            <View style={styles.container}>
                <View style={styles.r1}>
                    <View
                        onLayout={(event) => {
                            const { width } = event.nativeEvent.layout;
                            setPosterContainerWidth(width);
                        }}
                        style={styles.r1c1}
                    >
                        <Image style={styles.poster} source={{ uri: showtimeData.film_poster }} />
                    </View>
                    <View style={styles.r1c2}>
                        <Text style={styles.name}>{showtimeData.film_name}</Text>
                        <Text style={styles.regular}>
                            {showtimeData.film_format} {showtimeData.format}
                        </Text>
                        <Text style={styles.regular}>{showtimeData.cinema_name}</Text>
                        <Text style={styles.semibold}>{formatFullDate(showtimeData.showtime)}</Text>
                    </View>
                </View>
                <DashLine />
                <View style={styles.r3}>
                    <View style={styles.r3r}>
                        <View style={styles.r3_box}>
                            <Text style={styles.regular}>Thời lượng</Text>
                            <Text style={styles.semibold}>{showtimeData.film_duration} phút</Text>
                        </View>
                        <View style={styles.r3_box}>
                            <Text style={styles.regular}>Phân loại</Text>
                            <Text style={styles.semibold}>{showtimeData.film_ageRating}</Text>
                        </View>
                    </View>
                    <View style={styles.r3r}>
                        <View style={styles.r3_box}>
                            <Text style={styles.regular}>Ghế</Text>
                            <Text style={styles.semibold}>{ticketData.seats}</Text>
                        </View>
                        <View style={styles.r3_box}>
                            <Text style={styles.regular}>Rạp</Text>
                            <Text style={styles.semibold}>
                                {showtimeData.theater_format} {showtimeData.theater_name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.r3r}>
                        <View style={styles.r3_box}>
                            <Text style={styles.regular}>Mã vé</Text>
                            <Text style={styles.semibold}>{ticketData.id}</Text>
                        </View>
                        <View style={styles.r3_box}>
                            <Text style={styles.regular}>Đã thanh toán</Text>
                            <Text style={styles.semibold}>{priceFormat(ticketData.price)}</Text>
                        </View>
                    </View>
                </View>

                {ticketData.used ? null : (
                    <View>
                        <DashLine />
                        <View style={styles.r4}>
                            <Text style={styles.regular}>Đưa mã QR này cho nhân viên để lấy vé</Text>
                            <TouchableOpacity onPress={demoUseTicket}>
                                <QRCode color={colors.lightPurple} size={150} value="Bạn vừa mất thời gian để quét cái QR này và nó không có gì cả 🐧" logo={require("../assets/uit-cine-logo.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const getStyles = (posterContainerWidth) =>
    StyleSheet.create({
        background: {
            flex: 1,
        },
        container: {
            marginHorizontal: 20,
            marginVertical: 20,
            borderTopColor: colors.lightPurple,
            borderTopWidth: 8,
            borderRadius: 5,
            backgroundColor: "white",
            padding: 10,
            shadowColor: colors.gray,
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
        },
        dashLine: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
            marginVertical: 5,
        },
        r1: {
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        r1c1: {
            flex: 1,
        },
        r1c2: {
            flex: 3,
            gap: 10,
            justifyContent: "center",
        },
        r2: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        r3: {
            gap: 15,
        },
        r3r: {
            flexDirection: "row",
        },
        r3_box: {
            justifyContent: "center",
            flex: 1,
            alignItems: "center",
            gap: 5,
        },
        r4: {
            alignItems: "center",
            gap: 10,
        },
        duration: {
            flexDirection: "row",
        },
        poster: {
            width: posterContainerWidth,
            height: posterContainerWidth * 1.5,
            borderRadius: 5,
        },
        name: {
            fontSize: 20,
            fontFamily: "BVP_SemiBold",
        },
        regular: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
        },
        semibold: {
            fontSize: 16,
            fontFamily: "BVP_SemiBold",
        },
    });
