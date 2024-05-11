const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
    
        let username = document.getElementById('new-username').value;
        let password = document.getElementById('new-password').value; 

        if (!passwordRegex.test(password)) {
            alert('Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы.');
            return; 
        }
    
        const currentUser = { name: username };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem(username, password);
        alert('Регистрация успешна!');
        window.location.href = 'posts.html';
    });
});
