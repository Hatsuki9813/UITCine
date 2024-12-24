import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";

import Header from "../components/Header";
import { changeUserInfo } from "../database/database";
import { useAuth } from "../contexts/AuthContext";

import colors from "../themes/colors";

export default function ChangePw({ navigation }) {
    const [newPassword, setNewPassword] = useState("");
    const [cfNewPassword, setCfNewPassword] = useState("");
    const { username } = useAuth();

    const changeInfo = async () => {
        try {
            if (newPassword != cfNewPassword) {
                Alert.alert("Thay đổi mật khẩu", "Mật khẩu không khớp.");
            } else {
                const result = await changeUserInfo({
                    username: username,
                    field: "password",
                    value: newPassword,
                });
                if (result) Alert.alert("Thay đổi mật khẩu", "Thành công.", [{ onPress: () => navigation.replace("Account") }]);
                else Alert.alert("Lỗi");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Lỗi");
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <Header title={"Thay đổi thông tin"} navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Nhập mật khẩu mới</Text>
                <TextInput style={styles.input} value={newPassword} secureTextEntry={true} onChangeText={setNewPassword} placeholder="Nhập mật khẩu mới"></TextInput>
                <Text style={styles.title}>Xác nhận mật khẩu</Text>
                <TextInput style={styles.input} value={cfNewPassword} secureTextEntry={true} onChangeText={setCfNewPassword} placeholder="Xác nhận mật khẩu"></TextInput>
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
