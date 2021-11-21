const PIX = require('./pix');
const sessaoDoUsuario = PIX.gerarSessaoDoUsuario();
const saldoInicialDoCliente = 10000;

describe("Casos de teste da área PIX", () => {
  
  test('Caso 01: verificar se o usuário está logado', () => {
    if(sessaoDoUsuario) {
      expect(PIX.verificarSessao(sessaoDoUsuario)).toBe(true);
    } else {
      expect(PIX.verificarSessao(sessaoDoUsuario)).toBe('Usuário deslogado');
    }
  });

  test('Caso 1.1: verificar se o saldo inicial é válido', () => {
    expect(PIX.consultarSaldo()).toBe(saldoInicialDoCliente);
  });

  test('Caso 2.1: Verificar se chave é válida',
  () => {
      expect(PIX.validarChave('82988008800')).toBe(true);
  });

  test('Caso 2.2: verificar se chave é inválida, número maior que 11',
  () => {
      expect(PIX.validarChave('5582988008800')).toBe('Chave inválida');
  });
  test('Caso 2.2: verificar se chave é inválida, número menor que 11',
  () => {
      expect(PIX.validarChave('88008800')).toBe('Chave inválida');
  });
  test('Caso 2.3: verificar se chave é inválida, número com símbolo',
  () => {
      expect(PIX.validarChave('(82)98800-8800')).toBe('Chave inválida');
  });
  test('Caso 2.4: verificar se chave é inválida, espaços inseridos',
  () => {
      expect(PIX.validarChave('82 98800 8800')).toBe('Chave inválida');
  });


  test('Caso 3.1: verificar se o limite de transferência é válido',
  () => {
    expect(PIX.validarValor(500)).toBe(true);
  });

  test('Caso 3.2: verificar se o limite de transferência está acima do permitido',
  () => {
    expect(PIX.validarValor(1500)).toBe('Valor acima do permitido');
  });
  test('Caso 3.3: verificar se o valor de transferência é inválido',
  () => {
    expect(PIX.validarValor(0)).toBe('Valor inválido');
  });


  test('Caso 4.1: verificar se PIX foi realizado com sucesso',
  () => {
    expect(PIX.realizarPix(1, '82988008800', 500)).toBe('PIX realizado com sucesso!');
  });
  test('Caso 4.2: verificar se PIX não foi realizado por causa de chave inválida',
  () => {
    expect(PIX.realizarPix(1, '82 9988-8800', 500)).toBe('Chave inválida');
  });
  test('Caso 4.3: verificar se PIX não foi realizado por causa de sessão expirada',
  () => {
    expect(PIX.realizarPix(0, '82988008800', 500)).toBe('Usuário deslogado');
  });
  test('Caso 4.4: verificar se PIX não foi realizado por causa de valor negativo',
  () => {
    expect(PIX.realizarPix(1, '82988008800', '-50')).toBe('Valor inválido');
  });
  test('Caso 4.5: verificar se PIX não foi realizado por causa de campo vazio',
  () => {
    expect(PIX.realizarPix(1, '82988008800', '')).toBe('Valor inválido');
  });
});