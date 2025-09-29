export const config = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  MONGODB_DB: process.env.MONGODB_DB || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || "",
  mongodb: {
    uri: process.env.MONGODB_URI || "",
    db: process.env.MONGODB_DB || "",
  },
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || "",
  },
};