import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // Consider token expired if there's an error
  }
};

export default isTokenExpired;