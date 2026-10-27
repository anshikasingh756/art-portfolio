document.addEventListener('DOMContentLoaded', () => {

  // 1. Page Turning Logic
  const pages = document.querySelectorAll('.notebook-page');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const pageIndicator = document.getElementById('page-indicator');
  
  let currentPage = 0;
  const totalPages = pages.length;

  function updateBook() {
    pages.forEach((page, index) => {
      if (index === currentPage) {
        page.classList.add('active-page');
      } else {
        page.classList.remove('active-page');
      }
    });
    pageIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
    
    // Disable/Enable buttons contextually
    prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
  }

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateBook();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateBook();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  updateBook(); // Initialize first page view

  // 2. Lightbox Modal Logic
  const artCards = document.querySelectorAll('.art-card');
  const modal = document.getElementById('art-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.querySelector('.close-btn');

  artCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.getAttribute('data-title') || '';
      const desc = card.getAttribute('data-desc') || '';

      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalCaption.innerHTML = `<h2 class="handwritten" style="font-size: 2rem;">${title}</h2><p>${desc}</p>`;
    });
  });

  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

});