import axios from "axios";

const setToken = () => {
    let token = "";
    try {
        token = localStorage.getItem("token");
    } catch { return 1;}
    if (token === null) return 1;
    axios.defaults.headers["authorization"] = token;
    return 0;
}

const logout = () => {
    try {
        localStorage.removeItem("token");
    } catch {}
    delete axios.defaults.headers["authorization"];
}

export {setToken, logout};