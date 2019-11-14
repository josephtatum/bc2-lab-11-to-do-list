const client = require('../lib/client');
const createAuthRoutes = require('../lib/auth/create-auth-routes');
// import our seed data:
const todos = require('./todos');

run();

async function run() {

    try {
        await client.connect();

        await Promise.all(
            todos.map(todo => {
                return client.query(`
                    INSERT INTO todos (task, complete)
                    VALUES ($1, $2);
                `,
                [todo.task, todo.complete]);
            })

            
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}
