const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjc2ZmQ0YmUzZDAwMTU4NDYwMTQiLCJpYXQiOjE2NjgwODU2MTUsImV4cCI6MTY2OTI5NTIxNX0.kb8Xdym3g7w_VaHUzUWEl2EUqrVgOn9acXC5vZbUAiM`;
export const opts = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};
export const uri = ` https://striveschool-api.herokuapp.com/api/deezer/`;
