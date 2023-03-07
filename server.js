const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    // Serve the index.html file
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal server error");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  } else if (req.url === "/attendance" && req.method === "POST") {
    // Handle the form submission and return the attendance data as JSON
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const classdate = formData.get("classdate");
      const name = formData.get("name");
      const sex = formData.get("sex");
      const attendance = formData.getAll("attendance");
      const attendanceData = {
        classdate: classdate,
        name: name,
        sex: sex,
        attendance: attendance,
      };
      fs.readFile("data.json", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.end("Internal server error");
        } else {
          const attendanceList = JSON.parse(data);
          attendanceList.push(attendanceData);
          fs.writeFile("data.json", JSON.stringify(attendanceList), (err) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "text/plain");
              res.end("Internal server error");
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(attendanceList));
            }
          });
        }
      });
    });
  } else if (req.url === "/attendance" && req.method === "GET") {
    // Serve the attendance data as JSON
    fs.readFile("data.json", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal server error");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
