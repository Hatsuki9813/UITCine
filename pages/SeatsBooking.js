import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Pressable } from "react-native";
import { useState, useEffect } from "react";

import colors from "../themes/colors";
import Header from "../components/Header";

import { getSoldSeatsByShowtime } from "../database/database";
import { formatDateHour } from "../modules/formatDateTime";

import { getTicketPrice } from "../database/database";

import { useAuth } from "../contexts/AuthContext";
import { getHour } from "../modules/formatDateTime";

export default function SeatsBooking({ navigation, route }) {
    const { data } = route.params;
    const [seats, setSeats] = useState([]); // Mảng ghế với trạng thái của từng ghế
    const [selectedSeats, setSelectedSeats] = useState([]); // Mảng lưu các ghế đã chọn
    const [price, setPrice] = useState(""); // Giá vé
    const [totalPrice, setTotalPrice] = useState(""); // Tổng giá vé
    const [ticketName, setTicketName] = useState(""); // Thông tin vé
    const ageDiff = 19;

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedSeats]);

    useEffect(() => {
        const ticket_id = (ageDiff, hour) => {
            if (ageDiff <= 22) {
                if (hour >= 22 || hour <= 6) return 1;
                else return 3;
            } else {
                if (hour >= 22 || hour <= 6) return 2;
                else return 4;
            }
        };

        const _getTicketPrice = async (ticket_id) => {
            try {
                const price = await getTicketPrice(ticket_id);
                setPrice(price[0].price);
                setTicketName(price[0].name);
            } catch (error) {
                console.log(error);
            }
        };

        _getTicketPrice(ticket_id(ageDiff, getHour(data.showtime)));
    }, [price]);

    const calculateTotalPrice = () => {
        const totalPrice = selectedSeats.length * price;
        setTotalPrice(totalPrice);
    };

    const rows = Array.from({ length: data.theater_row }, (_, i) => String.fromCharCode(65 + i)); // Tạo các hàng ghế (A, B, C,...)
    const cols = Array.from({ length: data.theater_col }, (_, i) => i + 1); // Tạo các cột ghế (1, 2, 3,...)

    useEffect(() => {
        const fetchSoldSeats = async () => {
            try {
                const soldSeats = await getSoldSeatsByShowtime(data.showtime_id); // Gọi hàm bất đồng bộ để lấy ghế đã bán

                // Tạo mảng ghế với trạng thái ban đầu là "blank"
                const initialSeats = rows.map(() => cols.map(() => "blank"));

                // Cập nhật các ghế đã bán thành "sold"
                soldSeats.forEach((soldSeat) => {
                    const seatId = soldSeat.seat_id;
                    const row = seatId.charAt(0); // Lấy ký tự hàng ghế
                    const col = parseInt(seatId.slice(1)); // Lấy số cột ghế

                    const rowIndex = rows.indexOf(row); // Tìm chỉ số của hàng ghế
                    const colIndex = cols.indexOf(col); // Tìm chỉ số của cột ghế

                    // Đánh dấu ghế đã bán là "sold"
                    if (rowIndex !== -1 && colIndex !== -1) {
                        initialSeats[rowIndex][colIndex] = "sold";
                    }
                });

                // Cập nhật lại mảng ghế với ghế đã bán
                setSeats(initialSeats);
            } catch (error) {
                console.error("Error fetching sold seats:", error);
            }
        };

        fetchSoldSeats(); // Gọi hàm lấy ghế đã bán khi component được render
    }, [data.showtime_id]);

    const toggleSeat = (row, col) => {
        try {
            const currentSeatStatus = seats[row][col];

            if (currentSeatStatus === "sold") return; // Không thể chọn ghế đã bán

            const updatedSeats = [...seats];
            if (currentSeatStatus === "selecting") {
                // Bỏ chọn ghế
                updatedSeats[row][col] = "blank";
                setSeats(updatedSeats);
                setSelectedSeats((prev) => prev.filter((seat) => seat !== `${rows[row]}${cols[col]}`));
            } else if (selectedSeats.length < 8) {
                // Chọn ghế mới (nếu chưa đạt 8 ghế)
                updatedSeats[row][col] = "selecting";
                setSeats(updatedSeats);
                setSelectedSeats((prev) => [...prev, `${rows[row]}${cols[col]}`]);
            } else {
                // Nếu người dùng cố gắng chọn ghế thứ 9, hiển thị alert
                Alert.alert("Thông báo", "Số ghế tối đa bạn có thể chọn là 8.");
            }
        } catch {
            console.log("Error toggling seat");
        }
    };

    const priceFormat = (price) => {
        return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Chọn ghế" navigation={navigation} />
            <View style={styles.showtimeDetails}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.cinemaName}>
                    {data.cinema_name}
                </Text>
                <View style={styles.details}>
                    <View style={styles.filmAndFormat}>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.name}>
                            {data.film_name}
                        </Text>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.filmFormat}>
                            {data.film_format} {data.format}
                        </Text>
                    </View>
                    <View style={styles.formatAndShowtime}>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.format}>
                            {data.theater_format ? `${data.theater_format} ` : null}
                            {data.theater_name}
                        </Text>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.showtime}>
                            {formatDateHour(data.showtime)}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.temp}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.matrix}>
                            {/* Row dành cho chữ "MÀN HÌNH" */}
                            <View style={styles.screenRow}>
                                <View style={styles.screenBox}>
                                    <Text style={styles.screenText}>MÀN HÌNH</Text>
                                </View>
                            </View>

                            {rows.map((row, rowIndex) => (
                                <View key={`row-${rowIndex}`} style={styles.row}>
                                    {cols.map((col, colIndex) => {
                                        const seatStatus = seats[rowIndex] ? seats[rowIndex][colIndex] : "blank"; // Kiểm tra seats[rowIndex] có hợp lệ không
                                        return (
                                            <Pressable
                                                key={`seat-${rowIndex}-${colIndex}`}
                                                style={[
                                                    styles.cell,
                                                    styles.seat,
                                                    seatStatus === "selecting"
                                                        ? { backgroundColor: colors.lightPurple, borderColor: colors.lightPurple }
                                                        : seatStatus === "sold"
                                                        ? { backgroundColor: colors.lightGray, borderColor: colors.lightGray }
                                                        : { backgroundColor: "white", borderColor: colors.lightPurple },
                                                ]}
                                                onPress={() => toggleSeat(rowIndex, colIndex)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.seatText,
                                                        seatStatus === "selecting" ? { color: "white" } : seatStatus === "sold" ? { color: colors.lightGray } : { color: "black" },
                                                    ]}
                                                >
                                                    {row}
                                                    {col}
                                                </Text>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </ScrollView>
            </View>
            <View style={styles.seatType}>
                <View style={styles.seatChild}>
                    <View style={styles.demoBlankSeat}></View>
                    <Text>Chưa chọn</Text>
                </View>
                <View style={styles.seatChild}>
                    <View style={styles.demoSelectingSeat}></View>
                    <Text>Đang chọn</Text>
                </View>
                <View style={styles.seatChild}>
                    <View style={styles.demoSoldSeat}></View>
                    <Text>Đã bán</Text>
                </View>
            </View>
            <View style={styles.checkout}>
                <View style={styles.checkoutDetails}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>
                        {selectedSeats.length}x ghế: <Text style={styles.highlight}>{selectedSeats.join(", ")}</Text>
                    </Text>
                    <Text style={styles.detailText}>
                        Tổng cộng: <Text style={styles.highlight}>{priceFormat(totalPrice)}</Text>
                    </Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.checkoutButton,
                        selectedSeats.length === 0 ? { backgroundColor: colors.lightGray } : { backgroundColor: colors.lightPurple }, // Kiểm tra chiều dài của selectedSeats và thay đổi màu nền
                    ]}
                    onPress={() => {
                        if (selectedSeats.length > 0) {
                            navigation.navigate("Payment", { seats: selectedSeats, data: data.showtime_id, price: totalPrice, ticketName: ticketName });
                        }
                    }}
                    disabled={selectedSeats.length === 0} // Vô hiệu hóa khi không có ghế được chọn
                >
                    <Text style={styles.checkoutText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    seatType: {
        backgroundColor: "white",
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    temp: {
        flex: 25,
        backgroundColor: colors.whitesmoke,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    showtimeDetails: {
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
    },
    cinemaName: {
        fontSize: 16,
        fontFamily: "BVP_SemiBold",
        color: colors.lightPurple,
        lineHeight: 25,
    },
    details: {
        flexDirection: "row",
    },
    filmAndFormat: {
        flex: 3,
        gap: 5,
    },
    formatAndShowtime: {
        flex: 2,
        gap: 5,
    },
    name: {
        fontSize: 16,
        fontFamily: "BVP_SemiBold",
        lineHeight: 25,
    },
    filmFormat: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
        lineHeight: 25,
    },
    showtime: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
        textAlign: "right",
        lineHeight: 25,
    },
    format: {
        fontSize: 16,
        fontFamily: "BVP_Medium",
        textAlign: "right",
        lineHeight: 25,
    },
    checkoutDetails: {
        flex: 1,
        gap: 5,
    },
    checkoutButton: {
        // backgroundColor: colors.lightPurple,
        color: "white",
        fontSize: 16,
        fontFamily: "BVP_SemiBold",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    checkout: {
        flexDirection: "row",
        backgroundColor: colors.whitesmoke,
        gap: 20,
        paddingHorizontal: 20,
        alignItems: "center",
        paddingVertical: 10,
    },
    checkoutText: {
        color: "white",
        fontSize: 16,
        fontFamily: "BVP_SemiBold",
        lineHeight: 20,
    },
    detailText: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
    },
    highlight: {
        color: colors.lightPurple,
        fontFamily: "BVP_Bold",
    },
    demoSoldSeat: {
        width: 15,
        height: 15,
        backgroundColor: colors.lightGray,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    demoSelectingSeat: {
        width: 15,
        height: 15,
        backgroundColor: colors.lightPurple,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    demoBlankSeat: {
        width: 15,
        height: 15,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: colors.lightPurple,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    seatChild: {
        flexDirection: "row",
        gap: 5,
    },
    matrix: {
        paddingHorizontal: 50,
        paddingVertical: 30,
    },
    screenRow: {
        alignItems: "center",
        marginBottom: 50,
    },
    screenBox: {
        width: "70%", // Chiều rộng 70% của vùng chứa
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
    },
    screenText: {
        fontWeight: "bold",
        color: "#333",
        fontSize: 16,
    },
    row: {
        flexDirection: "row",
    },
    cell: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
    },
    rowLabel: {
        backgroundColor: "#ddd",
    },
    rowLabelText: {
        fontWeight: "bold",
    },
    seat: {
        backgroundColor: "white", // seatStatus == "blank" ? "white" : seatStatus == "selecting" ? colors.lightPurple : colors.lightGray,
        borderWidth: 0.5,
        borderColor: colors.lightPurple, // seatStatus == "blank" || seatStatus == "selecting" ? colors.lightPurple : colors.lightGray,
        borderRadius: 3,
    },
    seatText: {
        color: "black", // seatStatus == "blank" ? "black" : seatStatus == "selecting" ? "white" : colors.lightGray,
        fontSize: 12,
    },
});
