const client = require('../lib/client');
// import our seed data:
const types = require('./types');
const cats = require('./cats');

run();

async function run() {

    try {
        await client.connect();

        // First save types and get each returned row which has
        // the id of the type. Notice use of RETURNING:
        const savedTypes = await Promise.all(
            types.map(async type => {
                const result = await client.query(`
                    INSERT INTO types (name)
                    VALUES ($1)
                    RETURNING *;
                `, 
                [type]);
                
                return result.rows[0];
            })
        );
    
        await Promise.all(
            cats.map(cat => {

                // Find the corresponding type id
                const type = savedTypes.find(type => {
                    return type.name === cat.type;
                });
                const typeId = type.id;

                return client.query(`
                    INSERT INTO cats (name, type_id, url, year, lives, is_sidekick)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
                [cat.name, typeId, cat.url, cat.year, cat.lives, cat.isSidekick]);
                
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
