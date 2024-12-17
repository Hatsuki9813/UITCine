import { StatusBar, ScrollView, View, StyleSheet, Image, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

import RowButton from "../components/account/RowButton";
import SignOutButton from "../components/account/SignOutButton";
import Header from "../components/Header";

import { useAuth } from "../contexts/AuthContext";

import { getUserInfo } from "../database/database";

import colors from "../themes/colors";

export default function Account({ navigation }) {
    const [userData, setUser] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { username } = useAuth();
                const userInfo = await getUserInfo(username);
                setUser(userInfo[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [userData]);

    const styles = getStyles();

    const defaultAvatar = require("../assets/avatar.jpg");

    return (
        <View style={styles.background}>
            <StatusBar barStyle={"dark-content"} />
            <SafeAreaView style={styles.background}>
                <Header title={"Tài khoản"} />
                <ScrollView style={styles.container}>
                    <View style={styles.row1}>
                        <TouchableOpacity onPress={() => console.log("Change avatar")}>
                            <Image source={userData ? { uri: userData.avatar } : defaultAvatar} style={styles.avatar} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("AccountDetails")}>
                            <Text style={styles.name}>{userData.display_name ? userData.display_name : `@${userData.username}`}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row2}>
                        <RowButton navigation={navigation} buttonText={"Cập nhật thông tin"} iconName={"create-outline"} pageName={"AccountDetails"} userData={userData} />
                        <RowButton navigation={navigation} buttonText={"Vé của tôi"} iconName={"ticket-outline"} pageName={"Tickets"} />
                        <RowButton navigation={navigation} buttonText={"Cài đặt"} iconName={"settings-outline"} pageName={"Settings"} />
                        <RowButton navigation={navigation} buttonText={"Thông tin liên hệ"} iconName={"call-outline"} pageName={"Contacts"} />
                        <RowButton navigation={navigation} buttonText={"Điều khoản và chính sách"} iconName={"document-text-outline"} pageName={""} />
                        <RowButton navigation={navigation} buttonText={"Câu hỏi thường gặp"} iconName={"chatbubbles-outline"} pageName={""} lastButton={true} />
                        <SignOutButton navigation={navigation} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const getStyles = () =>
    StyleSheet.create({
        background: {
            flex: 1,
        },
        container: {
            flex: 1,
            marginHorizontal: 20,
        },
        row1: {
            marginVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
        },
        row2: {},
        row3: {},
        avatar: {
            width: 75,
            height: 75,
            borderRadius: 75 / 2,
            borderColor: colors.lightPurple,
            borderWidth: 2,
        },
        name: {
            fontSize: 20,
            fontFamily: "BVP_SemiBold",
            color: "black",
        },
    });
