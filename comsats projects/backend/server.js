const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Dummy banners data
const banners = [
  {
    id: 1,
    image: 'https://i.ibb.co/3kQw6yT/psl-banner.jpg',
    title: 'Free Live Streaming',
    subtitle: 'Watch PSL Live on Tamasha',
  },
  // Add more banners as needed
];

// API endpoint for banners
app.get('/api/banners', (req, res) => {
  res.json(banners);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
}); 