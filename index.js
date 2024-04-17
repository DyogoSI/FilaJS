let minhaFila = new FilaCircular(5);

// Função para adicionar um elemento à fila
function adicionarElemento() {
  const nome = document.getElementById("txtnovoNome").value;
  const cpf = document.getElementById("txtBuscarCpf").value;
  if (nome === "" || cpf === "") {
    alert("Preencha todos os campos antes de adicionar à fila!");
    return;
  }
  const novoAtendimento = new Atendimento();
  novoAtendimento.nome = nome;
  novoAtendimento.cpf = cpf;
  novoAtendimento.data = obterDataAtual();
  novoAtendimento.hora = obterHoraAtual();
  if (minhaFila.enqueue(novoAtendimento)) {
    atualizarFila();
  } else {
    alert("A fila está cheia!");
  }
}

// Função para remover o primeiro elemento da fila
function removerElemento() {
  if (!minhaFila.isEmpty()) {
    const pessoaAtendida = minhaFila.dequeue();
    mostrarMensagemRemocao(pessoaAtendida);
    atualizarFila();
  } else {
    alert("A fila está vazia!");
  }
}

// Função para buscar um CPF na fila
function buscarCpf() {
  const cpfBusca = document.getElementById("txtBuscarCpf").value;
  let posicao = 1; // Variável para controlar a posição do CPF na fila
  for (const elemento of minhaFila.elementos) {
    if (elemento && elemento.cpf === cpfBusca) { // Verifica se o elemento não é nulo antes de comparar o CPF
      alert(`CPF encontrado na fila! Posição ${posicao}`);
      return;
    }
    posicao++; // Incrementa a posição para o próximo elemento na fila
  }
  alert("CPF não encontrado na fila!");
}

// Função para mostrar a mensagem de remoção
function mostrarMensagemRemocao(pessoaAtendida) {
  const mensagemRemocao = document.getElementById("mensagem-remocao");
  const horaAtual = obterHoraAtual();
  const tempoChegada = `${pessoaAtendida.data} ${pessoaAtendida.hora}`;
  const tempoAtendimento = `${obterDataAtual()} ${horaAtual}`;
  let tempoEspera = calcularDiferencaHoras(tempoChegada, tempoAtendimento);

  if (tempoEspera !== 'NaN:NaN:NaN') {
    mensagemRemocao.textContent = `Chamando para ser atendido(a): ${pessoaAtendida.nome}, chegou às ${pessoaAtendida.hora} está sendo atendido(a) às ${horaAtual}. Tempo de espera: ${tempoEspera}`;
  } else {
    mensagemRemocao.textContent = `Chamando para ser atendido(a): ${pessoaAtendida.nome}, chegou às ${pessoaAtendida.hora} está sendo atendido(a) às ${horaAtual}.`;
  }
}

// Função para atualizar a exibição da fila
function atualizarFila() {
  const lblPessoasFila = document.getElementById("lblPessoasFila");
  const listFila = document.getElementById("listFila");
  if (!minhaFila.isEmpty()) {
    lblPessoasFila.textContent = "Pessoas na fila:";
    listFila.innerHTML = "";
    for (const elemento of minhaFila) {
      const li = document.createElement("li");
      li.textContent = `${elemento.nome} - ${elemento.data} ${elemento.hora}`;
      listFila.appendChild(li);
    }
  } else {
    lblPessoasFila.textContent = "Fila vazia!";
    listFila.innerHTML = "";
  }
}

// Função para obter a data atual formatada
function obterDataAtual() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
  let ano = dataAtual.getFullYear();
  // Formata a data como "dd/mm/aaaa"
  let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  return dataFormatada;
}
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}

// Função para calcular a diferença de horas entre duas horas no formato HH:mm:ss
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);

  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}