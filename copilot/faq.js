document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const isActive = content.style.display === 'block';

    document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');

    if (!isActive) {
      content.style.display = 'block';
    }
  });
});
