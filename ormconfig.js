module.exports = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_USER_PASS,
  database: process.env.MYSQL_DB_NAME,
  entities: ["dist/**/*.entity.js"],
  synchronize: process.env.DB_SYNC === 'true',
  migrationsTableName: "migrations",
  migrations: ["./migration/*.ts"],
  cli: {
    migrationsDir: "./migration",
  },
  logging: process.env.LOGGING === 'true',
}