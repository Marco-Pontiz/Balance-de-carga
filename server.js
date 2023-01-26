import express from `express`;
import cluster from `cluster`;
import * as os from `os`;

const modoCluster = process.argv[3] || `CLUSTER`;

//Master
if(modoCluster && cluster.isPrimary) {
    const numCPUs = os.cpus(). length;

    console.log(`Primary ${process.pid} is running`);
    console.log(`Numero de procesadores ${numCPUs}`);

    for(let i = 0; i < numCPUs; i++){
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

    app.get(`/datos`, (req, res) => {
        res.send(`Server en Port(${PORT}) - PID ${process.pid} - ${new Date().toLocaleString()}`);
    })
    const server = app.listen(PORT, () => {
        console.log(`Servidor express escuchando en http://localhost:${PORT}`);
    });
    server.on(`error`, error => console.log(`Error del servidor ${error}`));
}
