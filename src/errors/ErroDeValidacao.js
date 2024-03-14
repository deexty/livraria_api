import ErroBase from "./ErroBase.js";

class ErroDeValidacao extends ErroBase{
    constructor(error){
        const mensagem = Object.values(error.errors)
        .map(error => error.message)
        .join("; ")
        super(mensagem, 400)
    }
}

export default ErroDeValidacao