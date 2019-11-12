const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {

    try {
        // initiate connecting to db
        await client.connect();
    
        // run a query to create tables
        await client.query(`
            CREATE TABLE types (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL UNIQUE,
                inactive BOOLEAN NOT NULL DEFAULT FALSE
            );

            CREATE TABLE cats (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL,
                type_id INTEGER NOT NULL REFERENCES types(id),
                url VARCHAR(256) NOT NULL,
                year INTEGER NOT NULL,
                lives INTEGER NOT NULL,
                is_sidekick BOOLEAN NOT NULL
            );
        `);

        console.log('create tables complete');
    }
    catch (err) {
        // problem? let's see the error...
        console.log(err);
    }
    finally {
        // success or failure, need to close the db connection
        client.end();
    }
    
}