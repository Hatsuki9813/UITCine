import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";

import Header from "../components/Header";
import { changeUserInfo } from "../database/database";
import { useAuth } from "../contexts/AuthContext";

import colors from "../themes/colors";

export default function AccountDetailChange({ navigation, route }) {
    const { title, value } = route.params;
    const [data, setData] = useState(value);
    const { username } = useAuth();

    const fieldNameMap = {
        "Tên hiển thị": "display_name",
        Email: "email",
        "Số điện thoại": "phone_number",
        "Ngày sinh": "dob",
    };

    const changeInfo = async () => {
        try {
            await changeUserInfo({
                username: username,
                field: fieldNameMap[title],
                value: data,
            });
        } catch (error) {
            console.log(error);
            Alert.alert("Lỗi");
            return;
        } finally {
            Alert.alert("Thay đổi thông tin thành công", "", [{ onPress: () => navigation.replace("Account") }]);
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <Header title={"Thay đổi thông tin"} navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <TextInput style={styles.input} value={data} onChangeText={setData} placeholder="Nhập thông tin mới" keyboardType={title === "Số điện thoại" ? "phone-pad" : "default"}></TextInput>
                <TouchableOpacity style={styles.button} onPress={changeInfo} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <Text style={styles.textButton}>Thay đổi</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    title: {
        fontFamily: "BVP_Medium",
        fontSize: 16,
        color: "black",
        marginVertical: 20,
    },
    input: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.lightGray,
        fontFamily: "BVP_Regular",
        fontSize: 16,
        paddingHorizontal: 10,
    },
    button: {
        height: 40,
        backgroundColor: colors.lightPurple,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    textButton: {
        fontFamily: "BVP_Medium",
        fontSize: 16,
        color: "white",
    },
});
