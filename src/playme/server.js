const http = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const hostname = 'localhost'
const app = next({ dev, hostname, port })

console.log("Node version: " + process.version);

app.prepare()
    .then(() => {
        console.log("App prepared");

        const handle = app.getRequestHandler();

        console.log("Got handle");

        http.createServer(function(req, res) {
            console.log(`Processing incoming request`);

            try {
                handle(req, res).catch(function(e) {
                    console.log(`Error caught3: ` + e);
                    console.log(e);
                });
                
                console.log(`Incoming request done`);
            } catch (e) {
                console.log(`Error caught: ` + e);
                console.log(e);
            }
        }).listen(port);

        console.log(`> Ready on http://localhost:${port}`);
    })
    .catch(function(e) {
        console.log(`Error caught2: ` + e);
        console.log(e);
    });

console.log("Done");