//与HTTP相比多了证书认证

server.addContext('foo.com', {
  key: fs.readFileSync('./ssl/foo.com.key'),
  cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
  key: fs.readFileSync('./ssl/bar.com.key'),
  cert: fs.readFileSync('./ssl/bar.com.cer')
});