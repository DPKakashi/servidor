// Proteccion de derechos de autor y notas musicales para evitar samples o plagios
// Proteccion de derechos de autor y notas musicales para evitar samples o plagios
const express = require("express");
const SHA256 = require("crypto-js/sha256");
const port = process.env.PORT || 3000;

const app = express();
var list = []; 

app.use(express.json()); //Recibir datos en formato json
app.use(express.urlencoded()); // Decode a los datos enviados en el formulario
app.use(express.static("public")); //Pasar de publico a estatico

app.get("/servidor", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
 console.log("llega");
  class Block {
    constructor(
      index,
      nombreCompleto,
      idUsuario,
      telefonoUsuario,
      previousHash = ""
    ) {
      this.index = index;
      this.date = new Date();
      this.nombreCompleto = nombreCompleto;
      this.idUsuario = idUsuario;
      this.telefonoUsuario = telefonoUsuario;
      this.previousHash = previousHash;
      this.hash = this.createHash();
    }

    createHash() {
      return SHA256(
        this.index +
          this.date +
          this.nombreCompleto +
          this.idUsuario +
          this.telefonoUsuario
   +
          this.previousHash
      ).toString();
    }

   /* encontrar(nombreCompleto, idUsuario) {
      while (
        !this.nombreCompleto.startsWith(nombreCompleto) &&
        !this.idUsuario.startsWith(idUsuario)
      ) {
        this.hash = this.createHash();
      }
    }*/
  }

  class BlockChain {
    constructor(idOrigen, nombreCompleto, idUsuario) {
      this.chain = [this.createFirstBlock(idOrigen)];
      this.nombreCompleto = nombreCompleto;
      this.idUsuario = idUsuario;
    }

    createFirstBlock(idOrigen) {
      return new Block(0, idOrigen);
    }

    getLasBlock() {
      return this.chain[this.chain.length - 1];
    }

    addBlock(nombreCompleto, idUsuario, telefonoUsuario) {
      let prevBlock = this.getLasBlock();
      let persona = new Block(
        prevBlock.index + 1,
        nombreCompleto,
        idUsuario,
        telefonoUsuario
,
        prevBlock.hash
      );
      //persona.encontrar(this.tipo, this.idUsuario);
      console.log(
        "Perrona  " +
          persona.nombreCompleto +
          " y número de ID " +persona.idUsuario
      );
      this.chain.push(persona);
    }
  }

  //Informacion del donante
  const blockchain = new BlockChain();
  //Informacion del receptor
  //blockchain.addBlock("Luis Fernando Imbachi", "1002963174", "3216312182");

  let nombreUsuario = req.body.nombreUsuario;
  let idUsuario= req.body.idUsuario;
  let telefonoUsuario = req.body.telefonoUsuario;

  blockchain.addBlock(
    nombreUsuario,
    idUsuario,
    telefonoUsuario,
  );
this.list = blockchain.chain;
res.sendStatus(200);
  //console.log(JSON.stringify(blockchain.chain, null, 2));
});
app.post("/list", (req, res) => {
  console.log(this.list);
  res.status(200).jsonp(this.list);
//document.getElementById("listBlock").innerHTML = this.chain;
});
app.post("/update", (req, res) => {
  console.log(this.list);
  this.list.forEach(element => {
    if (element.idUsuario===req.body.idUsuario) {
      console.log("usuario encontrado");
      element.nombreCompleto = req.body.nombreCompleto;
      element.idUsuario = req.body.idUsuario;
      element.telefonoUsuario = req.body.telefonoUsuario;
    }
  });
  res.sendStatus(200);
//document.getElementById("listBlock").innerHTML = this.chain;
});
app.listen(port, () => {
  console.log(`Server funcionando en http://localhost:${port}`);
});
