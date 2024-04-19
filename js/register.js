document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
    
        let username = document.getElementById('new-username').value;
        let password = document.getElementById('new-password').value;   
    
        localStorage.setItem(username, password);
        alert('Регистрация успешна!');
        window.location.href = 'posts.html';
    });
});
