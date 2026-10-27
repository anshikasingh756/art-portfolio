document.addEventListener('DOMContentLoaded', () => {

  // Multi-Sketchbook Data Structure (Put your own image paths here!)
  const sketchbooks = [
    {
      id: 0,
      title: "Digital Art 2026",
      pages: [
        "https://via.placeholder.com/800x1000/1e2640/ffffff?text=Page+1+Artwork",
        "https://via.placeholder.com/800x1000/2d3748/ffffff?text=Page+2+Artwork",
        "https://via.placeholder.com/800x1000/4a5568/ffffff?text=Page+3+Artwork",
        "https://via.placeholder.com/800x1000/718096/ffffff?text=Page+4+Artwork"
      ]
    },
    {
      id: 1,
      title: "Fabric & Traditional",
      pages: [
        "https://via.placeholder.com/800x1000/2a2220/ffffff?text=Saree+Painting+1",
        "https://via.placeholder.com/800x1000/433835/ffffff?text=Fabric+Detail+2"
      ]
    },
    {
      id: 2,
      title: "Graphic Design",
      pages: [
        "https://via.placeholder.com/800x1000/1c1f26/ffffff?text=Gradient+Concept",
        "https://via.placeholder.com/800x1000/2d3748/ffffff?text=Brochure+Layout"
      ]
    }
  ];

  let currentBookIdx = 0;
  let currentLeafIdx = 0;
  let totalLeaves = 0;

  const libraryView = document.getElementById('library-view');
  const viewerView = document.getElementById('viewer-view');
  const bookContainer = document.getElementById('book-3d');
  const bookTitle = document.getElementById('book-title');
  const pageIndicator = document.getElementById('page-indicator');
  const shelfBtn = document.getElementById('shelf-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  // Load a Sketchbook into the 3D Viewer
  function loadBook(bookIndex) {
    currentBookIdx = bookIndex;
    const book = sketchbooks[bookIndex];
    bookTitle.textContent = book.title;

    bookContainer.innerHTML = '';
    const images = book.pages;
    totalLeaves = Math.ceil(images.length / 2);

    for (let i = 0; i < totalLeaves; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'page-leaf';
      leaf.style.zIndex = totalLeaves - i;

      const frontImgSrc = images[i * 2] || '';
      const backImgSrc = images[i * 2 + 1] || '';

      leaf.innerHTML = `
        <div class="page-side front">
          ${frontImgSrc ? `<div class="page-image-container"><img src="${frontImgSrc}" alt="Art"></div>` : ''}
        </div>
        <div class="page-side back">
          ${backImgSrc ? `<div class="page-image-container"><img src="${backImgSrc}" alt="Art"></div>` : ''}
        </div>
      `;

      bookContainer.appendChild(leaf);
    }

    currentLeafIdx = 0;
    updatePageFlips();
    bindImageModals();
  }

  function updatePageFlips() {
    const leaves = bookContainer.querySelectorAll('.page-leaf');
    leaves.forEach((leaf, idx) => {
      if (idx < currentLeafIdx) {
        leaf.classList.add('flipped');
        leaf.style.zIndex = idx + 1;
      } else {
        leaf.classList.remove('flipped');
        leaf.style.zIndex = totalLeaves - idx;
      }
    });

    const activePage = currentLeafIdx + 1;
    pageIndicator.textContent = `Spread ${activePage} of ${totalLeaves}`;
  }

  // Navigation Event Listeners
  nextBtn.addEventListener('click', () => {
    if (currentLeafIdx < totalLeaves) {
      currentLeafIdx++;
      updatePageFlips();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentLeafIdx > 0) {
      currentLeafIdx--;
      updatePageFlips();
    }
  });

  // Toggle Library Shelf / Viewer
  shelfBtn.addEventListener('click', () => {
    libraryView.classList.toggle('hidden');
    viewerView.classList.toggle('hidden');
  });

  document.querySelectorAll('.book-cover-item').forEach(item => {
    item.addEventListener('click', () => {
      const bookIdx = parseInt(item.getAttribute('data-book'));
      loadBook(bookIdx);
      libraryView.classList.add('hidden');
      viewerView.classList.remove('hidden');
    });
  });

  // Fullscreen Image Lightbox
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeModal = document.querySelector('.close-modal');

  function bindImageModals() {
    document.querySelectorAll('.page-image-container img').forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = 'flex';
        modalImg.src = img.src;
      });
    });
  }

  closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
  modal.addEventListener('click', () => { modal.style.display = 'none'; });

  // Keyboard Arrow Controls
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  // Initialize with First Book
  loadBook(0);
});