// Função para verificar se o elemento está visível na tela
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

// Função para verificar a visibilidade dos elementos
function handleScroll() {
  const features = document.querySelectorAll('.feature');
  features.forEach((feature) => {
    if (isInViewport(feature)) {
      feature.classList.add('visible'); // Adiciona a classe 'visible' quando o elemento entra na tela
    } else {
      feature.classList.remove('visible'); // Remove a classe 'visible' se o elemento sair da tela
    }
  });
}

// Adiciona o evento de scroll na janela para monitorar a rolagem
window.addEventListener('scroll', handleScroll);

// Chama a função uma vez para verificar a visibilidade inicial dos elementos
handleScroll();
