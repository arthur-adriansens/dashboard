/** @format */

const server = Bun.serve({
    fetch(req) {
        const path = new URL(req.url).pathname;
        console.log(path);

        if (path == "/check_status") return new Response("Connected!");

        return new Response("Page not found :(", { status: 404 });
    },
    error(error) {
        return new Response(`<pre>${error}\n${error.stack}</pre>`, {
            headers: {
                "Content-Type": "text/html",
            },
        });
    },
});

console.log(`Listening on localhost:${server.port}`);
