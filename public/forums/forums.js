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
// New Post Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn   = document.getElementById('newPostBtn');
    const modal        = document.getElementById('newPostModal');
    const closeModal   = document.getElementById('closeModal');
    const cancelBtn    = document.getElementById('cancelPost');
    const form         = document.getElementById('newPostForm');
    const mainFeed     = document.querySelector('.main'); // where new cards are appended

    // Open modal
    newPostBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        form.reset(); // clear previous input
    });

    // Close modal (× or Cancel)
    function closeModalFunc() {
        modal.style.display = 'none';
    }

    closeModal.addEventListener('click', closeModalFunc);
    cancelBtn.addEventListener('click', closeModalFunc);

    // Close when clicking outside modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Handle form submission → create new post card
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title   = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();

        if (!title || !content) return;

        // Create new post card
        const newCard = document.createElement('div');
        newCard.className = 'post-card';
        newCard.onclick = () => newCard.classList.toggle('expanded');

        newCard.innerHTML = `
            <div class="post-header">
                <div class="post-title">${escapeHtml(title)}</div>
                <div class="more-dots">⋯</div>
            </div>
            <div class="post-main">
                <div class="post-content">
                    <div class="post-text">
                        ${escapeHtml(content.substring(0, 280))}${content.length > 280 ? '...' : ''}
                    </div>
                </div>
            </div>
            <div class="expanded-content">
                <div class="user-mentions">
                    <div class="user-tag">@you • Just posted this!</div>
                </div>
            </div>
        `;

        // Insert at the top of the feed (after header)
        const firstCard = mainFeed.querySelector('.post-card');
        if (firstCard) {
            mainFeed.insertBefore(newCard, firstCard);
        } else {
            mainFeed.appendChild(newCard);
        }

        // Close modal & reset
        closeModalFunc();
    });
});

// Simple HTML escape to prevent XSS (basic version)
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function toggleCommentBox(btn) {
    const postCard = btn.closest('.post-card');
    const expanded = postCard.classList.contains('expanded');
    
    // If not already expanded, open it first
    if (!expanded) {
        postCard.classList.add('expanded');
    }
    
    const commentForm = postCard.querySelector('.comment-form');
    commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
    
    // Focus the textarea when opening
    if (commentForm.style.display === 'block') {
        commentForm.querySelector('textarea').focus();
    }
    
    // Stop click from toggling expand/collapse
    event.stopPropagation();
}

document.addEventListener('click', function(e) {
    // Handle cancel
    if (e.target.classList.contains('cancel-comment')) {
        const form = e.target.closest('.comment-form');
        form.style.display = 'none';
        form.querySelector('textarea').value = '';
        e.stopPropagation();
    }
    
    // Handle post comment
    if (e.target.classList.contains('post-comment')) {
        const form = e.target.closest('.comment-form');
        const textarea = form.querySelector('.comment-input');
        const text = textarea.value.trim();
        
        if (!text) return;
        
        const postCard = form.closest('.post-card');
        const commentsSection = postCard.querySelector('.comments-section');
        const countEl = postCard.querySelector('.comment-count');
        
        // Create comment element
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <div class="comment-avatar"></div>
            <div class="comment-body">
                <div class="comment-author">@you</div>
                <div class="comment-text">${escapeHtml(text)}</div>
                <div class="comment-time">just now</div>
            </div>
        `;
        
        commentsSection.appendChild(commentDiv);
        
        // Update count
        let count = parseInt(countEl.textContent) || 0;
        countEl.textContent = count + 1;
        
        // Reset & hide form
        textarea.value = '';
        form.style.display = 'none';
        
        e.stopPropagation();
    }
});

// Reuse your existing escape function (or add this if missing)
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}