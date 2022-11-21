// Proteccion de derechos de autor y notas musicales para evitar samples o plagios
const express = require("express");
const SHA256 = require("crypto-js/sha256");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json()); //Recibir datos en formato json
app.use(express.urlencoded()); // Decode a los datos enviados en el formulario
app.use(express.static("public")); //Pasar de publico a estatico

app.get("/servidor", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {

  class Block {
    constructor(
      index,
      nombreCompleto,
      id,
      telefono,
      previousHash = ""
    ) {
      this.index = index;
      this.date = new Date();
      this.nombreCompleto = nombreCompleto;
      this.id = id;
      this.telefono = telefono;
      this.previousHash = previousHash;
      this.hash = this.createHash();
    }

    createHash() {
      return SHA256(
        this.index +
          this.date +
          this.nombreCompleto +
          this.id +
          this.telefono +
          this.previousHash
      ).toString();
    }

    encontrar(nombreCompleto, id) {
      while (
        !this.nombreCompleto.startsWith(nombreCompleto) &&
        !this.id.startsWith(id)
      ) {
        this.hash = this.createHash();
      }
    }
  }

  class BlockChain {
    constructor(donanteOrigen, nombreCompleto, id) {
      this.chain = [this.createFirstBlock(donanteOrigen)];
      this.nombreCompleto = nombreCompleto;
      this.id = id;
    }

    createFirstBlock(donanteOrigen) {
      return new Block(0, donanteOrigen);
    }

    getLasBlock() {
      return this.chain[this.chain.length - 1];
    }

    addBlock(nombreCompleto, id, telefono) {
      let prevBlock = this.getLasBlock();
      let persona = new Block(
        prevBlock.index + 1,
        nombreCompleto,
        id,
        telefono,
        prevBlock.hash
      );
      persona.encontrar(this.tipo, this.id);
      console.log(
        "Perrona  " +
          persona.nombreCompleto +
          " y número de ID " +persona.id
      );
      this.chain.push(persona);
    }
  }

  //Informacion del donante
  const blockchain = new BlockChain("Pepito Perez", "O");
  //Informacion del receptor
  blockchain.addBlock("Luis Fernando Imbachi", "1002963174", "3216312182");

  let nombreUsuario = req.body.nombreUsuario;
  let id= req.body.id;
  let telefono = req.body.telefono;

  blockchain.addBlock(
    nombreUsuario,
    id,
    telefono,
  );

  console.log(JSON.stringify(blockchain.chain, null, 2));
});

app.listen(port, () => {
  console.log(`Server funcionando en http://localhost:${port}`);
});
