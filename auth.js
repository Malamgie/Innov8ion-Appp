document.addEventListener('DOMContentLoaded', () => {

    // =========== STATE AND DATA ===========
    
    // Mock user data for demonstration
    const mockUsers = {
        "admin@innov8ion.ng": { password: "password", role: "National Admin", name: "National Admin" },
        "lagos@innov8ion.ng": { password: "password", role: "Lagos", name: "Lagos Hub Admin" },
        "kano@innov8ion.ng": { password: "password", role: "Kano", name: "Kano Hub Admin" },
        "user@example.com": { password: "password", role: "User", name: "John Doe", state: "Lagos", verified: false }
    };

    const nigerianStates = [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
        "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
        "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
        "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
    ];
    
    // =========== DOM ELEMENT SELECTORS ===========
    const authModalContainer = document.getElementById('authModalContainer');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Buttons and Links
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const heroSignupBtn = document.getElementById('heroSignupBtn');
    const showSignupLink = document.getElementById('showSignupLink');
    const showLoginLink = document.getElementById('showLoginLink');

    // State Dropdown
    const stateDropdown = document.getElementById('signupState');
    
    // =========== MODAL VISIBILITY LOGIC ===========

    function showModal(modalToShow) {
        authModalContainer.classList.remove('hidden');
        loginModal.classList.add('hidden');
        signupModal.classList.add('hidden');
        
        if (modalToShow === 'login') {
            loginModal.classList.remove('hidden');
        } else if (modalToShow === 'signup') {
            signupModal.classList.remove('hidden');
        }
    }

    function hideModals() {
        authModalContainer.classList.add('hidden');
    }

    loginBtn.addEventListener('click', () => showModal('login'));
    signupBtn.addEventListener('click', () => showModal('signup'));
    heroSignupBtn.addEventListener('click', () => showModal('signup'));

    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('signup');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('login');
    });

    authModalContainer.addEventListener('click', (e) => {
        if (e.target === authModalContainer) {
            hideModals();
        }
    });

    // =========== INITIALIZATION ===========

    function initializeLandingPage() {
        // Populate states dropdown
        nigerianStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateDropdown.appendChild(option);
        });
        lucide.createIcons();
    }
    
    // =========== AUTHENTICATION LOGIC ===========

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // --- FIREBASE AUTH PLACEHOLDER ---
        // signInWithEmailAndPassword(auth, email, password)...
        
        // Mock logic
        if (mockUsers[email] && mockUsers[email].password === password) {
            const user = { email, ...mockUsers[email] };
            // Store user session and redirect
            sessionStorage.setItem('innov8ionUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const state = document.getElementById('signupState').value;
        const password = document.getElementById('signupPassword').value;

        // --- FIREBASE SIGNUP PLACEHOLDER ---
        // createUserWithEmailAndPassword(auth, email, password)...

        // Mock logic
        if (mockUsers[email]) {
            alert('User already exists!');
        } else {
            const newUser = { email, name, state, role: 'User', verified: false };
            mockUsers[email] = { password, ...newUser };
            
            // Store user session and redirect
            sessionStorage.setItem('innov8ionUser', JSON.stringify(newUser));
            window.location.href = 'dashboard.html';
        }
    });

    initializeLandingPage();
});

