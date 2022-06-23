const http = require("http");
const app = require("./app");
const port = process.env.REACT_APP_PORT || 4000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server start at port || ${port}`);
});
