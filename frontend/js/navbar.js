// inject navbar into every page
const navContainer = document.getElementById('navbar');
if (navContainer) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  navContainer.innerHTML = `
    <nav>
      <div class="logo">SkillEndorse</div>
      <div class="links">
        <a href="dashboard.html">Dashboard</a>
        <a href="skills.html">My Skills</a>
        <!--<a href="users.html">Users</a>-->
      </div>
      <div class="user-info">
        ${user ? user.name : ''}
        ${user ? '<button id="logoutBtn">Logout</button>' : ''}
      </div>
    </nav>
  `;
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location = 'login.html';
  });
}
