// Proteção de rota: sem token, volta ao login
if (!localStorage.getItem('token')) {
  window.location.href = 'index.html';
}

// js/home.js — Carrega os dados analíticos e constrói o dashboard
fetch('js/dados_dashboard.json')
  .then(resposta => {
    if (!resposta.ok) {
      throw new Error('Falha na requisição dos dados do dashboard');
    }
    return resposta.json();
  })
  .then(dados => {
    // 1. Cartões de KPI
    document.getElementById('kpi-acidentes').textContent =
      dados.kpis.totalAcidentes.toLocaleString('pt-BR');
    document.getElementById('kpi-mortos').textContent =
      dados.kpis.totalMortos.toLocaleString('pt-BR');
    document.getElementById('kpi-media').textContent =
      dados.kpis.mediaMortosPorAcidente.toFixed(3).replace('.', ',');

    // 2. Gráfico de Linha — Evolução mensal (jan–ago 2026)
    const ctxLinha = document.getElementById('graficoMensal').getContext('2d');
    new Chart(ctxLinha, {
      type: 'line',
      data: {
        labels: dados.porMes.map(item => item.nome),
        datasets: [{
          label: 'Acidentes por mês',
          data: dados.porMes.map(item => item.acidentes),
          borderColor: '#1a1a1a',
          backgroundColor: '#1a1a1a',
          tension: 0.3,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });

    // 3. Gráfico de Barras Horizontais — Top 10 UFs
    const ctxBarra = document.getElementById('graficoUf').getContext('2d');
    new Chart(ctxBarra, {
      type: 'bar',
      data: {
        labels: dados.porUf.map(item => item.uf),
        datasets: [{
          label: 'Acidentes por estado',
          data: dados.porUf.map(item => item.acidentes),
          backgroundColor: '#424242'
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });

        // 4. Gráfico de Barras — Vítimas fatais por dia da semana
    const ctxDia = document.getElementById('graficoDia').getContext('2d');
    new Chart(ctxDia, {
      type: 'bar',
      data: {
        labels: dados.porDia.map(item => item.dia),
        datasets: [{
          label: 'Mortos por dia da semana',
          data: dados.porDia.map(item => item.mortos),
          backgroundColor: '#757575'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  })
  .catch(erro => {
    console.error('Erro ao renderizar o dashboard:', erro);
  });

const nomeSalvo = localStorage.getItem('nomeUsuario');
const spanNome = document.getElementById('nome-usuario');
if (spanNome && nomeSalvo) {
  spanNome.textContent = nomeSalvo;
}

  // ===== Logout: limpa a sessão e volta ao login =====
const btnLogout = document.getElementById('btn-logout');

btnLogout.addEventListener('click', () => {
  // 1. Limpa os dados de sessão salvos no navegador
  localStorage.removeItem('token');
  localStorage.removeItem('nomeUsuario');
  sessionStorage.clear();

  // 2. Redireciona para a página de login
  window.location.href = 'index.html';
});