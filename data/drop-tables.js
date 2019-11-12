const client = require('../lib/client');

run();

async function run() {

    try {
        await client.connect();
    
        await client.query(`
            DROP TABLE IF EXISTS cats;
            DROP TABLE IF EXISTS types;
        `);

        console.log('drop tables complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}
