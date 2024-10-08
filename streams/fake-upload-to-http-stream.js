// Funciona como o front end, enviando dados para o arquivo "stream-http-server"
import { Readable } from 'node:stream'

// class OneToHundredStream extends Readable {
//   index = 1;
//   _read() {
//     // retornar quais são os dados dessa stream
//     const i = this.index++

//     setTimeout(() => {
//       if (i > 100) {
//         this.push(null)
//       } else {
//         const buf = Buffer.from(String(i))
//         this.push(buf)
//       }
//     }, 1000)
//   }
// }

// fetch('http://localhost:3334', {
//   method: 'POST',
//   body: new OneToHundredStream(),
//   duplex: 'half'
// })

// Consumindo stream completa
class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    // retornar quais são os dados dessa stream
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})