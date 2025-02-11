export const getUserRole = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("role");
    }
    return null;
};

export const setUserRole = (role) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("role", role);
    }
};
