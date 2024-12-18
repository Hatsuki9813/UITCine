import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("UITCine.db");

import { getTodayDate } from "../modules/getTodayDate.js";

import { films } from "./init-data/films.js";
import { cinemas } from "./init-data/cinemas.js";
import { theaters } from "./init-data/theaters.js";
import { showtimes } from "./init-data/showtimes.js";

const dropTables = async () => {
    await db.runAsync(`DROP TABLE IF EXISTS users`);
    await db.runAsync(`DROP TABLE IF EXISTS films`);
    await db.runAsync(`DROP TABLE IF EXISTS provinces`);
    await db.runAsync(`DROP TABLE IF EXISTS cinemas`);
    await db.runAsync(`DROP TABLE IF EXISTS theaters`);
    await db.runAsync(`DROP TABLE IF EXISTS showtime_details`);
    await db.runAsync(`DROP TABLE IF EXISTS coupons`);
    await db.runAsync(`DROP TABLE IF EXISTS orders`);
    await db.runAsync(`DROP TABLE IF EXISTS tickets`);
    await db.runAsync(`DROP TABLE IF EXISTS sold_seats`);
};

const createTables = async () => {
    await db.runAsync(`CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        password TEXT,
        display_name TEXT,
        email TEXT,
        phone_number TEXT,
        avatar TEXT,
        dob DATETIME
        )`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS films (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        release_date DATETIME,
        duration INTEGER,
        age_rating TEXT,
        genres TEXT,
        directors TEXT,
        actors TEXT,
        lang TEXT,
        format TEXT,
        poster TEXT,
        trailer TEXT,
        status_id INTEGER,
        banner TEXT
        )`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS provinces (
        id INTEGER PRIMARY KEY,
        name TEXT
        )`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS cinemas (
        id INTEGER PRIMARY KEY,
        name TEXT,
        address TEXT,
        province_id INTEGER
        )`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS theaters (
        id INTEGER PRIMARY KEY,
        name TEXT,
        format TEXT,
        row INTEGER,
        col INTEGER,
        cinema_id INTEGER
        )`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS showtime_details (
        id INTEGER PRIMARY KEY,
        cinema_id INTEGER,
        theater_id INTEGER,
        film_id INTEGER,
        showtime TEXT,
        format TEXT
        )`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS coupons (
        coupon TEXT PRIMARY KEY,
        type INTEGER,
        value INTEGER,
        available INTEGER
        )`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        price INTEGER,
        showtime_id INTEGER,
        username TEXT,
        used INTEGER,
        seats TEXT,
        day TEXT
        )`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price INTEGER
    )`);
    await db.runAsync(`CREATE TABLE IF NOT EXISTS sold_seats (
        showtime_id INTEGER,
        seat_id TEXT,
        PRIMARY KEY (showtime_id, seat_id)
    )`);
};

