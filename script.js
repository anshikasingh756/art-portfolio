document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.sketchbook-page');
  const nextBtn = document.getElementById('next-page-btn');
  const prevBtn = document.getElementById('prev-page-btn');
  const pageCounter = document.getElementById('page-counter');
  
  let currentIndex = 0;
  const totalPages = pages.length;

  function showPage(index) {
    pages.forEach((page, i) => {
      if (i === index) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
    pageCounter.textContent = `Page ${index + 1} of ${totalPages} Spreads`;
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalPages;
    showPage(currentIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalPages) % totalPages;
    showPage(currentIndex);
  });

  // Lightbox Modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeModal = document.querySelector('.close-modal');

  document.querySelectorAll('.art-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');

      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});