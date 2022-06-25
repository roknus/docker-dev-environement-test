const util = require('util');
const fs = require('fs');
const http = require('http')


function app(result) {
    return http.createServer((request, response) => {
        console.log(request.url);
        response.write(`<html><body>hi ${result.instance.exports.add(1, 2)}</body></html>`);
        response.end();
    })
}

function run(result) {
    const port = process.env.PORT || 3000;

    // Start up the Node server
    const server = app(result);
    server.listen(port, () => {
        console.log(`Node server listening on http://localhost:${port}`);
    });
}

var source = fs.readFileSync('./dist/test.wasm');
const env = {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({
        initial: 256
    }),
    table: new WebAssembly.Table({
        initial: 0,
        element: 'anyfunc'
    })
}
var typedArray = new Uint8Array(source);

WebAssembly.instantiate(typedArray, {
    env: env
}).then(result => {
    console.log('Loaded service...')
    run(result);
}).catch(e => {
    // error caught
    console.log(e);
});