const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "7czKr5kWGQ6cG@Fb#c9AR$QyQY",
    host: "localhost",
    port: 5432,
    database: "anobooks"
});
module.exports = pool;