const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  //   if (req.url === '/') {
  //     fs.readFile(
  //       path.join(__dirname, 'public', 'index.html'),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { 'Content-Type': 'text/html' });
  //         res.end(content);
  //       }
  //     );
  //   } else if (req.url === '/about') {
  //     fs.readFile(
  //       path.join(__dirname, 'public', 'about.html'),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { 'Content-Type': 'text/html' });
  //         res.end(content);
  //       }
  //     );
  //   } else if (req.url === '/about') {
  //     fs.readFile(
  //       path.join(__dirname, 'public', 'about.html'),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { 'Content-Type': 'text/html' });
  //         res.end(content);
  //       }
  //     );
  //   } else if (req.url === '/api/users') {
  //     const users = [
  //       { id: 101, name: 'Jack Smith', age: 23 },
  //       { id: 102, name: 'Arman Jack', age: 35 },
  //       { id: 103, name: 'Aaron Peter', age: 40 }
  //     ];
  //     res.writeHead(200, { 'Content-Type': 'application/json' });
  //     res.end(JSON.stringify(users));
  //   }
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );
  let fileExt = path.extname(filePath);
  let contentType = 'text/html';
  switch (fileExt) {
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
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // 404 Error
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
          }
        );
      } else {
        // Other Error
        res.writeHead(500);
        res.end(`Server Error #<h1>${erro.code}</h1>`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
