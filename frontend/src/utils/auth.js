import jwtDecode from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error.message);
    return false;
  }
};
