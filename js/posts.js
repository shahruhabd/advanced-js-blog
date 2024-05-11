function renderPosts() {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = '';
  const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.forEach(post => {
    postsContainer.appendChild(createPostElement(post));
  });
}

function createPostElement(post) {
  post.comments = post.comments || [];
  post.likes = post.likes || 0;
  const postElement = document.createElement("div");
  postElement.classList.add("card", "mb-3");
  postElement.dataset.id = post.id;

  const commentsHtml = post.comments.map(comment =>
    `<div class="card mb-2">
      <div class="card-body">
        <p class="card-text">${comment.content}</p>
        <p class="card-text"><small class="text-muted">${comment.username} at ${new Date(comment.time).toLocaleString()}</small></p>
      </div>
    </div>`).join('');

  postElement.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${post.username}</h5>
      <p class="card-text">${post.content}</p>
      <p class="card-text"><small class="text-muted">Published: ${new Date(post.time).toLocaleString()}</small></p>
      <div class="comments">${commentsHtml}</div>
      <textarea class="form-control mb-2 comment-content" rows="1" placeholder="Прокомментировать"></textarea>
      <button class="btn btn-secondary comment-btn">Отправить</button>
      <button class="btn btn-primary like-btn">Лайк</button>
      <span class="likes-count">${post.likes} лайков</span>
    </div>
  `;

  // Анимация появления
  postElement.animate([
    { opacity: 0, transform: 'translateY(-20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], {
    duration: 500, // Продолжительность анимации в миллисекундах
    easing: 'ease-out'
  });

  return postElement;
}


function addLike(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === parseInt(postId));
  if (post) {
    post.likes = (post.likes || 0) + 1;
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log("Like added", posts);
    renderPosts();  // Перерисовываем посты после добавления лайка
  } else {
    console.error("Post not found for liking");
  }
}

function savePostInLocalStorage(post) {
  return new Promise((resolve, reject) => {
    try {
      const currentPosts = JSON.parse(localStorage.getItem("posts")) || [];
      post.comments = post.comments || [];
      currentPosts.unshift(post);
      localStorage.setItem("posts", JSON.stringify(currentPosts));
      console.log("Post saved with comments", currentPosts);
      resolve();
    } catch (error) {
      console.error("Failed to save post", error);
      reject(error);
    }
  });
}

function addComment(postId, commentContent) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === parseInt(postId));
  if (post) {
    const newComment = {
      content: commentContent,
      time: new Date().toISOString(), 
      username: JSON.parse(localStorage.getItem("currentUser")).name 
    };
    post.comments.push(newComment);
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log("Comment added", posts);
  } else {
    console.error("Post not found for comment");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.forEach((post) => {
    post.comments = post.comments || [];
    const postElement = document.createElement("div");
    postElement.classList.add("card", "mb-3");
    postElement.dataset.id = post.id;
    const commentsHtml = post.comments.map(comment =>
      `<div class="card mb-2">
        <div class="card-body">
          <p class="card-text">${comment}</p>
        </div>
      </div>`).join('');
    postElement.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${post.username}</h5>
            <p class="card-text">${post.content}</p>
            <p class="card-text"><small class="text-muted">Published: ${new Date(post.time).toLocaleString()}</small></p>
            <div class="comments">${commentsHtml}</div>
            <textarea class="form-control mb-2 comment-content" rows="1" placeholder="Add a comment"></textarea>
            <button class="btn btn-secondary comment-btn">Comment</button>
        </div>
    `;
    document.getElementById("posts-container").appendChild(postElement); 
  });

  document.getElementById("posts-container").addEventListener("click", function(event) {
    if (event.target.classList.contains("comment-btn")) {
      const postElement = event.target.closest(".card.mb-3");
      const postId = postElement.dataset.id;
      const commentContent = postElement.querySelector(".comment-content").value.trim();
      if (!commentContent) {
        console.log("No comment entered");
        return;
      }
      addComment(postId, commentContent);
      const commentElement = document.createElement("div");
      commentElement.classList.add("card", "mb-2");
      commentElement.innerHTML = `
          <div class="card-body">
              <p class="card-text">${commentContent}</p>
          </div>
      `;
      postElement.querySelector(".comments").appendChild(commentElement);
      postElement.querySelector(".comment-content").value = "";
    } else if (event.target.classList.contains("like-btn")) {
      const postElement = event.target.closest(".card.mb-3");
      const postId = postElement.dataset.id;
      addLike(postId);
    }
  });
});

function handlePostSubmission(event) {
  event.preventDefault();
  const postContent = document.getElementById("post-content").value.trim();
  if (!postContent) {
    console.log("No content to post");
    return;
  }
  
  const currentTime = new Date().toISOString();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const username = currentUser ? currentUser.name : "Anonymous";
  const newPost = { id: Date.now(), username, content: postContent, time: currentTime, comments: [] };

  savePostInLocalStorage(newPost).then(() => {
    renderPosts(); 
  }).catch((error) => {
    console.error("Error saving post to localStorage", error);
  });
  
  document.getElementById("post-content").value = "";
}



document.addEventListener("DOMContentLoaded", function () {
  renderPosts();

  document.getElementById("posts-container").addEventListener("click", function(event) {
    if (event.target.classList.contains("comment-btn")) {
      const postElement = event.target.closest(".card.mb-3");
      const postId = postElement.dataset.id;
      const commentContent = postElement.querySelector(".comment-content").value.trim();
      if (!commentContent) {
        console.log("No comment entered");
        return;
      }
      addComment(postId, commentContent);
      renderPosts(); 
    }
  });
  document.getElementById("post-form").addEventListener("submit", handlePostSubmission);
});

function renderPosts() {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = '';  // Очищаем текущие посты

  const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.forEach(post => {
    postsContainer.appendChild(createPostElement(post));
  });

  // Обновляем количество постов
  const postCount = document.getElementById("post-count");
  postCount.textContent = savedPosts.length;  // Отображаем количество постов
}
