const http = require('http');
const { spawn } = require('child_process');

const serverProcess = spawn('node', ['server.js'], { stdio: ['ignore', 'pipe', 'pipe'] });

serverProcess.stdout.on('data', (data) => {
  console.log(`[SERVER STDOUT] ${data.toString().trim()}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`[SERVER STDERR] ${data.toString().trim()}`);
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTests() {
  await wait(1000);

  try {
    console.log('\n--- Testing GET /api/employees ---');
    const getRes = await fetch('http://localhost:3000/api/employees');
    const getData = await getRes.json();
    console.log('GET Response:', JSON.stringify(getData, null, 2));

    console.log('\n--- Testing POST /api/employees ---');
    const postPayload = {
      name: 'Diana Prince',
      position: 'Security Specialist',
      department: 'Security',
      email: 'diana.prince@example.com'
    };
    const postRes = await fetch('http://localhost:3000/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postPayload)
    });
    const postData = await postRes.json();
    console.log('POST Response:', JSON.stringify(postData, null, 2));
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await wait(500);
    serverProcess.kill();
    process.exit(0);
  }
}

runTests();
