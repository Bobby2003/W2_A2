(async function () {
	const base = '/api/events';
	const fallbackImg = 'https://via.placeholder.com/800x450?text=No+Image';

	let events = [];
	const res = await fetch(base);
	events = await res.json();

	const track = document.getElementById('carousel-track');
	const featured = events.slice(0, 4);
	if (featured.length === 0) {
		track.innerHTML = `<div class="carousel-slide active" style="background-image:url('${fallbackImg}')">
      <div class="carousel-caption">No Events</div></div>`;
	} else {
		featured.forEach((ev, idx) => {
			const url = ev.image_url || fallbackImg;
			const div = document.createElement('div');
			div.className = 'carousel-slide' + (idx === 0 ? ' active' : '');
			div.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.18)), url('${url}')`;
			div.innerHTML = `<div class="carousel-caption">${ev.name}</div>`;
			div.addEventListener('click', () => location.href = `/html/event.html?id=${ev.id}`);
			track.appendChild(div);
		});

		let idx = 0;
		setInterval(() => {
			const slides = track.querySelectorAll('.carousel-slide');
			slides.forEach(s => s.classList.remove('active'));
			idx = (idx + 1) % slides.length;
			slides[idx].classList.add('active');
		}, 4000);
	}

	const grid = document.getElementById('events-grid');
	events.forEach(ev => {
		const img = ev.image_url || fallbackImg;
		const card = document.createElement('a');
		card.className = 'event-card';
		card.href = `/html/event.html?id=${ev.id}`;
		card.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${img}')`;
		card.innerHTML = `<div class="meta">
      <h3>${ev.name}</h3>
      <p>${ev.category_name || ''} · ${ev.org_name || ''}</p>
    </div>`;
		grid.appendChild(card);
	});

})();
