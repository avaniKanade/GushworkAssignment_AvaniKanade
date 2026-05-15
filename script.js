const stickyTop = document.getElementById("stickyTop");
const hero = document.getElementById("hero");
const mainImage = document.getElementById("mainImage");
const zoomBox = document.getElementById("zoomBox");
const thumbs = [...document.querySelectorAll(".thumb")];
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

let activeIndex = 0;

function updateStickyHeader() {
  if (!hero || !stickyTop) return;
  const trigger = hero.offsetTop + hero.offsetHeight - 160;
  const show = window.scrollY > trigger;
  stickyTop.classList.toggle("visible", show);
  document.body.classList.toggle("show-sticky", show);
  stickyTop.setAttribute("aria-hidden", String(!show));
}

function setHeroImage(index) {
  activeIndex = (index + thumbs.length) % thumbs.length;
  const nextSrc = thumbs[activeIndex].dataset.image;
  mainImage.src = nextSrc;
  thumbs.forEach((thumb, idx) => thumb.classList.toggle("active", idx === activeIndex));
}

thumbs.forEach((thumb, idx) => {
  thumb.addEventListener("click", () => setHeroImage(idx));
});

heroPrev.addEventListener("click", () => setHeroImage(activeIndex - 1));
heroNext.addEventListener("click", () => setHeroImage(activeIndex + 1));

function zoomOnHover(event) {
  const rect = mainImage.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  zoomBox.style.backgroundImage = `url('${mainImage.src}')`;
  zoomBox.style.backgroundSize = "260%";
  zoomBox.style.backgroundPosition = `${x}% ${y}%`;
  zoomBox.classList.add("active");
}

function hideZoom() {
  zoomBox.classList.remove("active");
}

mainImage.addEventListener("mouseenter", zoomOnHover);
mainImage.addEventListener("mousemove", zoomOnHover);
mainImage.addEventListener("mouseleave", hideZoom);

window.addEventListener("scroll", updateStickyHeader, { passive: true });
window.addEventListener("resize", updateStickyHeader);
window.addEventListener("load", () => {
  setHeroImage(0);
  updateStickyHeader();
});
