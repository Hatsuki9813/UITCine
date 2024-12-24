import { useRef, useState } from "react";
import { SafeAreaView, StatusBar, View, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Dimensions } from "react-native";

import colors from "../themes/colors";

import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import { useAuth } from "../contexts/AuthContext";

import { signIn } from "../database/database";

export default function SignIn({ navigation }) {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const screenHeight = Dimensions.get("window").height;

    const styles = getStyles();

    const goToSignUp = () => {
        navigation.navigate("SignUp");
        return;
    };

    const SignIn = async () => {
        const { username, password } = formData;
        if (username === "" || password === "") {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const result = await signIn({ username, password });
        if (result.success) {
            navigation.replace("MainStack");
            login(username);
        } else Alert.alert("Lỗi", "Tên đăng nhập hoặc mật khẩu không đúng.");
    };

    const passwordInputRef = useRef();

    const logo = require("../assets/uit-cine-logo.png");

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={[styles.background, { minHeight: screenHeight }]}>
                <StatusBar barStyle={"light-content"} />
                <View style={styles.container}>
                    <View style={styles.row1}>
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.logoName}>UITCine</Text>
                    </View>
                    <View style={styles.row2}>
                        <AuthInput
                            onSubmitEditing={() => passwordInputRef.current.focus()}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            title={"Tài khoản"}
                            autoCapitalize={"none"}
                            iconName={"x"}
                            onChangeText={(text) => setFormData((prev) => ({ ...prev, username: text }))}
                        />
                        <AuthInput
                            ref={passwordInputRef}
                            returnKeyType="done"
                            title={"Mật khẩu"}
                            autoCapitalize={"none"}
                            secureTextEntry={true}
                            iconName={"eye-off"}
                            onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
                        />
                        <AuthButton onPress={SignIn} title={"Đăng nhập"} />
                        <View style={styles.forgotPassword}>
                            <Text style={styles.text}>Quên mật khẩu? </Text>
                            <TouchableOpacity hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                                <Text style={styles.buttonText}>Ấn vào đây</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row3}>
                        <Text style={styles.text}>Chưa có tài khoản? </Text>
                        <TouchableOpacity hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }} onPress={goToSignUp}>
                            <Text style={styles.buttonText}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
        forgotPassword: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
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
