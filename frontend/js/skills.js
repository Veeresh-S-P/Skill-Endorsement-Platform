(async function(){
    const token = localStorage.getItem('token');
    if (!token) return window.location='login.html';
    const me = JSON.parse(localStorage.getItem('user'));
    const userId = me._id;
  
    // show existing skills
    async function load() {
      const res = await fetch(
        `https://skill-endorsement-platform-backend.onrender.com/api/skills/${userId}`,
        { headers:{ 'Authorization':'Bearer '+token }}
      );
      const skills = await res.json();
      const list = document.getElementById('skillList');
      list.innerHTML = '';
      skills.forEach(s=>{
        list.innerHTML += `<li>${s.name} (${s.type}) — ${s.endorsements?.length||0} endorsements</li>`;
      });
    }
  
    document.getElementById('addSkillForm')
      .addEventListener('submit', async e=>{
        e.preventDefault();
        const name = document.getElementById('skillName').value.trim();
        const type = document.getElementById('skillType').value;
        const res = await fetch(
          'https://skill-endorsement-platform-backend.onrender.com/api/skills/add',
          {
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer '+token
            },
            body: JSON.stringify({ userId, name, type })
          }
        );
        if (res.ok) {
          document.getElementById('skillName').value = '';
          await load();
        } else {
          const err = await res.json();
          alert(err.msg || 'Could not add skill');
        }
      });
  
    await load();
  })();
  