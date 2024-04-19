document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let storedPassword = localStorage.getItem(username);

        if(password === storedPassword) {
            const currentUser = { name: username };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            window.location.href = 'posts.html';
            alert('Вы успешно вошли в систему!');
        } else {
            alert('Неверное имя пользователя или пароль');
        }
    });
});
