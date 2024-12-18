import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import colors from "../themes/colors";

import { getFilmsByStatus } from "../database/database";

const screenWidth = Dimensions.get("window").width;

export default function ShowingList({ route, navigation }) {
    const [data, setData] = useState([]); // Trạng thái để lưu dữ liệu phim
    const code = route.name === "Showing" ? 0 : 1;

    useEffect(() => {
        // Hàm lấy dữ liệu bất đồng bộ
        const fetchData = async () => {
            try {
                const films = await getFilmsByStatus(code); // Chờ dữ liệu trả về
                setData(films); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching films:", error); // Ghi log nếu xảy ra lỗi
            } finally {
            }
        };

        fetchData();
    }, [code]); // Chỉ gọi lại nếu `code` thay đổi

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableWithoutFeedback
                onPress={() =>
                    navigation.navigate("FilmBookingTop", {
                        film: item, // Truyền dữ liệu phim
                    })
                }
            >
                <View>
                    <Image source={{ uri: item.poster }} style={styles.image} />
                    <Text style={styles.title}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Số cột trong danh sách
            contentContainerStyle={styles.container}
            columnWrapperStyle={styles.columnWrapper}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: "#F3F3F3",
    },
    itemContainer: {
        width: screenWidth / 2 - 25, // Mỗi ô chiếm một nửa màn hình trừ khoảng cách margin
        padding: 10,
        shadowColor: colors.gray,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    image: {
        width: "100%", // Chiều rộng khớp với container
        aspectRatio: 2 / 3, // Tỷ lệ 2:3 (rộng:cao)
        borderRadius: 5,
    },
    title: {
        marginTop: 10,
        fontSize: 16,
        color: "black",
        textAlign: "center",
        fontFamily: "BVP_Medium",
        lineHeight: 25,
    },
    columnWrapper: {
        justifyContent: "space-between", // Khoảng cách đều giữa các cột
    },
});
