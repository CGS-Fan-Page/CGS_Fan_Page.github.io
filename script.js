document.addEventListener('DOMContentLoaded', () => {
    const signInButton = document.getElementById('signInButton');
    const signOutButton = document.getElementById('signOutButton');
    const userProfile = document.getElementById('userProfile');
    const usernameSpan = document.getElementById('username');
    const pfpImage = document.getElementById('pfp');
    const DEFAULT_PFP = 'https://i.imgur.com/VPA9l4a.png'; // A default placeholder image

    function showUserProfile(username) {
        const pfpUrl = localStorage.getItem(`pfp_${username}`) || DEFAULT_PFP;
        usernameSpan.textContent = username;
        pfpImage.src = pfpUrl;
        signInButton.style.display = 'none';
        userProfile.style.display = 'flex';
        signOutButton.style.display = 'inline-block';
    }

    function showSignInButton() {
        signInButton.style.display = 'inline-block';
        userProfile.style.display = 'none';
        signOutButton.style.display = 'none';
        pfpImage.src = '';
        usernameSpan.textContent = '';
    }

    // Check for a currently signed-in user on page load
    const currentUsername = localStorage.getItem('currentUser');
    if (currentUsername) {
        showUserProfile(currentUsername);
    }

    // Sign-in process
    signInButton.addEventListener('click', () => {
        const username = prompt("Please enter your username:");
        if (username) {
            if (username === 'KTMSONIC77K') {
                alert("you tried to log in with the admin's name huh? well you can't ;)");
            } else {
                localStorage.setItem('currentUser', username);
                showUserProfile(username);
            }
        }
    });

    // Sign-out process
    signOutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        showSignInButton();
    });

    // Profile picture selection
    pfpImage.addEventListener('click', () => {
        const signedInUser = localStorage.getItem('currentUser');
        // Only allow changing pfp if signed in
        if (signedInUser) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const pfpDataUrl = e.target.result;
                        pfpImage.src = pfpDataUrl;
                        // Save the PFP against the specific username
                        localStorage.setItem(`pfp_${signedInUser}`, pfpDataUrl);
                    };
                    reader.readAsDataURL(file);
                }
            });
            fileInput.click();
        }
    });

    const creatorButton = document.getElementById('creatorButton');
    creatorButton.addEventListener('click', () => {
        const header = document.querySelector('header');
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');

        header.style.display = 'none';
        main.style.display = 'none';
        footer.style.display = 'none';

        setTimeout(() => {
            header.style.display = '';
            main.style.display = '';
            footer.style.display = '';
        }, 5000);
    });
});