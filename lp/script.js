// faq

document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".perguntas");

  faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
      // Trocar a classe 'open' e 'close' na div de respostas
      const answer = this.nextElementSibling;
      answer.classList.toggle("open");
      answer.classList.toggle("close");

      // Adicionar a classe .borda-open às divs .faq-X quando a resposta estiver aberta
      const faqDiv = this.closest(".faq-1, .faq-2, .faq-3, .faq-4");
      if (faqDiv && answer.classList.contains("open")) {
        faqDiv.classList.add("borda-open");
      } else {
        // Se a resposta estiver fechada, remover a classe .borda-open
        faqDiv.classList.remove("borda-open");
      }

      // Adicionar propriedades CSS às divs .faq-X quando a resposta estiver aberta
      if (faqDiv && answer.classList.contains("open")) {
        faqDiv.style.borderRadius = "14px";
        faqDiv.style.border = "2px solid #FED30D";
      } else {
        // Se a resposta estiver fechada, reverter as propriedades CSS
        faqDiv.style.borderRadius = "";
        faqDiv.style.border = "";
      }

      // Trocar a imagem
      const icon = this.querySelector("img");
      if (icon.src.includes("open.svg")) {
        icon.src = "/lp/img/close.svg";
      } else {
        icon.src = "/lp/img/open.svg";
      }
    });
  });
});

//faq mobile

let divAtual = null; // Armazenar a div atualmente aberta

// Função para fechar a div anteriormente aberta e remover a borda
function fecharDivAnterior() {
  if (divAtual) {
    divAtual.classList.remove("borda-mobile");
    const answerDiv = divAtual.querySelector(".answer");
    answerDiv.classList.remove("abrir");
    answerDiv.classList.add("fechar");

    // Troca a src da imagem
    const img = divAtual.querySelector("img");
    const currentSrc = img.getAttribute("src");
    const newSrc = currentSrc.includes("open.svg")
      ? "/lp/img/close.svg"
      : "/lp/img/open.svg";
    img.setAttribute("src", newSrc);
  }
}

// Função para manipular o clique na imagem
function toggleFAQ(element) {
  // Obtém o contêiner pai da imagem clicada
  const perguntaContainer = element.closest(
    ".pergunta-1, .pergunta-2, .pergunta-3, .pergunta-4"
  );

  // Obtém a div .answer dentro do contêiner pai
  const answerDiv = perguntaContainer.querySelector(".answer");

  // Fecha a div anteriormente aberta e remove a borda
  fecharDivAnterior();

  // Se a div clicada for diferente da div atualmente aberta, abre a nova
  if (perguntaContainer !== divAtual) {
    // Troca a src da imagem da div clicada
    const currentSrc = element.getAttribute("src");
    const newSrc = currentSrc.includes("open.svg")
      ? "/lp/img/close.svg"
      : "/lp/img/open.svg";
    element.setAttribute("src", newSrc);

    // Verifica e troca as classes .abrir e .fechar na div .answer
    answerDiv.classList.toggle("abrir");
    answerDiv.classList.toggle("fechar");

    // Adiciona/remover classes na div pai conforme necessário
    perguntaContainer.classList.toggle("borda-mobile");

    // Atualiza a div atualmente aberta
    divAtual = perguntaContainer;
  } else {
    // Se a div clicada for a mesma da div atualmente aberta, fecha-a
    divAtual = null;
  }
}

// Adiciona eventos de clique nas imagens
document
  .querySelectorAll(
    ".pergunta-1 img, .pergunta-2 img, .pergunta-3 img, .pergunta-4 img"
  )
  .forEach((img) => {
    img.addEventListener("click", function () {
      // Chama a função para manipular a div .answer e a div pai
      toggleFAQ(this);
    });
  });

// carrossel mobile

let currentIndex = 0;
const totalItems = document.querySelectorAll(".carousel-item").length;
let Intervalo;
let ToqueX;

function showSlide(index) {
  const wrapper = document.getElementById("carousel-wrapper");
  const itemWidth = document.querySelector(".carousel-item").offsetWidth;
  const newPosition = -index * itemWidth;
  wrapper.style.transform = `translateX(${newPosition}px)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalItems;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  showSlide(currentIndex);
}

function startScroll() {
  Intervalo = setInterval(() => {
    nextSlide();
  }, 3000);
}

function pauseScroll() {
  clearInterval(Intervalo);
}

function startTouch(event) {
  ToqueX = event.touches[0].clientX;
  pauseScroll();
}

function endTouch(event) {
  const touchEndX = event.changedTouches[0].clientX;
  const threshold = 50;

  if (ToqueX - touchEndX > threshold) {
    nextSlide();
  } else if (touchEndX - ToqueX > threshold) {
    prevSlide();
  }

  startScroll();
}

// Inicia a rolagem automática ao carregar a página
window.onload = startScroll;

// depoimento clientes

let slider = 0;
let intervalId;
let touchStartX;

function showReview(index) {
  const reviewsContainer = document.querySelector(".reviews-container");
  const paginationDots = document.querySelectorAll(".pagination-dot");

  slider = index;
  const newPosition = -index * 100 + "%";
  reviewsContainer.style.transform = `translateX(${newPosition})`;

  paginationDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function startScroll() {
  intervalId = setInterval(() => {
    slider = (slider + 1) % 3; // Assumindo que há 3 reviews, ajuste conforme necessário
    showReview(slider);
  }, 3000);
}

function pauseScroll() {
  clearInterval(intervalId);
}

function startTouch(event) {
  touchStartX = event.touches[0].clientX;
  pauseScroll();
}

function endTouch() {
  const touchEndX = event.changedTouches[0].clientX;
  const threshold = 50;

  if (touchStartX - touchEndX > threshold) {
    slider = (slider + 1) % 3; // Assumindo que há 3 reviews, ajuste conforme necessário
  } else if (touchEndX - touchStartX > threshold) {
    slider = (slider - 1 + 3) % 3; // Assumindo que há 3 reviews, ajuste conforme necessário
  }

  showReview(slider);
  startScroll();
}

// Inicia a rolagem automática ao carregar a página
window.onload = startScroll;
