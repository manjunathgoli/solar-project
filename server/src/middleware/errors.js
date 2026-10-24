export function notFound(_req, res) {
  res.status(404).json({ error: 'Endpoint not found.' });
}

export function errorHandler(err, _req, res, next) {
  if (res.headersSent) return next(err);
  console.error(JSON.stringify({ level: 'error', message: err.message }));
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Something went wrong. Please try again.' });
}
