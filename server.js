const express = require('express');
const server = express();
server.use(express.json());
server.use(express.cors());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up...' })
})

const PORT = 8000;

server.listen(PORT, () => console.log(`API running on port ${PORT}`));