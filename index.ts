const port: number = 5500
const router = new Bun.FileSystemRouter({
  dir: process.cwd() + '/content',
  style: 'nextjs',
  fileExtensions: ['.html']
})

console.log(`Starting server on port ${port} (http://localhost:${port}/)`)

Bun.serve({
  port,
  async fetch (req) {
    const url: URL = new URL(req.url)
    const file: string | undefined = router.routes[url.pathname]

    if (file !== undefined) {
      return new Response(await Bun.file(file).text(), {
        headers: { 'Content-Type': 'text/html' }
      })
    }
    return new Response('<p><b>404 Error</b></p>', {
      headers: { 'Content-Type': 'text/html' }
    })
  }
})
