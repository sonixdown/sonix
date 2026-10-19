document.querySelectorAll(".site-header").forEach((header) => {
  const toggle = header.querySelector(".site-header-toggle");
  const navigation = header.querySelector(".site-header-nav");

  if (!toggle || !navigation) {
    return;
  }

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    toggle.querySelector("[aria-hidden='true']").textContent = open ? "×" : "☰";
    navigation.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (toggle.getAttribute("aria-expanded") === "true" && !header.contains(event.target)) {
      setOpen(false);
    }
  });
});
