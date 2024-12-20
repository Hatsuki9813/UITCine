import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const login = (usernameInput) => {
        setIsLoggedIn(true);
        setUsername(usernameInput);
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
