const express = require("express");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

server.listen(4000, () => console.log("socket server 4000 start!"));

const nsp = io.of("/wb");
nsp.on("connection", (socket) => {
  // 접속한 클라이언트의 정보가 수신되면
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("clear", (data) => {
    console.log(data);
    socket.broadcast.emit("clear", true);
  });
});

/*
// 접속된 모든 클라이언트에게 메시지를 전송한다
io.emit('event_name', msg);

// 메시지를 전송한 클라이언트에게만 메시지를 전송한다
socket.emit('event_name', msg);

// 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
socket.broadcast.emit('event_name', msg);

// 특정 클라이언트에게만 메시지를 전송한다
io.to(id).emit('event_name', data);
*/
