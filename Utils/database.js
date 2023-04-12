import pg from  'pg';

let client = new pg.Client({
    host: 'db',
    port: 5432,
    database: 'Flipkart',
    user: 'postgres',
    password: 'magidexter'
});
export default client;