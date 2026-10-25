const pageFiles = Array.from({length: 11}, (_, i) => `assets/page-${String(i + 1).padStart(2, '0')}.jpg`);
const pageNames = ['Sampul', 'Lembar pertama · awal cerita', 'Lembar pertama · mengenal kamu', 'Lembar pertama · momen kita', 'Lembar kedua · bertumbuh', 'Lembar memori', 'Siti Zahrah Aulia', 'Hal yang kamu ajarin', 'Sebelum hidup membawa kita', 'Ke mana pun hidup membawa kamu', 'Versi kita favoritku'];
let currentPage = 0;
const bookPage = document.getElementById('bookPage');
const pageCount = document.getElementById('pageCount');
const pageTitle = document.getElementById('pageTitle');
const progressBar = document.getElementById('progressBar');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const prevText = document.getElementById('prevText');
const nextText = document.getElementById('nextText');
const thumbnails = document.getElementById('thumbnails');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}
function renderPage(index) {
  currentPage = Math.max(0, Math.min(pageFiles.length - 1, index));
  bookPage.src = pageFiles[currentPage];
  bookPage.alt = `Halaman ${currentPage + 1} dari buku Before We Become Memories`;
  pageCount.textContent = `PAGE ${currentPage + 1} OF ${pageFiles.length}`;
  pageTitle.textContent = pageNames[currentPage];
  progressBar.style.width = `${((currentPage + 1) / pageFiles.length) * 100}%`;
  prevPage.disabled = prevText.disabled = currentPage === 0;
  nextPage.disabled = nextText.disabled = currentPage === pageFiles.length - 1;
  [...thumbnails.children].forEach((thumb, i) => {
    if (i === currentPage) thumb.setAttribute('aria-current', 'true');
    else thumb.removeAttribute('aria-current');
  });
  const activeThumb = thumbnails.children[currentPage];
  if (activeThumb) activeThumb.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
}
pageFiles.forEach((src, i) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'thumb';
  button.setAttribute('aria-label', `Buka halaman ${i + 1}`);
  button.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
  button.addEventListener('click', () => renderPage(i));
  thumbnails.appendChild(button);
});
prevPage.addEventListener('click', () => renderPage(currentPage - 1));
nextPage.addEventListener('click', () => renderPage(currentPage + 1));
prevText.addEventListener('click', () => renderPage(currentPage - 1));
nextText.addEventListener('click', () => renderPage(currentPage + 1));
document.getElementById('startReading').addEventListener('click', () => document.getElementById('the-book').scrollIntoView({behavior: 'smooth'}));
document.getElementById('backToTop').addEventListener('click', () => document.getElementById('home').scrollIntoView({behavior: 'smooth'}));
function openZoom() {
  lightboxImage.src = pageFiles[currentPage];
  lightboxCaption.textContent = `PAGE ${currentPage + 1} OF ${pageFiles.length} · ${pageNames[currentPage]}`;
  if (typeof lightbox.showModal === 'function') lightbox.showModal();
  else window.open(pageFiles[currentPage], '_blank', 'noopener');
}
document.getElementById('zoomPage').addEventListener('click', openZoom);
document.getElementById('closeLightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
document.addEventListener('keydown', (event) => {
  if (lightbox.open) return;
  if (event.key === 'ArrowLeft') renderPage(currentPage - 1);
  if (event.key === 'ArrowRight') renderPage(currentPage + 1);
});
renderPage(0);

const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicText = document.getElementById('musicText');
const musicIcon = document.getElementById('musicIcon');
musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicText.textContent = 'Pause music';
      musicIcon.textContent = 'Ⅱ';
      musicToggle.setAttribute('aria-pressed', 'true');
    } catch (error) {
      showToast('Tambahkan file musik bernama music.mp3 ke folder assets untuk mengaktifkan musik ♡');
    }
  } else {
    music.pause();
    musicText.textContent = 'Play music';
    musicIcon.textContent = '♫';
    musicToggle.setAttribute('aria-pressed', 'false');
  }
});
music.addEventListener('ended', () => { musicText.textContent = 'Play music'; musicIcon.textContent = '♫'; musicToggle.setAttribute('aria-pressed', 'false'); });
