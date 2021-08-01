import io from "socket.io-client";

const socket = io("/wb");

const SendDataMessage = <T>(topic: string, data: T) => {
  console.log(`topic`, topic, `data`, data);
  socket.emit(topic, data);
};

export default SendDataMessage;
