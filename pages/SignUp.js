import { useRef, useState } from "react";
import { Alert, SafeAreaView, StatusBar, View, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, ScrollView } from "react-native";

import colors from "../themes/colors";

import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import { signUp } from "../database/database";

export default function SignUp({ navigation }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const styles = getStyles();

    const goToSignIn = () => {
        navigation.navigate("SignIn");
        return;
    };

    const screenHeight = Dimensions.get("window").height;

    const SignUp = async () => {
        const { username, email, password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }

        const result = await signUp({ username, email, password });
        if (result) Alert.alert("Đăng ký", "Đăng ký thành công", [{ text: "OK", onPress: () => navigation.navigate("SignIn") }], { cancelable: false });
        else Alert.alert("Lỗi", "Tên đăng nhập đã có người sử dụng.");
    };

    const logo = require("../assets/uit-cine-logo.png");

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={[styles.background, { minHeight: screenHeight }]}>
                    <StatusBar barStyle={"light-content"} />
                    <View style={styles.container}>
                        <View style={styles.row1}>
                            <Image source={logo} style={styles.logo} />
                            <Text style={styles.logoName}>UITCine</Text>
                        </View>
                        <View style={styles.row2}>
                            <AuthInput title={"Tài khoản"} autoCapitalize={"none"} iconName={"x"} onChangeText={(text) => setFormData((prev) => ({ ...prev, username: text }))} />
                            <AuthInput
                                title={"Email"}
                                autoCapitalize={"none"}
                                iconName={"x"}
                                keyboardType={"email-address"}
                                onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
                            />
                            <AuthInput
                                title={"Mật khẩu"}
                                autoCapitalize={"none"}
                                secureTextEntry={true}
                                iconName={"eye-off"}
                                onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
                            />
                            <AuthInput
                                title={"Xác nhận mật khẩu"}
                                autoCapitalize={"none"}
                                secureTextEntry={true}
                                iconName={"eye-off"}
                                onChangeText={(text) => setFormData((prev) => ({ ...prev, confirmPassword: text }))}
                            />
                            <AuthButton title={"Đăng ký"} onPress={SignUp} />
                        </View>
                        <View style={styles.row3}>
                            <Text style={styles.text}>Đã có tài khoản? </Text>
                            <TouchableOpacity hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }} onPress={goToSignIn}>
                                <Text style={styles.buttonText}>Đăng nhập ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const getStyles = () =>
    StyleSheet.create({
        background: {
            flex: 1,
            backgroundColor: colors.purple,
        },
        container: {
            marginHorizontal: 30,
            marginVertical: 50,
            flex: 1,
        },
        row1: {
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
        },
        row2: {
            flex: 8,
            gap: 20,
        },
        row3: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        logo: {
            height: 120,
            aspectRatio: 1,
            resizeMode: "contain",
        },
        logoName: {
            color: colors.pink,
            fontFamily: "BVP_Bold",
            fontSize: 32,
        },
        text: {
            fontFamily: "BVP_SemiBold",
            color: "white",
            fontSize: 16,
        },
        buttonText: {
            fontFamily: "BVP_SemiBold",
            color: colors.pink,
            fontSize: 16,
        },
    });
