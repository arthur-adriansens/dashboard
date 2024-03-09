/** @format */

const fastify = require("fastify")();
// const db = require("./sqlite.js");

class Server {
    constructor() {
        fastify.get("/status_check", this.status);
        this.start_server();
    }
  
    async status(request, reply) {
      return reply.status(200);
    }

    start_server() {
        fastify.listen({ port: process.env.PORT, host: "0.0.0.0" }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Your app is listening on ${address}`);
        });
    }
}

new Server();
