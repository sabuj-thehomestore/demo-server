const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Dummy employee JSON data
const employees = [
  {
    id: 101,
    name: 'Alice Johnson',
    position: 'Software Engineer',
    department: 'Engineering',
    email: 'alice.johnson@example.com',
    salary: 85000
  },
  {
    id: 102,
    name: 'Bob Smith',
    position: 'Product Manager',
    department: 'Product',
    email: 'bob.smith@example.com',
    salary: 95000
  },
  {
    id: 103,
    name: 'Charlie Brown',
    position: 'UX Designer',
    department: 'Design',
    email: 'charlie.brown@example.com',
    salary: 78000
  }
];

// Health / Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Dummy Express Server is running',
    endpoints: {
      getEmployees: 'GET /api/employees',
      postData: 'POST /api/employees or POST /api/data'
    }
  });
});

// GET endpoint returning dummy employee JSON data
app.get('/api/employees', (req, res) => {
  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees
  });
});

// POST endpoint accepting dummy JSON and logging it to the console
app.post('/api/employees', (req, res) => {
  console.log('Received POST request on /api/employees:');
  console.log(JSON.stringify(req.body, null, 2));

  res.status(201).json({
    success: true,
    message: 'Data received and logged successfully',
    receivedData: req.body
  });
});

// Also support generic POST /api/data
app.post('/api/data', (req, res) => {
  console.log('Received POST request on /api/data:');
  console.log(JSON.stringify(req.body, null, 2));

  res.status(200).json({
    success: true,
    message: 'Data received and logged successfully',
    receivedData: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`GET  endpoint: http://localhost:${PORT}/api/employees`);
  console.log(`POST endpoint: http://localhost:${PORT}/api/employees or /api/data`);
});
