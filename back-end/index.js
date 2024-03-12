var express = require('express')
var cors = require('cors')
var app = express()

const mongoose = require("mongoose")
const port = 3001

app.use(cors())
app.use(express.json())
 

const Dados = mongoose.model("Dados", {
    title: String, 
    descriptio: String,
    valor: Number,
    parcela: Number,
})

app.get('/', async (req, res) => { //buscar dados
    const dados = await Dados.find()
    return res.send(dados)
})

app.post('/', async (req, res) => { //enviar dados
    const dado = new Dados({
        title: req.body.title,
        descriptio: req.body.descriptio,
        valor: req.body.valor,
        parcela: req.body.parcela,
    })
     await dado.save()
     return res.send(dado)
     
})


app.put('/:id', async (req, res) => { //atualizar dados
    const dado = await Dados.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        descriptio: req.body.descriptio,
        valor: req.body.valor,
        parcela: req.body.parcela,
        
    })
    res.send(dado)
})

app.delete('/:id', async (req, res) => {
    try {
      const deletedDado = await Dados.findByIdAndDelete(req.params.id);
      if (!deletedDado) {
        return res.status(404).send({ message: "Dado não encontrado" });
      }
      res.send({ message: "Dado excluído com sucesso" });
    } catch (error) {
      res.status(500).send({ message: "Erro ao excluir dado" });
    }
  });
  


  

app.listen(port, () => {
    mongoose.connect("mongodb+srv://phillipediniz19:17192022@cluster0.bhmk33a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`Example app listening on port ${port}`)
})

