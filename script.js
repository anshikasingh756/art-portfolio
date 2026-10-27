document.addEventListener('DOMContentLoaded', () => {
  const pageLeaves = document.querySelectorAll('.page-leaf');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const pageCounter = document.getElementById('page-counter');

  let currentLeaf = 0;
  const totalLeaves = pageLeaves.length;

  function updatePageFlips() {
    pageLeaves.forEach((leaf, idx) => {
      if (idx < currentLeaf) {
        leaf.classList.add('flipped');
        leaf.style.zIndex = idx + 1;
      } else {
        leaf.classList.remove('flipped');
        leaf.style.zIndex = totalLeaves - idx;
      }
    });

    const activePageNum = currentLeaf + 1;
    pageCounter.textContent = `Page ${activePageNum} of ${totalLeaves}`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentLeaf < totalLeaves) {
      currentLeaf++;
      updatePageFlips();
    } else {
      currentLeaf = 0; // Loop to start
      updatePageFlips();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentLeaf > 0) {
      currentLeaf--;
      updatePageFlips();
    } else {
      currentLeaf = totalLeaves; // Loop to end
      updatePageFlips();
    }
  });

  // Lightbox Modal
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeLightbox = document.querySelector('.close-lightbox');

  document.querySelectorAll('.art-card').forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;

    card.addEventListener('click', (e) => {
      e.stopPropagation();
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

  updatePageFlips();
});