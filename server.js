const express = require('express');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(cors());

const postRoutes = require('./posts/postRoutes');

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up...' })
})

server.use('/api/posts', postRoutes);

const PORT = 8000;

server.listen(PORT, () => console.log(`API running on port ${PORT}`));