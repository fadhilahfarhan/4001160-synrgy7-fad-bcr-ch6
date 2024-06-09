import Express from 'express';
import http from 'http';
import carRoutes from './routes/carRoutes';
import userRoutes from './routes/userRoutes'
import knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

dotenv.config();

const app = Express();

const knexInstance = knex({
  client: 'postgresql',
  connection: {
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
  },
});

Model.knex(knexInstance);

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use('/cars', carRoutes);
app.use('/user', userRoutes)

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
  console.log('API Started http://localhost');
});
