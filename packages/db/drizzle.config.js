export default {
    schema: "./src/schema.ts",
    out: "./drizzle",
    driver: "turso",
    dbCredentials: {
        url: process.env.DATABASE_URL || "file:./dev.db",
        authToken: process.env.DATABASE_AUTH_TOKEN,
    },
};
