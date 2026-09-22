// ==========================================================================
// MOBILE LOGIC SCRIPT (mobile-script.js)
// Handles: Mobile Header Collapse/Expand & Dock Active States
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const collapseBtn = document.getElementById('headerCollapseToggle');
  const mainHeader = document.getElementById('mainHeader');

  // Toggle Header function
  if (collapseBtn && mainHeader) {
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mainHeader.classList.contains('header--collapsed')) {
        mainHeader.classList.remove('header--collapsed');
        mainHeader.classList.add('header--expanded');
      } else {
        mainHeader.classList.remove('header--expanded');
        mainHeader.classList.add('header--collapsed');
      }
    });
  }

  // Mobile Bottom Dock active sync with views
  const mobileDockItems = document.querySelectorAll('.mobile-dock__item');
  mobileDockItems.forEach(item => {
    item.addEventListener('click', function () {
      mobileDockItems.forEach(btn => btn.classList.remove('mobile-dock__item--active'));
      this.classList.add('mobile-dock__item--active');
    });
  });
});
