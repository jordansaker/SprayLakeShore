import pg from 'pg';
import 'make-runnable';
let config = {
    user: 'lakeshore_dev',
    password: 'lakeshoredevpass123',
    host: 'localhost',
    port: 5432,
    database: 'spraylakeshore'
};
export const pool = new pg.Pool(config);
export const createTables = () => {
    const userTable = `CREATE TABLE IF NOT EXISTS
    students(
      id SERIAL PRIMARY KEY,
      username varchar(128) NOT NULL,
      email varchar(128) NOT NULL,
      user_role varchar(128) NOT NULL,
      password varcahr(128) NOT NULL
    )`;
    pool.query(userTable)
        .then((res) => {
        console.log(res);
        pool.end();
    })
        .catch(err => {
        console.log(err);
        pool.end;
    });
};
pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});
