import React, { useState } from "react";
import { ScrollView, Image, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe";

import colors from "../themes/colors";

const BoxInfo = ({ icon, text }) => {
    return (
        <View style={styles.boxInfo}>
            {icon ? <Ionicons name={icon} size={24} color={colors.lightPurple} /> : null}
            <Text style={styles.boxInfoText}>{text}</Text>
        </View>
    );
};

export default function FilmDetails({ route }) {
    const { film } = route.params;

    const getYouTubeVideoId = (url) => {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|e(?:mbed)?)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <Image
                    style={styles.headerImage}
                    source={{
                        uri: "https://cdn.galaxycine.vn/media/2024/12/4/moana-2-750_1733308287728.jpg",
                    }}
                />
                <View style={styles.overlay}></View>
            </View>
            <View style={styles.filmDetails}>
                <View style={styles.posterView}>
                    <Image style={styles.poster} source={{ uri: film.poster }} />
                </View>
                <View style={styles.filmNameView}>
                    <Text style={styles.filmName}>{film.name}</Text>
                    <View style={styles.icons}>
                        <BoxInfo icon={"time-outline"} text={`${film.duration} phút`} />
                        <BoxInfo text={film.age_rating} />
                    </View>
                </View>
            </View>
            <View style={styles.grid}>
                <View style={styles.details}>
                    <Text style={styles.content}>{film.description}</Text>
                </View>
                <View style={styles.details}>
                    <View style={styles.flexRow}>
                        <View style={styles.col1}>
                            <Text style={styles.smallTitle}>Khởi chiếu</Text>
                        </View>
                        <View style={styles.col2}>
                            <Text style={styles.smallContent}>{film.release_date}</Text>
                        </View>
                    </View>
                    <View style={styles.flexRow}>
                        <View style={styles.col1}>
                            <Text style={styles.smallTitle}>Thể loại</Text>
                        </View>
                        <View style={styles.col2}>
                            <Text style={styles.smallContent}>{film.genres}</Text>
                        </View>
                    </View>
                    <View style={styles.flexRow}>
                        <View style={styles.col1}>
                            <Text style={styles.smallTitle}>Đạo diễn</Text>
                        </View>
                        <View style={styles.col2}>
                            <Text style={styles.smallContent}>{film.directors}</Text>
                        </View>
                    </View>
                    <View style={styles.flexRow}>
                        <View style={styles.col1}>
                            <Text style={styles.smallTitle}>Diễn viên</Text>
                        </View>
                        <View style={styles.col2}>
                            <Text style={styles.smallContent}>{film.actors}</Text>
                        </View>
                    </View>
                    <View style={styles.flexRow}>
                        <View style={styles.col1}>
                            <Text style={styles.smallTitle}>Ngôn ngữ</Text>
                        </View>
                        <View style={styles.col2}>
                            <Text style={styles.smallContent}>{film.lang}</Text>
                        </View>
                    </View>
                </View>
                <YoutubeIframe height={200} videoId={getYouTubeVideoId(film.trailer)} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3F3F3",
    },
    headerImage: {
        width: "100%",
        aspectRatio: 3 / 2,
    },
    poster: {
        width: "100%",
        aspectRatio: 2 / 3,
        marginTop: -50,
        borderRadius: 5,
        shadowColor: colors.gray,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Phủ toàn bộ lên ảnh
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Màu RGB (0, 0, 0) với độ trong suốt 50%
    },
    filmDetails: {
        marginVertical: 10,
        flexDirection: "row",
        gap: 10,
        marginHorizontal: 20,
    },
    filmName: {
        fontSize: 20,
        fontFamily: "BVP_Medium",
        lineHeight: 30,
    },
    posterView: {
        flex: 1,
    },
    filmNameView: {
        flex: 3,
    },
    title: {
        fontSize: 20,
        fontFamily: "BVP_SemiBold",
    },
    details: {
        gap: 10,
    },
    content: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
        textAlign: "justify",
    },
    posterView: {
        flex: 1,
    },
    filmNameView: {
        flex: 3,
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    col1: {
        flex: 2,
    },
    col2: {
        flex: 5,
    },
    smallTitle: {
        fontSize: 16,
        fontFamily: "BVP_SemiBold",
    },
    smallContent: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
        textAlign: "left",
    },
    icons: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },
    boxInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderWidth: 1,
        borderColor: colors.lightPurple,
        padding: 5,
        borderRadius: 5,
    },
    boxInfoText: {
        fontSize: 16,
        fontFamily: "BVP_Regular",
    },
    grid: {
        marginTop: 20,
        gap: 20,
        marginHorizontal: 20,
    },
});
