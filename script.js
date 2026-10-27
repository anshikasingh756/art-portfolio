document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const pageCounter = document.getElementById('page-counter');
  
  let currentIdx = 0;
  const totalPages = pages.length;

  function updateSketchbook() {
    pages.forEach((page, idx) => {
      if (idx === currentIdx) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
    pageCounter.textContent = `Page ${currentIdx + 1} of ${totalPages}`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIdx < totalPages - 1) {
      currentIdx++;
      updateSketchbook();
    } else {
      currentIdx = 0; // Loop back to start
      updateSketchbook();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIdx > 0) {
      currentIdx--;
      updateSketchbook();
    } else {
      currentIdx = totalPages - 1; // Loop to end
      updateSketchbook();
    }
  });

  // Lightbox View Logic
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeLightbox = document.querySelector('.close-lightbox');

  document.querySelectorAll('.art-card').forEach(card => {
    const img = card.querySelector('img');
    if (!img) return; // Skip text-only notes

    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title') || 'Artwork';
      const desc = card.getAttribute('data-desc') || '';

      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
    });
  });

  closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  updateSketchbook();
});