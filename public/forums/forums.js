function getDisplayName() {
    const raw = localStorage.getItem("userProfile");
    if (!raw) return "you";

    const data = JSON.parse(raw);
    return data.displayName || "you";
}

function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("postsContainer");

    getPosts().forEach(post => {
        container.prepend(createPostElement(post));
    });
});

function createPostElement(post) {
    const card = document.createElement("div");
    card.className = "post-card";
    card.dataset.id = post.id;

    card.innerHTML = `
        <div class="post-header">
            <div class="post-title">${escapeHtml(post.title)}</div>

            <div class="post-actions">
                <button class="delete-post">🗑</button>
            </div>
        </div>

        <div class="post-main">
            <div class="post-content">
                <div class="post-text">
                    ${escapeHtml(post.content.substring(0, 280))}${post.content.length > 280 ? "..." : ""}
                </div>
            </div>
        </div>

        <div class="expanded-content">
            <div class="user-mentions">
                <div class="user-tag">@${escapeHtml(post.displayName)} • Just posted this!</div>
            </div>
        </div>
    `;

    card.onclick = () => card.classList.toggle("expanded");

    return card;
}

document.addEventListener('click', function(e) {
    const cards = document.querySelectorAll('.post-card');

    let clickedInside = false;
    for (const card of cards) {
        if (card.contains(e.target)) {
            clickedInside = true;
            break;
        }
    }

    if (!clickedInside) {
        cards.forEach(card => card.classList.remove('expanded'));
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const newPostBtn = document.getElementById('newPostBtn');
    const modal = document.getElementById('newPostModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelPost');
    const form = document.getElementById('newPostForm');
    const mainFeed = document.getElementById('postsContainer');

    if (!newPostBtn || !modal || !form) return;

    function closeModalFunc() {
        modal.style.display = 'none';
    }

    newPostBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        form.reset();
    });

    closeModal.addEventListener('click', closeModalFunc);
    cancelBtn.addEventListener('click', closeModalFunc);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();
        const displayName = getDisplayName();

        if (!title || !content) return;

        const post = {
            id: Date.now().toString(),
            title,
            content,
            displayName
        };

        // SAVE
        const posts = getPosts();
        posts.unshift(post);
        savePosts(posts);

        // RENDER
        mainFeed.prepend(createPostElement(post));

        closeModalFunc();
    });
});

document.addEventListener("click", function (e) {
    const deleteBtn = e.target.closest(".delete-post");
    if (!deleteBtn) return;

    const postCard = deleteBtn.closest(".post-card");
    if (!postCard) return;

    const confirmDelete = confirm("Delete this post?");
    if (!confirmDelete) return;

    const postId = postCard.dataset.id;

    let posts = getPosts();
    posts = posts.filter(p => p.id !== postId);
    savePosts(posts);

    postCard.remove();
});

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}