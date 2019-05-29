export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://stagingapi.jobapplix.com"
    : "http://localhost:8080";
