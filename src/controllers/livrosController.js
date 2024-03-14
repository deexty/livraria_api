import mongoose from "mongoose";
import {autores, livros} from "../models/index.js"

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros.find().populate("autor");
      res.status(200).json(livrosResultado);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();

      if(livroResultados !== null){
        res.status(200).send(livroResultados);
      }else{ 
        res.status(404).send('id do livro não localizado');
      }
    } catch (erro) {
      next(erro)
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndDelete(id);

      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };

  static listaLivroPorFiltro = async (req,res,next) => {
    try{
      const busca = await verificaFiltros(req.query)
      
      if(busca !== null){
        const livroResultado = await livros.find(busca).populate("autor")
        res.status(200).json({message: "livros buscados com sucesso", livros: livroResultado})
      }else{
        res.status(200).json({message: "livros buscados com sucesso", livros: []})
      }

    }catch(error){
      next(error)
    }
  }
}

async function verificaFiltros(params) {
  const {editora, titulo, min, max, autor} = params
  let busca = {}
  
  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = {$regex: titulo, $options: "i"};
  
  if(min || max) busca.numeroPaginas = {}

  if(min) busca.numeroPaginas.$gte = min
  if(max) busca.numeroPaginas.$lte = max

  if(autor){
    const autorBuscado = await autores.findOne({nome: autor})

    if(autorBuscado !== null){
      busca.autor = autorBuscado._id
    }else{
      busca = null
    }
  }

  return busca
}

export default LivroController;
