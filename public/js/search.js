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
		const startDate = document.getElementById('startDate').value;
		const endDate = document.getElementById('endDate').value;
		const location = document.getElementById('location').value.trim();
		const category = document.getElementById('category').value;

		let url = `${base}?`;
		if (startDate) url += `start_date=${encodeURIComponent(startDate)}&`;
		if (endDate) url += `end_date=${encodeURIComponent(endDate)}&`;
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




// 爱心拖尾效果
document.addEventListener('DOMContentLoaded', function () {
    const trailContainer = document.getElementById('trailContainer');
    let hearts = [];
    let heartCount = 12; // 同时显示的爱心数量

    // 预创建爱心元素
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'trail-heart';

        // 随机分配大小和颜色
        const sizes = ['small', 'medium', 'large'];
        const colors = ['gold', 'pink', 'white', 'green'];

        heart.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
        heart.classList.add(colors[Math.floor(Math.random() * colors.length)]);

        // 随机添加跳动效果
        if (Math.random() > 0.7) {
            heart.classList.add('bounce');
        }

        trailContainer.appendChild(heart);
        hearts.push({
            element: heart,
            x: 0,
            y: 0
        });
    }

    let currentHeart = 0;

    // 鼠标移动事件
    document.addEventListener('mousemove', function (e) {
        const heart = hearts[currentHeart];
        const heartElement = heart.element;

        // 更新位置
        heart.x = e.clientX;
        heart.y = e.clientY;

        // 应用位置
        heartElement.style.left = heart.x + 'px';
        heartElement.style.top = heart.y + 'px';

        // 重置动画
        heartElement.style.animation = 'none';
        void heartElement.offsetWidth; // 触发重绘
        heartElement.style.animation = null;

        // 移动到下一个爱心
        currentHeart = (currentHeart + 1) % heartCount;
    });

    // 鼠标离开窗口时隐藏所有爱心
    document.addEventListener('mouseleave', function () {
        hearts.forEach(heart => {
            heart.element.style.opacity = '0';
        });
    });

    // 鼠标进入窗口时重新显示
    document.addEventListener('mouseenter', function () {
        hearts.forEach(heart => {
            heart.element.style.opacity = '0.9';
        });
    });
});




