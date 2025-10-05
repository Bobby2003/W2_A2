(async function () {
	const categoriesSelect = document.getElementById('category');
	const resultsDiv = document.getElementById('search-results');
	const base = '/api/search';
	const catBase = '/api/categories';
	const fallbackImg = 'https://via.placeholder.com/400x220?text=No+Image';

	const res = await fetch(catBase);
	const cats = await res.json();
	cats.forEach(c => {
		const opt = document.createElement('option');
		opt.value = c.id; opt.textContent = c.name;
		categoriesSelect.appendChild(opt);
	});

	document.getElementById('btnSearch').addEventListener('click', async () => {
		const date = document.getElementById('date').value;
		const location = document.getElementById('location').value.trim();
		const category = document.getElementById('category').value;

		let url = `${base}?`;
		if (date) url += `date=${encodeURIComponent(date)}&`;
		if (location) url += `location=${encodeURIComponent(location)}&`;
		if (category) url += `category_id=${encodeURIComponent(category)}&`;

		const res = await fetch(url);
		const data = await res.json();
		renderResults(data);
	});

	document.getElementById('btnClear').addEventListener('click', () => {
		document.getElementById('date').value = '';
		document.getElementById('location').value = '';
		document.getElementById('category').value = '';
		resultsDiv.innerHTML = '';
	});

	function renderResults(list) {
		resultsDiv.innerHTML = '';
		if (!list || list.length === 0) {
			resultsDiv.innerHTML = '<p>No matching events.</p>'; return;
		}
		const wrap = document.createElement('div');
		wrap.style.display = 'grid';
		wrap.style.gridTemplateColumns = 'repeat(auto-fill,minmax(260px,1fr))';
		wrap.style.gap = '16px';
		list.forEach(ev => {
			const card = document.createElement('a');
			card.className = 'event-card';
			card.href = `/html/event.html?id=${ev.id}`;
			const img = ev.image_url || fallbackImg;
			card.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${img}')`;
			card.innerHTML = `<div class="meta"><h3>${ev.name}</h3><p>${ev.category_name || ''} · ${ev.location || ''}</p></div>`;
			wrap.appendChild(card);
		});
		resultsDiv.appendChild(wrap);
	}
})();
