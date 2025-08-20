import client from 'prom-client';

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});
register.registerMetric(httpRequestCounter);

export async function GET(req) {
  httpRequestCounter.inc();

  // Token-based security check
  const token = req.headers.get("x-metrics-token");
  if (token !== process.env.METRICS_SECRET_TOKEN) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const metrics = await register.metrics();
    return new Response(metrics, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; version=0.0.4; charset=utf-8' },
    });
  } catch (err) {
    return new Response("Error generating metrics", { status: 500 });
  }
}
