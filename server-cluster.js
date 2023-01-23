const express = require('express');
const cluster = require('cluster');

const app = express();
const numCPUs = require(`os`).cpus().length;