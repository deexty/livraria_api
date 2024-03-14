import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {type: String, required: [true, "campo titulo é obrigatorio"],},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: [true, "campo autor é obrigatorio"]},
    editora: {type: String},
    numeroPaginas: {type: Number, validate: {
      validator: function(v) {
        return v >= 10 && v <= 5000;
      },
      message: props => `o numero de paginas deve estar entre 10 e 5000. valor:${props.value} `
    },
    required: [true, 'User phone number required'],
      
    }
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;