const initData = async () => {
    await db.runAsync(`DELETE FROM films`);
    await db.runAsync(`DELETE FROM theaters`);
    await db.runAsync(`DELETE FROM showtime_details`);
    await db.runAsync(`DELETE FROM sold_seats`);

    for (let i = 0; i < films.length; i++) {
        const film = films[i];
        const params = [
            film.id,
            film.name,
            film.description,
            film.release_date,
            film.duration,
            film.age_rating,
            film.genres,
            film.directors,
            film.actors,
            film.lang,
            film.format,
            film.poster,
            film.trailer,
            film.status_id,
            film.banner
        ];
        const query = `
        INSERT INTO films 
        (id, name, description, release_date, duration, age_rating, genres, directors, actors, lang, format, poster, trailer, status_id, banner) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        await db.runAsync(query, params);
    }

    for (let i = 0; i < cinemas.length; i++) {
        const cinema = cinemas[i];
        const params = [cinema.id, cinema.name, cinema.address, cinema.province_id];
        const query = `
        INSERT INTO cinemas 
        (id, name, address, province_id) 
        VALUES (?, ?, ?, ?)`;
        await db.runAsync(query, params);
    }

    for (let i = 0; i < showtimes.length; i++) {
        const showtime = showtimes[i];
        const params = [showtime.id, showtime.cinema_id, showtime.theater_id, showtime.film_id, showtime.showtime, showtime.format];
        const query = `
        INSERT INTO showtime_details 
        (id, cinema_id, theater_id, film_id, showtime, format) 
        VALUES (?, ?, ?, ?, ?, ?)`;
        await db.runAsync(query, params);
    }

    for (let i = 0; i < theaters.length; i++) {
        const theater = theaters[i];
        const params = [theater.id, theater.name, theater.format, theater.row, theater.col, theater.cinema_id];
        const query = `
        INSERT INTO theaters 
        (id, name, format, row, col, cinema_id) 
        VALUES (?, ?, ?, ?, ?, ?)`;
        await db.runAsync(query, params);
    }

    try {
        await db.runAsync(`INSERT INTO provinces (id, name) VALUES (1, 'TP. Hồ Chí Minh')`);
        await db.runAsync(`INSERT INTO provinces (id, name) VALUES (2, 'Bình Dương')`);
        await db.runAsync(`INSERT INTO provinces (id, name) VALUES (3, 'Đồng Nai')`);

        await db.runAsync(`INSERT INTO coupons (coupon, type, value, available) VALUES ('PROMOTION', '0', 10000, '1')`);
        await db.runAsync(`INSERT INTO coupons (coupon, type, value, available) VALUES ('DISCOUNT', '1', 10, '1')`);

        await db.runAsync(`INSERT INTO tickets (id, name, price) VALUES ('1', 'U22 2D sau 22h', '45000')`);
        await db.runAsync(`INSERT INTO tickets (id, name, price) VALUES ('2', 'Người lớn 2D sau 22h', '55000')`);
        await db.runAsync(`INSERT INTO tickets (id, name, price) VALUES ('3', 'U22 2D', '55000')`);
        await db.runAsync(`INSERT INTO tickets (id, name, price) VALUES ('4', 'Người lớn 2D', '65000')`);

        await db.runAsync(`INSERT INTO sold_seats (showtime_id, seat_id) VALUES ('1', 'C6')`);
        await db.runAsync(`INSERT INTO sold_seats (showtime_id, seat_id) VALUES ('1', 'C7')`);

        await db.runAsync(`INSERT INTO orders (id, price, showtime_id, username, used, seats, day) VALUES ('1', '45000', '1', 'leviettan000', '0', 'C6', '2022-11-11')`);
        await db.runAsync(`INSERT INTO orders (id, price, showtime_id, username, used, seats, day) VALUES ('2', '55000', '1', 'leviettan000', '0', 'C7', '2022-11-12')`);
    } catch (error) {
        console.log(error);
    }
};

export const startDatabase = async () => {
    await dropTables();
    await createTables();
    await initData();
};

export const signUp = async (data) => {
    try {
        const query = `
            INSERT INTO users (username, password, email, phone_number, avatar, dob, display_name)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [data.username, data.password, data.email, "", "", "", ""];
        await db.runAsync(query, params);
        return 1; // Thành công
    } catch {
        return 0; // Lỗi
    }
};

export const signIn = async (data) => {
    const query = `
            SELECT * FROM users
            WHERE username = ? AND password = ?
        `;
    const params = [data.username, data.password];
    const result = await db.getAllAsync(query, params);

    // Kiểm tra kết quả
    if (result.length > 0) return 1; // Đăng nhập thành công
    return 0;
};

export const getFilmsByStatus = async (status_id) => {
    const query = `
            SELECT * FROM films
            WHERE status_id = ${status_id}
        `;
    const params = [status_id];
    const result = await db.getAllAsync(query, params);
    return result;
};

export const getCinemasByProvince = async (province) => {
    const query = `
            SELECT * FROM cinemas
            WHERE province_id = ?
        `;
    const params = [province];
    const result = await db.getAllAsync(query, params);
    return result;
};

export const getAllProvinces = async () => {
    const query = `
            SELECT * FROM provinces
        `;
    const result = await db.getAllAsync(query);
    return result;
};

export const test1 = async () => {
    console.log("Test1");
    const query = `
            SELECT id FROM films
        `;
    const result = await db.getAllAsync(query);
    console.log(result);
    return result;
};

export const test2 = async () => {
    const result = await db.getAllAsync(`SELECT name FROM films WHERE id = 12`);
    console.log(result);
};

