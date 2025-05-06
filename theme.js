// theme.js
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-mode');
      if (themeSwitch) themeSwitch.checked = true;
    }
    
    // Theme switch event
    if (themeSwitch) {
      themeSwitch.addEventListener('change', function() {
        if (this.checked) {
          body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
        } else {
          body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  });