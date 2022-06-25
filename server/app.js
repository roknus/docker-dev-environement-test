
const path = require('path')
const http = require('http')
const fs = require('fs')

function app() {
  const distFolder = path.join(process.cwd(), '/dist');

  return http.createServer((request, res) => {

    var filePath = '.' + request.url;
    console.log(filePath)
    var extname = path.extname(filePath);

    var contentType = 'text/html';
    switch (extname) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.wasm':
            contentType = 'application/wasm';
            break;
        default:
          return;
    }
    res.writeHead(200, { 'content-type': contentType })
    fs.createReadStream(path.join(distFolder, filePath)).pipe(res)
  })
}

function run() {
  const port = process.env.PORT || 3000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
      console.log(`Node server listening on http://localhost:${port}`);
  });
}

run();