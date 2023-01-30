import express from `express`;
import cluster from `cluster`;
import * as os from `os`;

const modoCluster = process.argv[3] == `CLUSTER`;

if (modoCluster && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Primary ${process.pid} is running`);
    console.log(`número de procesadores: ${numCPUs}`);

for(let i = 0; i < numCPUs; i++) {
    cluster.fork();
}

cluster.on(`exit`, worker => {
    console.log(`worker ${worker.process.pid} died`, new Date().toLocaleString());
    cluster.fork();
})
}
else {
    const app = express();
    const PORT = parseInt(process.argv[2]) || 8080;
    const STATIC = process.argv[4] == `STATIC`;

if(STATIC){

    app.use(express.static(`/public`));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}}