document.getElementById('add-post-btn').addEventListener('click', function() {
    const postContent = document.getElementById('post-content').value;
    const currentTime = new Date().toISOString(); // Используйте ISO строку для времени
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = currentUser ? currentUser.name : 'Аноним';
    
    const newPost = document.createElement('div');
    newPost.classList.add('card', 'mb-3');
    newPost.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${username}</h5>
            <p class="card-text">${postContent}</p>
            <p class="card-text"><small class="text-muted">Опубликовано: ${new Date(currentTime).toLocaleString()}</small></p>
        </div>
    `;

    // Добавляем новый пост в начало списка
    const postsContainer = document.getElementById('posts-container');
    postsContainer.prepend(newPost);

    savePostInLocalStorage({ username, content: postContent, time: currentTime });

    document.getElementById('post-content').value = '';
});

function savePostInLocalStorage(post) {
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || [];
    currentPosts.unshift(post); // Добавляем новый пост в начало массива
    localStorage.setItem('posts', JSON.stringify(currentPosts));
}

document.addEventListener('DOMContentLoaded', function() {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    // Перебираем посты в обратном порядке
    savedPosts.reverse().forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('card', 'mb-3');
        postElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${post.username}</h5>
                <p class="card-text">${post.content}</p>
                <p class="card-text"><small class="text-muted">Опубликовано: ${new Date(post.time).toLocaleString()}</small></p>
            </div>
        `;
        document.getElementById('posts-container').prepend(postElement); // prepend для сохранения порядка
    });
});

// Этот обработчик событий отвечает за публикацию поста и подключается к форме
function handlePostSubmission(event) {
    event.preventDefault();

    const postContent = document.getElementById('post-content').value.trim();
    if (!postContent) {
        // Если текст не введен, не создаем пост
        return;
    }
    const currentTime = new Date().toISOString();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = currentUser ? currentUser.name : 'Аноним';

    const newPost = document.createElement('div');
    newPost.classList.add('card', 'mb-3');
    newPost.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${username}</h5>
            <p class="card-text">${postContent}</p>
            <p class="card-text"><small class="text-muted">Опубликовано: ${new Date(currentTime).toLocaleString()}</small></p>
        </div>
    `;

    document.getElementById('posts-container').prepend(newPost);

    savePostInLocalStorage({ username, content: postContent, time: currentTime });

    document.getElementById('post-content').value = '';
}

// Подключаем обработчик к кнопке "Добавить пост"
document.getElementById('add-post-btn').addEventListener('click', handlePostSubmission);

document.addEventListener('DOMContentLoaded', function() {
// Дополнительно подключаем обработчик к форме, если она у вас есть
    const postForm = document.getElementById('post-form'); // Убедитесь, что у вашей формы есть этот ID
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePostSubmission();
    });
});