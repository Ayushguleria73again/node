const autocannon = require('autocannon');

// URL of the server to test
const targetUrl = 'http://localhost:8000/signup';

const instance = autocannon({
  url: targetUrl,          // URL to test
  connections: 1000,        // Number of concurrent connections
  duration: 100,            // Duration of the test in seconds
  pipelining: 1,           // Number of requests to send in parallel
  requests: [
    {
      method: 'GET',       // HTTP method
      path: '/',           // Path to test
    }
  ],
});

// Log the results
autocannon.track(instance, { renderProgressBar: true });

instance.on('done', () => {
  console.log('Load test completed!');
});
