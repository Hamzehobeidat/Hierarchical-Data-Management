const config = {
  app: {
    name: 'backend-api',
    port: process.env.PORT || 5000
  },
  db: {
    options: {
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      dialect: 'postgres',
      logging: false,
      define: {
        freezeTableName: true
      }
    }
  },
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
    algorithm: 'HS256'
  },
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  saltRounds: 10,
  seedScale: process.env.SEED_SCALE
};

export default config;
