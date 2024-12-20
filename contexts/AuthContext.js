import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

import { signUp } from "../database/database";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const login = (usernameInput) => {
        setIsLoggedIn(true);
        setUsername("leviettan000");
        signUp({ username: "leviettan000", password: "123", email: "leviettan000@gmail.com" });
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername("");
    };

    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login, logout, username: username }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
