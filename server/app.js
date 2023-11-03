const http = require("http");
const fs = require("fs");
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "semv",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database.");
});

const server = http.createServer((req, res) => {
  // serving html file
  if (req.method === "GET" && req.url === "/") {
    fs.readFile("../client/home.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("404 - Page not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  // serving css file
  else if (req.method === "GET" && req.url === "/home.css") {
    fs.readFile("../client/home.css", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("404 - Page not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  }
  //   serving js file
  else if (req.method === "GET" && req.url === "/index.js") {
    fs.readFile("../client/index.js", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("404 - Page not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  // fetching data from database
  else if (req.method === "GET" && req.url === "/products") {
    const sql = "SELECT * FROM PRODUCTS;";
    db.query(sql, (err, results) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results));
      }
    });
  }
  // for untagged requests
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 - Page not found");
  }
});

server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000.`);
});
