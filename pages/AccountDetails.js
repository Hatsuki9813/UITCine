import { StatusBar, SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

import colors from "../themes/colors";

import AccountRowButton from "../components/account/AccountRowButton";
import Header from "../components/Header";

import { formatDMY } from "../modules/formatDateTime";

export default function AccountDetails({ route, navigation }) {
    const { userData } = route.params;

    const styles = getStyles();
    return (
        <SafeAreaView style={styles.background}>
            <Header navigation={navigation} title={"Thông tin tài khoản"} />
            <StatusBar barStyle={"dark-content"} />
            <ScrollView style={styles.background}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Thông tin tài khoản</Text>
                        <View style={styles.partContainer}>
                            <AccountRowButton title="Tên đăng nhập" value={userData.username} denyChange={true} />
                            <AccountRowButton title="Tên hiển thị" value={userData.display_name} />
                            <AccountRowButton title="Email" value={userData.email} />
                            <AccountRowButton title="Số điện thoại" value={userData.phone_number} />
                            <AccountRowButton title="Ngày sinh" value={userData.dob ? formatDMY(userData.dob) : ""} lastButton={true} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title}>Bảo mật</Text>
                        <View style={styles.partContainer}>
                            <AccountRowButton title="Đổi mật khẩu" />
                            <AccountRowButton title="Đăng nhập bằng sinh trắc học" lastButton={true} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title}>Quản lý tài khoản</Text>
                        <View style={styles.partContainer}>
                            <AccountRowButton title="Xoá tài khoản" danger={true} lastButton={true} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = () =>
    StyleSheet.create({
        background: {
            flex: 1,
        },
        container: {
            paddingVertical: 20,
            marginHorizontal: 20,
            gap: 30,
        },
        title: {
            fontFamily: "BVP_SemiBold",
            fontSize: 16,
            marginBottom: 10,
        },
        partContainer: {
            borderRadius: 10,
            backgroundColor: "white",
            shadowColor: colors.gray,
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            width: "100%",
            backgroundColor: "white",
        },
    });
