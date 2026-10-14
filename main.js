document.addEventListener("DOMContentLoaded", () => {
  // Marca o link da página atual, mesmo quando a página está dentro de /html.
  const currentPath = window.location.pathname.replace(/\/+$/, "");
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    const linkUrl = new URL(href, window.location.href);
    if (linkUrl.pathname.replace(/\/+$/, "") === currentPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Busca de vagas por cargo/área e cidade.
  const searchInput = document.querySelector("#jobSearch");
  const locationInput = document.querySelector("#locationSearch");
  const jobCards = Array.from(document.querySelectorAll("[data-job-card]"));
  const noResults = document.querySelector("#noResults");

  function filterJobs() {
    if (!jobCards.length) return;

    const term = (searchInput?.value || "").trim().toLocaleLowerCase("pt-BR");
    const city = (locationInput?.value || "").trim().toLocaleLowerCase("pt-BR");
    let visibleCount = 0;

    jobCards.forEach((card) => {
      const jobText = (card.textContent || "").toLocaleLowerCase("pt-BR");
      const matchesTerm = !term || jobText.includes(term);
      const matchesCity = !city || jobText.includes(city);
      const visible = matchesTerm && matchesCity;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    if (noResults) noResults.hidden = visibleCount !== 0;
  }

  searchInput?.addEventListener("input", filterJobs);
  locationInput?.addEventListener("input", filterJobs);
  filterJobs();

  // Formulários de demonstração: valida os campos e mostra feedback.
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const message = form.querySelector("[data-form-message]");
      if (message) {
        message.textContent =
          "Tudo certo! O formulário foi validado, mas esta versão demonstrativa não envia nem salva os dados.";
      } else {
        window.alert(
          "Tudo certo! O formulário foi validado, mas esta versão demonstrativa não envia nem salva os dados."
        );
      }
      form.reset();
    });
  });

  // Atualiza automaticamente o ano no rodapé.
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});
