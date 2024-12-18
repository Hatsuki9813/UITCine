import { SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";

import Ticket from "../components/ticket/Ticket";
import PaymentMethod from "../components/ticket/PaymentMethod";

import colors from "../themes/colors";
import Header from "../components/Header";

import { getPromotionCode, addOrder } from "../database/database";
import { useAuth } from "../contexts/AuthContext";

export default function Payment({ route, navigation }) {
    const { seats, data, price, ticketName } = route.params;
    const { username } = useAuth();
    const [promotionCode, setPromotionCode] = useState("");
    const [promotionPrice, setPromotionPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(price);

    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const timer = useRef(null);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const paymentMethods = [
        { logoUrl: require("../assets/payment-method/napas.jpg"), name: "Thẻ ngân hàng nội địa" },
        { logoUrl: require("../assets/payment-method/inter-card.png"), name: "Thẻ quốc tế" },
        { logoUrl: require("../assets/payment-method/momo.png"), name: "Ví điện tử MoMo" },
        { logoUrl: require("../assets/payment-method/zalo-pay.png"), name: "Ví điện tử ZaloPay" },
        { logoUrl: require("../assets/payment-method/vn-pay.png"), name: "Ví điện tử VNPay" },
        { logoUrl: require("../assets/payment-method/shopee-pay.png"), name: "Ví điện tử Shopee" },
        { logoUrl: require("../assets/payment-method/apple-pay.png"), name: "Apple Pay" },
    ];

    const countDown = () => {
        // Xóa interval cũ nếu có
        if (timer.current) {
            clearInterval(timer.current);
        }

        timer.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timer.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const handlePayment = () => {
        clearInterval(timer.current); // Dừng đếm ngược khi nhấn nút thanh toán
        console.log("Thanh toán đã được thực hiện");
        Alert.alert("Thông báo", "Thanh toán thành công.\nXem vé của bạn trong mục vé đã đặt.");
        const reqData = {
            id: Date.now(),
            price: totalPrice,
            showtime_id: data,
            username: username,
            seats: seats,
        };
        addOrder(reqData);

        // navigation.replace("HomeStack", { screen: "Home" });
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    useEffect(() => {
        countDown(); // Bắt đầu đếm ngược khi component mount
        return () => {
            if (timer.current) {
                clearInterval(timer.current); // Dọn dẹp interval khi component unmount
            }
        };
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [promotionPrice]);

    const getPromotion = async () => {
        const result = await getPromotionCode(promotionCode);
        if (!result[0].available) {
            Alert.alert("Thông báo", "Mã giảm giá đã hết hạn sử dụng");
            return;
        }
        if (!Number(result[0].type)) {
            setPromotionPrice(Number(result[0].value));
        } else {
            setPromotionPrice(price * (Number(result[0].value) / 100));
        }
    };

    const calculateTotalPrice = () => {
        setTotalPrice(price - promotionPrice);
    };

    const handlePromotionInput = (text) => {
        setPromotionCode(text);
    };

    const priceFormat = (price) => {
        return Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    };

    const DashLine = () => {
        return (
            <Text ellipsizeMode="clip" numberOfLines={1} style={styles.dashLine}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            </Text>
        );
    };

    const styles = getStyles();
    return (
        <SafeAreaView style={styles.background}>
            <Header title="Thanh toán" navigation={navigation} />
            <View style={styles.background}>
                <View style={styles.seatHolding}>
                    <Text style={styles.holdingText}>Thời gian giữ ghế: </Text>
                    <Text style={styles.holdingTime}>{formatTime(timeLeft)}</Text>
                </View>
                <View style={styles.scroll}>
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <View style={styles.scrollView}>
                            <Ticket showtime_id={data} />
                            <View style={styles.part}>
                                <Text style={styles.heading}>Thông tin giao dịch</Text>
                                <View style={styles.partContainer}>
                                    <View style={styles.detailOrder}>
                                        <Text style={styles.detailTicketName}>
                                            {seats.length}x {ticketName} - {seats.join(", ")}
                                        </Text>
                                        <Text style={styles.detailPrice}>{priceFormat(price)}</Text>
                                    </View>
                                    {promotionPrice > 0 && (
                                        <View style={styles.detailOrder}>
                                            <Text style={styles.detailTicketName}>Mã giảm giá</Text>
                                            <Text style={styles.detailPrice}>-{priceFormat(promotionPrice)}</Text>
                                        </View>
                                    )}

                                    <Text ellipsizeMode="clip" numberOfLines={1} style={styles.dashLine}>
                                        <DashLine />
                                    </Text>
                                    <View style={styles.detailOrder}>
                                        <Text style={styles.detailTotal}>Tổng cộng:</Text>
                                        <Text style={styles.detailTotalPrice}>{priceFormat(totalPrice)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.part}>
                                <Text style={styles.heading}>Khuyến mãi</Text>
                                <View style={styles.partContainer}>
                                    <View style={styles.promotionCode}>
                                        <Text style={styles.promotionText}>Mã khuyến mãi:</Text>
                                        <TextInput
                                            autoCapitalize="characters"
                                            style={[styles.detailTicketName, styles.input]}
                                            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                                            placeholder="Nhập vô đây"
                                            value={promotionCode}
                                            onChangeText={handlePromotionInput}
                                        />
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.button} onPress={getPromotion}>
                                            <Text style={styles.buttonText}>Áp dụng</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.part}>
                                <Text style={styles.heading}>Phương thức thanh toán</Text>
                                <View style={styles.partContainer3}>
                                    {paymentMethods.map((method, index) => (
                                        <PaymentMethod
                                            isSelected={selectedPaymentMethod === index}
                                            key={index}
                                            logoUrl={method.logoUrl}
                                            name={method.name}
                                            isLastChild={index === paymentMethods.length - 1}
                                            onPress={() => setSelectedPaymentMethod(index)}
                                        />
                                    ))}
                                </View>
                            </View>
                            <View style={styles.part}>
                                <Text style={styles.confirmText}>Bằng việc ấn vào thanh toán, bạn xác nhận đã đọc và đồng ý với các điều khoản giao dịch trực tuyến của chúng tôi.</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.checkout}>
                    <View style={styles.checkoutDetails}>
                        <Text style={styles.detailText}>
                            Tổng cộng: <Text style={styles.highlight}>{priceFormat(totalPrice)}</Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.checkoutButton} onPress={handlePayment}>
                        <Text style={styles.checkoutText}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const getStyles = () =>
    StyleSheet.create({
        background: {
            flex: 1,
        },
        seatHolding: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.lightPurple,
            height: 35,
        },
        holdingText: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
            color: "white",
        },
        holdingTime: {
            fontSize: 16,
            fontFamily: "BVP_Bold",
            color: "white",
        },
        container: {
            flex: 1,
            marginHorizontal: 20,
        },
        heading: {
            fontSize: 20,
            fontFamily: "BVP_SemiBold",
            color: "black",
        },
        part: {
            borderRadius: 10,
        },
        partContainer: {
            marginTop: 10,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            shadowColor: colors.gray,
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            gap: 10,
        },
        detailOrder: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        detailTicketName: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
            flex: 3,
        },
        detailPrice: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
            flex: 1,
            textAlign: "right",
        },
        detailTotal: {
            fontSize: 16,
            fontFamily: "BVP_SemiBold",
            color: colors.lightPurple,
        },
        detailTotalPrice: {
            fontSize: 16,
            fontFamily: "BVP_SemiBold",
            color: colors.lightPurple,
        },
        dashLine: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
        },
        partContainer: {
            marginTop: 10,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            shadowColor: colors.gray,
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            gap: 10,
        },
        input: {
            flex: 3,
            textAlign: "right",
            fontFamily: "BVP_SemiBold",
        },
        button: {
            backgroundColor: colors.lightPurple,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            height: 40,
        },
        promotionCode: {
            flexDirection: "row",
            alignItems: "center",
        },
        buttonText: {
            fontSize: 16,
            fontFamily: "BVP_SemiBold",
            color: "white",
            lineHeight: 20,
        },
        promotionText: {
            flex: 2,
            fontSize: 16,
            fontFamily: "BVP_Regular",
        },
        buttonContainer: {
            alignItems: "flex-end",
            marginTop: 10,
        },
        partContainer3: {
            marginTop: 10,
            backgroundColor: "white",
            borderRadius: 10,
            shadowColor: colors.gray,
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
        },
        scroll: {
            flex: 1,
        },
        scrollView: {
            padding: 20,
            gap: 20,
        },
        checkoutDetails: {
            flex: 1,
            gap: 5,
        },
        checkoutButton: {
            backgroundColor: colors.lightPurple,
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
        highlight: {
            color: colors.lightPurple,
            fontFamily: "BVP_Bold",
        },
        checkoutText: {
            color: "white",
            fontSize: 16,
            fontFamily: "BVP_SemiBold",
        },
        detailText: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
        },
    });