export const test = async () => {
    try {
        const result = await db.getAllAsync(`SELECT * FROM showtime_details`);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

export const getFilmsShowtimes = async (province_id, cinema_id, film_id) => {
    if (!cinema_id) {
        const query = `
            SELECT
            films.id AS film_id,
            films.name AS film_name,
            films.format AS film_format,
            films.poster AS film_poster,
            cinemas.id AS cinema_id,
            cinemas.name AS cinema_name,
            theaters.id AS theater_id,
            theaters.name AS theater_name,
            theaters.format AS theater_format,
            theaters.row AS theater_row,
            theaters.col AS theater_col,
            showtime_details.id AS showtime_id, 
            showtime_details.showtime,
            showtime_details.format
            FROM showtime_details
            INNER JOIN cinemas ON showtime_details.cinema_id = cinemas.id
            INNER JOIN theaters ON showtime_details.theater_id = theaters.id
            INNER JOIN films ON showtime_details.film_id = films.id
            WHERE film_id = ? AND province_id = ?
        `;
        const params = [film_id, province_id];
        const result = await db.getAllAsync(query, params);
        return result;
    } else {
        const query = `
            SELECT
            films.id AS film_id,
            films.name AS film_name,
            films.format AS film_format,
            films.poster AS film_poster,
            cinemas.id AS cinema_id,
            cinemas.name AS cinema_name,
            theaters.id AS theater_id,
            theaters.name AS theater_name,
            theaters.format AS theater_format,
            theaters.row AS theater_row,
            theaters.col AS theater_col,
            showtime_details.id AS showtime_id, 
            showtime_details.showtime,
            showtime_details.format
            FROM showtime_details
            INNER JOIN cinemas ON showtime_details.cinema_id = cinemas.id
            INNER JOIN theaters ON showtime_details.theater_id = theaters.id
            INNER JOIN films ON showtime_details.film_id = films.id
            WHERE film_id = ? AND cinemas.id = ?
        `;
        const params = [film_id, cinema_id];
        const result = await db.getAllAsync(query, params);
        return result;
    }
};

export const getSoldSeatsByShowtime = async (showtime_id) => {
    const query = `
        SELECT seat_id FROM sold_seats WHERE showtime_id = ?
    `;
    const params = [showtime_id];
    const result = await db.getAllAsync(query, params);
    return result;
};

export const getPromotionCode = async (coupon) => {
    const query = `
        SELECT * FROM coupons WHERE coupon = ?
    `;
    const params = [coupon];
    const result = await db.getAllAsync(query, params);
    return result;
};

export const getTicketPrice = async (ticket_id) => {
    const query = `
        SELECT * FROM tickets WHERE id = ?
    `;
    const params = [ticket_id];
    const result = await db.getAllAsync(query, params);
    return result;
};

export const addOrder = async (data) => {
    try {
        const query1 = `
            INSERT INTO orders (id, price, showtime_id, username, used, seats, day) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params1 = [data.id, data.price, data.showtime_id, data.username, 0, data.seats.join(", "), getTodayDate()];
        await db.runAsync(query1, params1);
        console.log("Order added:", params1);

        data.seats.forEach(async (seat) => {
            const query2 = `
                INSERT INTO sold_seats (showtime_id, seat_id) VALUES (?, ?)
            `;
            const params2 = [data.showtime_id, seat];
            await db.runAsync(query2, params2);
            console.log("Seat added:", params2);
        });
    } catch (error) {
        console.log(error);
    }
};

export const demoUsedTicket = async (order_id) => {
    try {
        const query = `
        UPDATE orders
        SET used = 1
        WHERE id = ?
    `;
        const params = [order_id];
        await db.runAsync(query, params);
    } catch (error) {
        console.log(error);
    }
};

export const getUserInfo = async (username) => {
    const query = `
        SELECT * FROM users WHERE username = ?
    `;
    const params = [username];
    const result = await db.getAllAsync(query, params);
    return result;
};

export const getUsersTicket = async (username, ticketType) => {
    const query = `
        SELECT * FROM orders WHERE username = ? AND used = ?
        ORDER BY day DESC
        LIMIT 30
    `;
    const params = [username, ticketType];
    const result = await db.getAllAsync(query, params);
    return result;
};

export const getShowtimeBase = async (showtime_id) => {
    try {
        const query = `
        SELECT
            films.poster AS film_poster,
            films.name AS film_name,
            films.format AS film_format,
            films.duration AS film_duration,
            films.age_rating AS film_ageRating,
            showtime_details.format AS format,
            cinemas.name AS cinema_name,
            showtime_details.showtime AS showtime,
            theaters.format AS theater_format,
            theaters.name AS theater_name
        FROM showtime_details
        INNER JOIN cinemas ON showtime_details.cinema_id = cinemas.id
        INNER JOIN films ON showtime_details.film_id = films.id
        INNER JOIN theaters ON showtime_details.theater_id = theaters.id
        WHERE showtime_details.id = ?
    `;
        const params = [showtime_id];
        const result = await db.getAllAsync(query, params);
        return result;
    } catch (error) {
        console.log(error);
    }
};
