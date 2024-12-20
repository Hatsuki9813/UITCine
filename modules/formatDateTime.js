import { getDayOfWeek } from "./getDayOfWeek";

export const getHour = (dateTime) => {
    const [date, time] = dateTime.split(" "); // Tách phần ngày và giờ
    const [hour] = time.split(":"); // Lấy giờ từ phần giờ phút
    return hour; // Trả về chỉ giờ
};

export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-"); // Tách ngày, tháng, năm từ chuỗi "YYYY-MM-DD"
    return `${day}/${month}`; // Trả về định dạng "DD/MM"
};

export const formatDateHour = (date) => {
    const [year, month, dayAndTime] = date.split("-");
    const [day, time] = dayAndTime.split(" ");

    return `${time} - ${day}/${month}/${year}`;
};

export const formatDMY = (date) => {
    const [year, month, dayAndTime] = date.split("-");
    const [day, time] = dayAndTime.split(" ");

    return `${day}/${month}/${year}`;
};

export const formatFullDate = (date) => {
    if (date) {
        const dateName = getDayOfWeek(date);
        const [year, month, dayAndTime] = date.split("-");
        const [day, time] = dayAndTime.split(" ");

        return `${time} - ${dateName}, ${day}/${month}/${year}`;
    }
    return date;
};
