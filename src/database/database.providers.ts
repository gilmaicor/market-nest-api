import { createConnection } from 'typeorm';

console.log(process.env.MYSQL_HOST);

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'nestdb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        migrationsTableName: 'migrations',
        migrations: ['./migration/*.ts'],
        cli: {
          migrationsDir: './migration',
        },
        logging: true,
      }),
  },
];
