import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";

export default function FAQ({ navigation }) {
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Header title="Câu hỏi thường gặp" navigation={navigation} />
                <Text style={styles.header}>
                    <Text style={styles.boldText}>1. Làm sao để đặt vé online?</Text>
                </Text>
                <View style={styles.content}>
                    <Text style={styles.step}>
                        <Text style={styles.boldStep}>Bước 1:</Text> Bạn truy cập vào Website/App của UITCine, đăng nhập tài khoản thành viên trước khi mua vé để hệ thống tích điểm vào tài khoản thành viên của bạn.
                    </Text>
                    <Text style={styles.step}>
                        <Text style={styles.boldStep}>Bước 2:</Text> Bạn vào mục Mua vé đối với Website/chọn Phim đang chiếu đối với App, bạn chọn Phim, chọn Rạp, chọn Suất chiếu, chọn Số lượng ghế (tối đa 8 ghế cho một giao dịch/Combo bắp nước `{'>'}`chọn Ghế `{'>'}` tiến hành thanh toán).
                    </Text>
                    <Text style={styles.step}>
                        <Text style={styles.boldStep}>Bước 3:</Text> Khi đến bước thanh toán, bạn vui lòng chọn hình thức thanh toán:
                        {"\n"}- Đối với các loại thẻ ATM/Visa/Master/JCB/QRCOCE: Bạn chọn cổng thanh toán là HSBC/Payoo, nhập thông tin tài khoản ngân hàng (Tên chủ thẻ, Mã số thẻ, Ngày hết hiệu lực…) và Mã OTP gửi về Số điện thoại để hoàn tất.
                        {"\n"}- Đối với các App trung gian như Momo/Ví ShopeePay/Ví Zalopay và VNPay: Đảm bảo số dư trong ví liên kết đủ để thanh toán.
                    </Text>
                    <Text style={styles.step}>
                        <Text style={styles.boldStep}>Bước 4:</Text> Sau 15-20 phút, nếu chưa nhận được xác nhận đặt vé, liên hệ hotline UITCine: 19002224 hoặc gửi thông tin (Tên, SĐT, Tên phim, Suất chiếu, Cụm rạp, Cổng thanh toán, Số tiền thanh toán).
                    </Text>
                </View>
                <Text style={styles.header}>
                    <Text style={styles.boldText}>2. Khi mua vé online tôi có được tích điểm hay không?</Text>
                </Text>
                <View style={styles.content}>
                    <Text style={styles.step}>
                        Khi bạn mua vé online trên Web/App của UITCine. Hệ thống UITCine sẽ không tích điểm được khi bạn thực hiện mua vé online tại Web/App của 123Phim, Momo….
                    </Text>
                </View>
                <Text style={styles.header}>
                    <Text style={styles.boldText}>3. Tôi có thể hủy hoặc thay đổi thông tin của vé đã mua online được không?</Text>
                </Text>
                <View style={styles.content}>
                    <Text style={styles.step}>
                    Theo quy định của UITCine vé đã mua thành công rồi thì không thể hủy/thay đổi thông tin được ạ. Tuy nhiên, trong trường hợp bạn không thể sắp xếp xem đúng suất chiếu mà bạn đã đặt nhầm, bạn vui lòng mang mã đặt vé đến trực tiếp tại rạp trước suất chiếu và liên hệ Ban quản lý để được hỗ trợ bạn nhé.                    </Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    text: {
        fontSize: 20,
    },
    header: {
        fontSize: 15,
        marginBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
    },
    content: {
        fontSize: 14,
        lineHeight: 24,
    },
    step: {
        fontSize: 14,
        lineHeight: 24,
        marginBottom: 8,
    },
    boldStep: {
        fontWeight: "bold",
    },
});
