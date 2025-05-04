(async function(){
    const token = localStorage.getItem('token');
    if (!token) return window.location='login.html';
  
    const res = await fetch(
      'https://skill-endorsement-platform-backend.onrender.com/api/users',
      { headers:{ 'Authorization':'Bearer '+token }}
    );
    const users = await res.json();

const me = JSON.parse(localStorage.getItem('user'));
const others = users.filter(u => u._id !== me._id && u.name && u.name.trim() !== '');

const grid = document.querySelector('.user-grid');
others.forEach(u => {
  const card = document.createElement('div');
  card.className = 'user-card';
  const countSkills = u.skills?.length || 0;
  card.innerHTML = `
    <h3>${u.name}</h3>
    <p>${countSkills} skill${countSkills !== 1 ? 's' : ''}</p>
    <a href="endorse.html?userId=${u._id}" class="btn">Endorse</a>
  `;
  grid.append(card);
});
  })();
  