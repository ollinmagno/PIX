const saldo = 10000;

function gerarSessaoDoUsuario() {
  return Math.random() < 0.5;
}

function verificarSessao(sessao) {
  if(!sessao)
    return "Usuário deslogado";

  return true;
}

function consultarSaldo() {  
  return saldo;
}

function validarChave(numero) {
  if ( numero.toString().length != 11 || isNaN(numero) ) {
    return "Chave inválida";
  } else {
    return true;
  }
}

function validarValor(valor) {
  if(isNaN(parseFloat("10.2")) || valor <= 0) {
    return "Valor inválido";
  } else if(valor > 1000) {
    return "Valor acima do permitido";
  } else {
    return true;
  }
}

function realizarPix(sessao, numero, valor) {
  if(verificarSessao(sessao) === true) {
    if(validarValor(valor) === true) {
      if(validarChave(numero) === true){
        if(consultarSaldo() < valor){
          return "Saldo insuficiente";
        } else {
          return "PIX realizado com sucesso!";
        }
      } else {
        return validarChave(numero);
      }
    } else {
      return validarValor(valor);
    }
  } else {
    return verificarSessao(sessao);
  }
}

module.exports = {
  gerarSessaoDoUsuario,
  verificarSessao,
  consultarSaldo,
  validarChave,
  validarValor,
  realizarPix
};