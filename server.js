const express = require('express');

const server = express();

server.all("/", (req, res) => {
  res.send("woah it work");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server workie");
  });
}

module.exports = keepAlive;