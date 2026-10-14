document.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const target = link.getAttribute("href");
    if (target && target.endsWith(currentPage)) link.classList.add("active");
  });

  // Busca e filtros da página de vagas
  const searchInput = document.querySelector("#jobSearch");
  const locationInput = document.querySelector("#locationSearch");
  const jobCards = [...document.querySelectorAll("[data-job-card]")];
  const noResults = document.querySelector("#noResults");
  const filterJobs = () => {
    if (!jobCards.length) return;
    const term = (searchInput?.value || "").trim().toLowerCase();
    const city = (locationInput?.value || "").trim().toLowerCase();
    let visible = 0;
    jobCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const matches = text.includes(term) && text.includes(city);
      card.hidden = !matches;
      if (matches) visible++;
    });
    if (noResults) noResults.hidden = visible > 0;
  };
  searchInput?.addEventListener("input", filterJobs);
  locationInput?.addEventListener("input", filterJobs);

  // Formulários demonstrativos: não enviam dados a um servidor.
  document.querySelectorAll("[data-demo-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const message = form.querySelector("[data-form-message]");
      if (message) message.textContent = "Formulário validado! Este é um modelo demonstrativo e ainda não envia dados para um servidor.";
      else alert("Formulário validado! Este é um modelo demonstrativo.");
      form.reset();
    });
  });

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});
