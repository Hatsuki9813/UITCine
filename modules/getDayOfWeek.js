export const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

    return daysOfWeek[date.getDay()];
};
