import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString() * -1)
    console.log(transformed)
    //No lugar do null poderia retornar algum erro caso existisse
    // Segundo parâmetro é o dado transformado
    callback(null, Buffer.from(String(transformed)))
  }
}

// Retornando stream completa
const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent)
  
  return res.end(fullStreamContent)
})

// const server = http.createServer((req, res) => {
//   return req
//     .pipe(new InverseNumberStream())
//     .pipe(res)
// })

server.listen(3334)