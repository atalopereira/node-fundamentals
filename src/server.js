import http from 'node:http';

// Exemplo de uma rota para criar usuário, preciso enviar nome, email...
// Através do req que obtenho as informações da requisição, de quem está chamando o servidor
// res: Devolve uma resposta para quem está chamando nosso servidor

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com'
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)