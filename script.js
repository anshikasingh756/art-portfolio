document.addEventListener('DOMContentLoaded', () => {

  // 1. Lightbox Modal Interaction
  const artCards = document.querySelectorAll('.art-card');
  const modal = document.getElementById('art-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.querySelector('.close-btn');

  artCards.forEach(card => {
    // Open image in lightbox modal on click (if not dragged)
    let isDragging = false;
    
    card.addEventListener('mousedown', () => { isDragging = false; });
    card.addEventListener('mousemove', () => { isDragging = true; });

    card.addEventListener('click', () => {
      if (!isDragging) {
        const img = card.querySelector('img');
        const title = card.getAttribute('data-title') || '';
        const desc = card.getAttribute('data-desc') || '';

        modal.style.display = 'flex';
        modalImg.src = img.src;
        modalCaption.innerHTML = `<h2 class="handwritten" style="font-size: 2.2rem;">${title}</h2><p>${desc}</p>`;
      }
    });
  });

  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // 2. Scrapbook Drag-and-Drop System
  const draggables = document.querySelectorAll('.draggable');
  let topZIndex = 10;

  draggables.forEach(item => {
    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

    item.addEventListener('mousedown', dragMouseDown);

    function dragMouseDown(e) {
      e.preventDefault();
      // Bring clicked item to front
      topZIndex++;
      item.style.zIndex = topZIndex;

      mouseX = e.clientX;
      mouseY = e.clientY;

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();
      posX = mouseX - e.clientX;
      posY = mouseY - e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      item.style.position = 'relative';
      item.style.top = (item.offsetTop - posY) + 'px';
      item.style.left = (item.offsetLeft - posX) + 'px';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  });

});