const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");

if (year) year.textContent = new Date().getFullYear();

if (toggle && nav) {
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "메뉴 열기");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 980) closeMenu(); });
}


const inquiryTabs = [...document.querySelectorAll("[data-inquiry-tab]")];
const inquiryPanels = [...document.querySelectorAll("[data-inquiry-panel]")];

if (inquiryTabs.length && inquiryPanels.length) {
  inquiryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.inquiryTab;

      inquiryTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      inquiryPanels.forEach((panel) => {
        const active = panel.dataset.inquiryPanel === target;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });
}

document.querySelectorAll("[data-mail-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const lines = [];

    formData.forEach((value, key) => {
      lines.push(`${key}: ${value}`);
    });

    const subject = form.dataset.subject || "[AM INTERNATIONAL] 문의";
    const body = lines.join("\n");
    const mailto = `mailto:aminter0215@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
});
