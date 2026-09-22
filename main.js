const walletBtn = document.getElementById("wallet-btn");
const claimBtn = document.getElementById("claim-btn");
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("main-nav");
const tickerTrack = document.getElementById("ticker-track");
const tabs = document.querySelectorAll(".tab");
const tiles = document.querySelectorAll(".tile");
const gameModal = document.getElementById("game-modal");
const bonusModal = document.getElementById("bonus-modal");

let connected = false;
let bonusClaimed = false;

function openModal(modal) {
  closeModals();
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModals() {
  document.querySelectorAll(".modal").forEach((m) => m.classList.remove("open"));
  document.body.style.overflow = "";
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) closeModals();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
});

walletBtn.addEventListener("click", () => {
  if (connected) return;
  connected = true;
  walletBtn.textContent = "CONNECTED";
  walletBtn.classList.add("chip");
  claimBtn.hidden = false;
});

claimBtn.addEventListener("click", () => {
  if (bonusClaimed) return;
  bonusClaimed = true;
  claimBtn.disabled = true;
  claimBtn.textContent = "BONUS CLAIMED";
  openModal(bonusModal);
});

tiles.forEach((tile) => {
  tile.addEventListener("click", () => openModal(gameModal));
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const filter = tab.dataset.filter;
    tiles.forEach((tile) => {
      tile.style.display =
        filter === "all" || tile.dataset.category === filter ? "" : "none";
    });
  });
});

hamburger.addEventListener("click", () => nav.classList.toggle("nav-open"));

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => nav.classList.remove("nav-open"))
);

tickerTrack.innerHTML += tickerTrack.innerHTML;
