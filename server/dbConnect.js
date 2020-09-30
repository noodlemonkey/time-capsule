const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'nancykousholt',
  database: 'timecapsule',
});
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
