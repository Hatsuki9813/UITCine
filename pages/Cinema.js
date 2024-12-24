import { SafeAreaView, View, StyleSheet, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";

import CinemaListChild from "../components/cinema/CinemaListChild";
import { getAllProvinces, getCinemasByProvince } from "../database/database";

import colors from "../themes/colors";
import Header from "../components/Header";

export default function Cinema({ navigation }) {
    const [selectedProvince, setSelectedProvince] = useState(1); // Mặc định chọn tỉnh có ID = 1
    const [cinemas, setCinemas] = useState([]); // Dữ liệu các rạp
    const [provinces, setProvinces] = useState([]); // Dữ liệu các tỉnh

    // Lấy dữ liệu các tỉnh/thành phố
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const provincesData = await getAllProvinces(); // Gọi hàm bất đồng bộ
                setProvinces(provincesData); // Cập nhật state provinces
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };
        fetchProvinces();
    }, []);

    // Lấy dữ liệu các rạp phim theo tỉnh đã chọn
    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const cinemasData = await getCinemasByProvince(selectedProvince); // Gọi hàm bất đồng bộ
                setCinemas(cinemasData); // Cập nhật state cinemas
            } catch (error) {
                console.error("Error fetching cinemas:", error);
                setCinemas([]); // Fallback nếu có lỗi
            }
        };

        fetchCinemas();
    }, [selectedProvince]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Rạp phim"} />
            <View style={styles.header}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={provinces} // Sử dụng state provinces đã được set
                    labelField="name"
                    valueField="id"
                    placeholder="Tỉnh/ Thành phố"
                    value={selectedProvince}
                    onChange={(item) => {
                        setSelectedProvince(item.id); // Cập nhật tỉnh khi chọn
                    }}
                />
            </View>
            <ScrollView style={styles.cinemaList}>
                {Array.isArray(cinemas) && cinemas.length > 0 ? (
                    cinemas.map((cinema) => <CinemaListChild key={cinema.id} navigation={navigation} cinemaName={cinema.name} cinemaAddress={cinema.address} cinemaId={cinema.id} />)
                ) : (
                    <Text style={styles.noCinemas}>Không có rạp phim nào tại tỉnh này.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whitesmoke,
    },
    header: {
        justifyContent: "center",
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGray,
        paddingVertical: 20,
    },
    dropdown: {
        borderColor: colors.lightPurple,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "white",
        height: 40,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
        paddingLeft: 10,
        color: colors.lightGray,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
        paddingLeft: 10,
    },
    cinemaList: {
        paddingHorizontal: 20,
    },
});
