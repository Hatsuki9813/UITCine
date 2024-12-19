import React, { forwardRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import colors from "../../themes/colors";

const AuthInput = forwardRef(({ title, autoCapitalize, secureTextEntry, iconName, keyboardType, returnKeyType, onSubmitEditing, onChangeText }, ref) => {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(secureTextEntry);
    const [changeableIconName, setChangeableIconName] = useState(iconName);

    const styles = getStyles(text.trim() === "", isFocused);

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleFocus = () => setIsFocused(true);

    const handleChangeText = (inputText) => {
        setText(inputText);
        if (onChangeText) {
            onChangeText(inputText); // Gửi giá trị lên component cha
        }
    };

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
        setChangeableIconName(showPassword ? "eye" : "eye-off");
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <TextInput
                value={text}
                secureTextEntry={showPassword}
                autoCapitalize={autoCapitalize}
                hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}
                style={styles.AuthInput}
                onChangeText={handleChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                ref={ref}
            />
            {secureTextEntry && isFocused ? (
                <TouchableOpacity style={styles.button} onPress={showPasswordHandler}>
                    <Feather name={changeableIconName} size={24} color="white" />
                </TouchableOpacity>
            ) : text.trim() !== "" && isFocused ? (
                <TouchableOpacity style={styles.button} onPress={() => setText("")}>
                    <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
            ) : null}
        </View>
    );
});

export default AuthInput;

const getStyles = (isEmptyInput, isFocused) =>
    StyleSheet.create({
        container: {
            width: "100%",
            height: 55,
            borderRadius: 10,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderColor: isFocused ? colors.pink : colors.gray,
            borderWidth: 1,
        },
        titleView: {
            position: "absolute",
            height: "100%",
            flex: 1,
            justifyContent: !isFocused && isEmptyInput ? "center" : "",
            zIndex: 0,
        },
        titleText: {
            color: colors.lightGray,
            fontSize: !isFocused && isEmptyInput ? 20 : 16,
            left: 12,
            paddingVertical: 5,
        },
        AuthInput: {
            position: "absolute",
            bottom: 4,
            fontSize: 20,
            zIndex: 1,
            color: "white",
            left: 12,
            right: 60,
            height: 55 / 2,
            padding: 0,
        },
        button: {
            position: "absolute",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            right: 12,
            height: "100%",
        },
    });
