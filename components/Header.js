export default function Header() {
    const user = localStorage.getItem('user');

    const addLogoutListener = () => {
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('user'); 
                window.location.href = 'Login.html'; 
            });
        }
    };

    setTimeout(addLogoutListener, 0); 

    return `
    <header>
        <div class="header">
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px;">
                <i class="fa-solid fa-video fa-2xl" style="color: #ffffff; margin-top: 15px;"></i>
                <h3 style="color: white;">MovieShop</h3>
            </div>
            <nav class="nav">
                <a class="navLink" href="index.html">Home</a>
                ${user 
                    ? `
                    <a class="navLink" href="pages/favourites.html"><i class="fa-solid fa-bookmark" style="color: #ff3333;"></i></a>
                    <a class="navLink" id="openCart"><i class="fa-solid fa-cart-shopping" style="color: #ff3333;"></i></a>
                    <a class="navLink" href="pages/profile.html" ><i class="fa-solid fa-user" style="color: #ff3333;"></i></a>
                    `
                    : `
                    <a class="navLink" href="pages/Login.html">Login</a>
                    `}
                <a class="navLink" id="showSearchButton"><i class="fa-solid fa-magnifying-glass fa-lg" style="color:  #ffffff;"></i></a>
            </nav>
        </div>
    </header>`;
}
