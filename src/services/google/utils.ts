import axios from "axios";

export const generateRandom = () => Math.random().toString(36).substring(2, 10);
export const generateAccessToken = async ({ refreshToken}) => {
  const res = await axios.post(`https://www.googleapis.com/oauth2/v3/token`, {
    grant_type: 'refresh_token',
    client_id: '870080256753-kjpq87kqsvtpl7e566p8s19233tbuo49.apps.googleusercontent.com',
    client_secret: 'REetFQ3MuVlbDyO4TSnlHCYn',
    refresh_token: refreshToken,
  });

  return res.data.access_token;
};