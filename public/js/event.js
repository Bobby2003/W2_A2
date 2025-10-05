(async function(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const wrap = document.getElementById('event-wrap');
  const fallback = 'https://via.placeholder.com/800x450?text=No+Image';

  if(!id){
    wrap.innerHTML = '<p>Invalid event id.</p>'; return;
  }

    const res = await fetch(`/api/events/${id}`);
    if(!res.ok){ wrap.innerHTML = '<p>Event not found.</p>'; return; }
    const e = await res.json();

    wrap.innerHTML = `
      <div style="margin-bottom:12px;"><button class="btn ghost" onclick="history.back()">← Back</button></div>
      <div class="event-header">
        <div class="cover" id="cover">
          <img src="${e.image_url || fallback}" alt="${e.name}">
        </div>
        <div class="event-info">
          <h2>${e.name}</h2>
          <div class="meta">${e.category_name || ''} · ${e.org_name || ''}</div>
          <p class="meta">${e.location || ''} &nbsp; • &nbsp; ${new Date(e.start_datetime).toLocaleString()} - ${new Date(e.end_datetime).toLocaleString()}</p>
          <p style="margin-top:10px; font-weight:700;">Price: ${Number(e.price).toFixed(2) == '0.00' ? 'Free' : '$' + Number(e.price).toFixed(2)}</p>
          <div style="margin-top:14px;">
            <button class="btn" id="register-btn">Register</button>
          </div>
        </div>
      </div>

      <section style="margin-top:20px;">
        <h3>About</h3>
        <p>${e.full_description || e.short_description || ''}</p>

        <h3>Goal vs Progress</h3>
        <p>Goal: $${Number(e.goal_amount).toFixed(2)} · Raised: $${Number(e.current_amount).toFixed(2)}</p>
      </section>
    `;

    const cover = document.getElementById('cover');
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('modal-close');

    cover.addEventListener('click', ()=>{
      modalImg.src = e.image_url || fallback;
      modal.style.display = 'flex';
    });
    closeBtn.addEventListener('click', ()=> modal.style.display = 'none');
    modal.addEventListener('click', (ev)=> { if(ev.target === modal) modal.style.display='none'; });

    document.getElementById('register-btn').addEventListener('click', ()=> {
      alert('This feature is currently under construction.');
    });

})();
