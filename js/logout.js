document.addEventListener('DOMContentLoaded', function() {
    const userDropdownContainer = document.querySelector('.navbar-nav');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        userDropdownContainer.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${currentUser.name}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#" id="logout-btn">Выйти</a>
                </div>
            </li>
        `;

        document.getElementById('logout-btn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});