// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // Get elements
  const artCards = document.querySelectorAll('.art-card');
  const modal = document.getElementById('art-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.querySelector('.close-btn');

  // Add click event listener to each artwork card
  artCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.getAttribute('data-title') || '';
      const desc = card.getAttribute('data-desc') || '';

      // Display modal
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalCaption.innerHTML = `<h2>${title}</h2><p>${desc}</p>`;
    });
  });

  // Close modal when clicking on the 'X' button
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking anywhere outside the modal image
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

});