(async function(){
    const token = localStorage.getItem('token');
    if (!token) return window.location='login.html';
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    if (!userId) return alert('No user specified');
  
    const res = await fetch(
      `https://skill-endorsement-platform-backend.onrender.com/api/skills/${userId}`,
      { headers:{ 'Authorization':'Bearer '+token }}
    );
    const skills = await res.json();
    const sel = document.getElementById('skillSelect');
    skills.forEach(s=>{
      sel.innerHTML += `<option value="${s.name}">${s.name}</option>`;
    });
  
    document.getElementById('endorseForm')
      .addEventListener('submit', async e=>{
        e.preventDefault();
        const skillName = sel.value;
        const credibilityTag = document.getElementById('credibilityTag').value.trim();
        const me = JSON.parse(localStorage.getItem('user'));
        const body = { userId, skillName, credibilityTag, endorserId: me._id };
        const resp = await fetch(
          'https://skill-endorsement-platform-backend.onrender.com/api/skills/endorse',
          {
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer '+token
            },
            body: JSON.stringify(body)
          }
        );
        if (resp.ok) {
          alert('Endorsement submitted!');
          window.location='dashboard.html';
        } else {
          const err = await resp.json();
          alert(err.msg || 'Error endorsing');
        }
      });
  })();
  