import mongoose from "mongoose";
import ErroValidacao from "../errors/RequisicaoIncorreta.js";
import ErroBase from "../errors/ErroBase.js"
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import Erro404 from "../errors/Erro404.js";

const tratamentoDeErros = (erro, req, res, next) => {
    if(erro instanceof mongoose.Error.CastError){
      new RequisicaoIncorreta().enviaMensagem(res)
    }else if(erro instanceof mongoose.Error.ValidationError){
      new ErroValidacao(erro).enviaMensagem(res)
    }else if(erro instanceof Erro404){
      new Erro404().enviaMensagem(res)
    }
    else{
      new ErroBase().enviaMensagem(res)
    }
  }

export default tratamentoDeErros