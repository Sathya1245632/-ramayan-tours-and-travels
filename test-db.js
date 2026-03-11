const { Client } = require('pg');

const client = new Client({
  connectionString: process.argv[2],
  ssl: {
    rejectUnauthorized: false
  }
});

console.log('Connecting to:', process.argv[2]);

client.connect()
  .then(() => {
    console.log('Successfully connected to the database!');
    return client.end();
  })
  .catch(err => {
    console.error('Connection error:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  });
