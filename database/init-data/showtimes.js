const today = new Date();

const getDayByOffset = (offset) => {
    const todayCopy = new Date(today); // Tạo bản sao của `today` mỗi lần gọi hàm
    todayCopy.setDate(todayCopy.getDate() + offset); // Thêm offset vào bản sao của ngày hôm nay

    const year = todayCopy.getFullYear();
    const month = String(todayCopy.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, nên cần cộng 1
    const day = String(todayCopy.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const showtimes = [
    { id: 1, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(0) + " 14:00", format: "PHỤ ĐỀ" },
    { id: 2, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(0) + " 16:00", format: "LỒNG TIẾNG" },
    { id: 3, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(0) + " 18:00", format: "PHỤ ĐỀ" },
    { id: 4, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(0) + " 20:00", format: "LỒNG TIẾNG" },
    { id: 5, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(0) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 6, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(0) + " 14:30", format: "LỒNG TIẾNG" },
    { id: 7, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(0) + " 16:30", format: "PHỤ ĐỀ" },
    { id: 8, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(0) + " 18:30", format: "LỒNG TIẾNG" },
    { id: 9, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(0) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 10, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(0) + " 22:30", format: "LỒNG TIẾNG" },
    { id: 11, cinema_id: 28, theater_id: 92, film_id: 3, showtime: getDayByOffset(0) + " 14:45", format: "PHỤ ĐỀ" },
    { id: 12, cinema_id: 21, theater_id: 75, film_id: 8, showtime: getDayByOffset(0) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 13, cinema_id: 21, theater_id: 76, film_id: 9, showtime: getDayByOffset(0) + " 21:00", format: "PHỤ ĐỀ" },
    { id: 14, cinema_id: 21, theater_id: 72, film_id: 10, showtime: getDayByOffset(0) + " 21:30", format: "PHỤ ĐỀ" },
    { id: 15, cinema_id: 21, theater_id: 73, film_id: 11, showtime: getDayByOffset(0) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 16, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(1) + " 14:00", format: "PHỤ ĐỀ" },
    { id: 17, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(1) + " 16:00", format: "LỒNG TIẾNG" },
    { id: 18, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(1) + " 18:00", format: "PHỤ ĐỀ" },
    { id: 19, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(1) + " 20:00", format: "LỒNG TIẾNG" },
    { id: 20, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(1) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 21, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(1) + " 14:30", format: "LỒNG TIẾNG" },
    { id: 22, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(1) + " 16:30", format: "PHỤ ĐỀ" },
    { id: 23, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(1) + " 18:30", format: "LỒNG TIẾNG" },
    { id: 24, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(1) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 25, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(1) + " 22:30", format: "LỒNG TIẾNG" },
    { id: 26, cinema_id: 28, theater_id: 92, film_id: 3, showtime: getDayByOffset(1) + " 14:45", format: "PHỤ ĐỀ" },
    { id: 27, cinema_id: 21, theater_id: 75, film_id: 8, showtime: getDayByOffset(1) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 28, cinema_id: 21, theater_id: 76, film_id: 9, showtime: getDayByOffset(1) + " 21:00", format: "PHỤ ĐỀ" },
    { id: 29, cinema_id: 21, theater_id: 72, film_id: 10, showtime: getDayByOffset(1) + " 21:30", format: "PHỤ ĐỀ" },
    { id: 30, cinema_id: 21, theater_id: 73, film_id: 11, showtime: getDayByOffset(1) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 31, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(2) + " 14:00", format: "PHỤ ĐỀ" },
    { id: 32, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(2) + " 16:00", format: "LỒNG TIẾNG" },
    { id: 33, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(2) + " 18:00", format: "PHỤ ĐỀ" },
    { id: 34, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(2) + " 20:00", format: "LỒNG TIẾNG" },
    { id: 35, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(2) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 36, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(2) + " 14:30", format: "LỒNG TIẾNG" },
    { id: 37, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(2) + " 16:30", format: "PHỤ ĐỀ" },
    { id: 38, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(2) + " 18:30", format: "LỒNG TIẾNG" },
    { id: 39, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(2) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 40, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(2) + " 22:30", format: "LỒNG TIẾNG" },
    { id: 41, cinema_id: 28, theater_id: 92, film_id: 3, showtime: getDayByOffset(2) + " 14:45", format: "PHỤ ĐỀ" },
    { id: 42, cinema_id: 21, theater_id: 75, film_id: 8, showtime: getDayByOffset(2) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 43, cinema_id: 21, theater_id: 76, film_id: 9, showtime: getDayByOffset(2) + " 21:00", format: "PHỤ ĐỀ" },
    { id: 44, cinema_id: 21, theater_id: 72, film_id: 10, showtime: getDayByOffset(2) + " 21:30", format: "PHỤ ĐỀ" },
    { id: 45, cinema_id: 21, theater_id: 73, film_id: 11, showtime: getDayByOffset(2) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 46, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(3) + " 14:00", format: "PHỤ ĐỀ" },
    { id: 47, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(3) + " 16:00", format: "LỒNG TIẾNG" },
    { id: 48, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(3) + " 18:00", format: "PHỤ ĐỀ" },
    { id: 49, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(3) + " 20:00", format: "LỒNG TIẾNG" },
    { id: 50, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(3) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 51, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(3) + " 14:30", format: "LỒNG TIẾNG" },
    { id: 52, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(3) + " 16:30", format: "PHỤ ĐỀ" },
    { id: 53, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(3) + " 18:30", format: "LỒNG TIẾNG" },
    { id: 54, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(3) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 55, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(3) + " 22:30", format: "LỒNG TIẾNG" },
    { id: 56, cinema_id: 28, theater_id: 92, film_id: 3, showtime: getDayByOffset(3) + " 14:45", format: "PHỤ ĐỀ" },
    { id: 57, cinema_id: 21, theater_id: 75, film_id: 8, showtime: getDayByOffset(3) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 58, cinema_id: 21, theater_id: 76, film_id: 9, showtime: getDayByOffset(3) + " 21:00", format: "PHỤ ĐỀ" },
    { id: 59, cinema_id: 21, theater_id: 72, film_id: 10, showtime: getDayByOffset(3) + " 21:30", format: "PHỤ ĐỀ" },
    { id: 60, cinema_id: 21, theater_id: 73, film_id: 11, showtime: getDayByOffset(3) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 61, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(4) + " 14:00", format: "PHỤ ĐỀ" },
    { id: 62, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(4) + " 16:00", format: "LỒNG TIẾNG" },
    { id: 63, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(4) + " 18:00", format: "PHỤ ĐỀ" },
    { id: 64, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(4) + " 20:00", format: "LỒNG TIẾNG" },
    { id: 65, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(4) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 66, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(4) + " 14:30", format: "LỒNG TIẾNG" },
    { id: 67, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(4) + " 16:30", format: "PHỤ ĐỀ" },
    { id: 68, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(4) + " 18:30", format: "LỒNG TIẾNG" },
    { id: 69, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(4) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 70, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(4) + " 22:30", format: "LỒNG TIẾNG" },
    { id: 71, cinema_id: 28, theater_id: 92, film_id: 3, showtime: getDayByOffset(4) + " 14:45", format: "PHỤ ĐỀ" },
    { id: 72, cinema_id: 21, theater_id: 75, film_id: 8, showtime: getDayByOffset(4) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 73, cinema_id: 21, theater_id: 76, film_id: 9, showtime: getDayByOffset(4) + " 21:00", format: "PHỤ ĐỀ" },
    { id: 74, cinema_id: 21, theater_id: 72, film_id: 10, showtime: getDayByOffset(4) + " 21:30", format: "PHỤ ĐỀ" },
    { id: 75, cinema_id: 21, theater_id: 73, film_id: 11, showtime: getDayByOffset(4) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 76, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(5) + " 14:00", format: "PHỤ ĐỀ" },
    { id: 77, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(5) + " 16:00", format: "LỒNG TIẾNG" },
    { id: 78, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(5) + " 18:00", format: "PHỤ ĐỀ" },
    { id: 79, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(5) + " 20:00", format: "LỒNG TIẾNG" },
    { id: 80, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(5) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 81, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(5) + " 14:30", format: "LỒNG TIẾNG" },
    { id: 82, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(5) + " 16:30", format: "PHỤ ĐỀ" },
    { id: 83, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(5) + " 18:30", format: "LỒNG TIẾNG" },
    { id: 84, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(5) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 85, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(5) + " 22:30", format: "LỒNG TIẾNG" },
    { id: 86, cinema_id: 28, theater_id: 92, film_id: 3, showtime: getDayByOffset(5) + " 14:45", format: "PHỤ ĐỀ" },
    { id: 87, cinema_id: 21, theater_id: 75, film_id: 8, showtime: getDayByOffset(5) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 88, cinema_id: 21, theater_id: 76, film_id: 9, showtime: getDayByOffset(5) + " 21:00", format: "PHỤ ĐỀ" },
    { id: 89, cinema_id: 21, theater_id: 72, film_id: 10, showtime: getDayByOffset(5) + " 21:30", format: "PHỤ ĐỀ" },
    { id: 90, cinema_id: 21, theater_id: 73, film_id: 11, showtime: getDayByOffset(5) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 91, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(6) + " 14:00", format: "PHỤ ĐỀ" },
    { id: 92, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(6) + " 16:00", format: "LỒNG TIẾNG" },
    { id: 93, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(6) + " 18:00", format: "PHỤ ĐỀ" },
    { id: 94, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(6) + " 20:00", format: "LỒNG TIẾNG" },
    { id: 95, cinema_id: 24, theater_id: 83, film_id: 1, showtime: getDayByOffset(6) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 96, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(6) + " 14:30", format: "LỒNG TIẾNG" },
    { id: 97, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(6) + " 16:30", format: "PHỤ ĐỀ" },
    { id: 98, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(6) + " 18:30", format: "LỒNG TIẾNG" },
    { id: 99, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(6) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 100, cinema_id: 24, theater_id: 84, film_id: 2, showtime: getDayByOffset(6) + " 22:30", format: "LỒNG TIẾNG" },
    { id: 101, cinema_id: 28, theater_id: 92, film_id: 3, showtime: getDayByOffset(6) + " 14:45", format: "PHỤ ĐỀ" },
    { id: 102, cinema_id: 21, theater_id: 75, film_id: 8, showtime: getDayByOffset(6) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 103, cinema_id: 21, theater_id: 76, film_id: 9, showtime: getDayByOffset(6) + " 21:00", format: "PHỤ ĐỀ" },
    { id: 104, cinema_id: 21, theater_id: 72, film_id: 10, showtime: getDayByOffset(6) + " 21:30", format: "PHỤ ĐỀ" },
    { id: 105, cinema_id: 21, theater_id: 73, film_id: 11, showtime: getDayByOffset(6) + " 22:00", format: "PHỤ ĐỀ" },
    { id: 106, cinema_id: 21, theater_id: 76, film_id: 8, showtime: getDayByOffset(5) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 107, cinema_id: 21, theater_id: 74, film_id: 8, showtime: getDayByOffset(5) + " 20:30", format: "PHỤ ĐỀ" },
    { id: 108, cinema_id: 21, theater_id: 74, film_id: 8, showtime: getDayByOffset(5) + " 23:30", format: "LỒNG TIẾNG" },
    { id: 109, cinema_id: 22, theater_id: 79, film_id: 8, showtime: getDayByOffset(5) + " 20:30", format: "PHỤ ĐỀ" },
];