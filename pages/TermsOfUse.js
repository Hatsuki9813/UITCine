import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";

export default function TermsOfUse({ navigation }) {
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Header title="Điều khoản và chính sách" navigation={navigation} />
                <Text style={styles.header}>
                   <Text style={styles.boldText}>1. BẢN QUYỀN</Text>
                </Text>
                <Text style={styles.content}>
                    Tất cả nội dung được hiển thị trên website và các sản phẩm liên quan UITCine dưới bất kỳ hình thức nào như ký tự,
                    hình ảnh, logo, video clip… là tài sản của UITCine hoặc các đối tác cung cấp nội dung của UITCine, được bảo vệ bởi
                    luật pháp Việt Nam và các quy định bản quyền quốc tế. Sự biên soạn và hiển thị các nội dung này thông qua UITCine
                    là tài sản riêng của UITCine.
                </Text>
                <Text style={styles.header}>
                     <Text style={styles.boldText}>2. QUYỀN TRUY CẬP</Text>
                </Text>
                <Text style={styles.content}>
                Với điều kiện bạn tuân theo các Thỏa thuận sử dụng và các khoản thanh toán cho các dịch vụ bổ sung, bạn có quyền truy cập và sử dụng các dịch vụ của UITCine. Quyền truy cập này không bao gồm bất kỳ giao dịch mua đi bán lại hoặc sử dụng vì mục đích thương mại các dịch vụ và nội dung của UITCine; các thông tin mô tả, đánh giá, bình luận; bất kỳ sự sao chép hoặc download thông tin để phục vụ lợi ích của bên thứ ba; hoặc việc sử dụng các công cụ khai thác dữ liệu. UITCine có quyền khiếu nại tất cả các hành động sao chép, sử dụng với mục đích thương mại mà không được sự đồng ý từ UITCine. Bạn có thể bị tước quyền truy cập vào UITCine nếu bạn không tuân theo các Thỏa thuận sử dụng này.
                </Text>
                <Text style={styles.header}>
                    <Text style={styles.boldText}> 3. TÀI KHOẢN CỦA BẠN </Text>
                </Text>
                <Text style={styles.content}>
                Nếu bạn sử dụng dịch vụ của UITCine, bạn có trách nhiệm duy trì sự bảo mật tài khoản và mật khẩu của bạn, cũng như hạn chế sự truy cập vào máy tính cá nhân. Bạn cũng đồng ý chịu trách nhiệm cho tất cả các hoạt động phát sinh dưới tài khoản và mật khẩu của bạn. Bạn có trách nhiệm đảm bảo các bộ phim hoặc sản phẩm bạn mua từ UITCine phù hợp với độ tuổi của bạn. UITCine có quyền đơn phương từ chối cung cấp dịch vụ, đóng tài khoản cá nhân, xóa bỏ hoặc thay đổi nội dung, hoặc hủy đơn hàng của bạn.
                </Text>
                <Text style={styles.header}>
                     <Text style={styles.boldText}>4. THÔNG TIN PHIM, CHƯƠNG TRÌNH, SỰ KIỆN </Text>
                </Text>
                <Text style={styles.content}>
                UITCine luôn cố gắng cung cấp cho bạn những thông tin chính xác và đa chiều về các bộ phim có hệ thống phân phối vé thông qua UITCine. Nếu vé bạn nhận được không tương ứng với chỗ ngồi bạn chọn khi đặt, bạn vui lòng liên hệ với nhân viên chăm sóc khách hàng của UITCine để có thêm chi tiết theo email supports@galaxy.com.vn hoặc fanpage UITCine. Tuy nhiên, UITCine không chịu bất kỳ trách nhiệm nào liên quan đến mức độ yêu thích của bạn đối với bộ phim. 6. GIÁ CẢ Trừ phi có ghi chú khác bằng văn bản, mức giá được hiển thị cho mỗi loại sản phẩm trên UITCine là mức giá bán lẻ cuối cùng của sản phẩm. Chúng tôi không cam kết mức giá của chỗ ngồi bạn đặt sẽ không thay đổi cho đến khi bạn đặt vé. Tuy nhiên, đối với những chỗ ngồi bị sai giá, nếu như mức giá của chỗ ngồi trên thực tế cao hơn mức giá hiển thị trên UITCine, thì chúng tôi sẽ liên lạc trực tiếp với bạn về vấn đề này.
                </Text>
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
        lineHeight: 24, // Giúp đoạn văn cách dòng dễ đọc hơn
    },
});
