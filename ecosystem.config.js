module.exports = {
    apps: [
        {
            name: "backend-teste-dfcom",
            script: "./server.js",
            env: {
                BACK_PORT: 8081,
                MONGO_URL: "mongodb://localhost:27017",
                NODE_ENV: "development",
            },
            env_production: {
                BACK_PORT: 8080,
                MONGO_URL: "mongodb://localhost:27017",
                NODE_ENV: "production",
            }
        }
    ]
}