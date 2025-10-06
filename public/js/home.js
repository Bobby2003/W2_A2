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
        if (ev.events_status == 'active') {
            return; // 跳过不符合条件的事件
        }
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




