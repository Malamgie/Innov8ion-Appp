document.addEventListener('DOMContentLoaded', () => {

    // =========== STATE AND AUTH CHECK ===========
    
    // Retrieve user data from session storage. This is the core of the multi-page auth.
    const currentUser = JSON.parse(sessionStorage.getItem('innov8ionUser'));

    // SECURITY CHECK: If no user is logged in, redirect to the landing page.
    if (!currentUser) {
        window.location.href = 'index.html';
        return; // Stop executing script
    }
    
    // If user is found, show the dashboard
    document.getElementById('dashboardView').classList.remove('hidden');

    // =========== DOM ELEMENT SELECTORS ===========
    const sidebarNav = document.getElementById('sidebarNav');
    const mainContent = document.getElementById('mainContent');
    const userRoleDisplay = document.getElementById('userRoleDisplay');
    const currentUserDisplay = document.getElementById('currentUserDisplay');
    const logoutBtn = document.getElementById('logoutBtn');

    // =========== LOGOUT LOGIC ===========

    logoutBtn.addEventListener('click', () => {
        // --- FIREBASE LOGOUT PLACEHOLDER ---
        // signOut(auth)...
        
        // Clear the session and redirect to landing page
        sessionStorage.removeItem('innov8ionUser');
        window.location.href = 'index.html';
    });

    // =========== DASHBOARD RENDERING LOGIC ===========

    function renderDashboard() {
        userRoleDisplay.textContent = currentUser.role;
        currentUserDisplay.textContent = currentUser.email;
        sidebarNav.innerHTML = ''; // Clear sidebar
        mainContent.innerHTML = ''; // Clear main content

        const createNavItem = (icon, text) => `
            <a href="#" class="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors">
                <i data-lucide="${icon}" class="w-5 h-5 mr-3"></i> ${text}
            </a>
        `;

        // Render based on user role
        switch(currentUser.role) {
            case 'National Admin':
                renderNationalAdminDashboard();
                sidebarNav.innerHTML = `
                    ${createNavItem('layout-dashboard', 'Dashboard')}
                    ${createNavItem('users', 'User Management')}
                    ${createNavItem('building', 'State Hubs')}
                    ${createNavItem('bar-chart-2', 'Statistics')}
                    ${createNavItem('settings', 'System Settings')}
                `;
                break;
            case 'User':
                renderUserDashboard();
                sidebarNav.innerHTML = `
                    ${createNavItem('user-circle-2', 'My Profile')}
                    ${createNavItem('receipt', 'Transactions')}
                    ${createNavItem('shield-check', 'Get Verified')}
                    ${createNavItem('credit-card', 'My ID Card')}
                    ${createNavItem('settings', 'Settings')}
                `;
                break;
            default: // State Hub Admins
                renderStateHubDashboard();
                sidebarNav.innerHTML = `
                    ${createNavItem('layout-dashboard', 'Hub Dashboard')}
                    ${createNavItem('users', 'Manage Users')}
                    ${createNavItem('user-check', 'Verification Queue')}
                    ${createNavItem('gavel', 'Dispute Resolution')}
                    ${createNavItem('message-square', 'Hub Communications')}
                `;
                break;
        }
        
        // Re-initialize icons after they are added to the DOM
        lucide.createIcons();
    }
    
    // --- TEMPLATES FOR DIFFERENT DASHBOARDS ---

    function renderNationalAdminDashboard() {
        mainContent.innerHTML = `
            <h1 class="text-3xl font-bold text-slate-800">National Admin Dashboard</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div class="bg-white p-6 rounded-lg shadow-md"><h3 class="text-gray-500">Total Users</h3><p class="text-3xl font-bold">1,250,432</p></div>
                <div class="bg-white p-6 rounded-lg shadow-md"><h3 class="text-gray-500">Verified Users</h3><p class="text-3xl font-bold text-green-600">890,123</p></div>
                <div class="bg-white p-6 rounded-lg shadow-md"><h3 class="text-gray-500">Total Transactions</h3><p class="text-3xl font-bold">₦ 5.2B</p></div>
                <div class="bg-white p-6 rounded-lg shadow-md"><h3 class="text-gray-500">Active Disputes</h3><p class="text-3xl font-bold text-red-600">128</p></div>
            </div>
            <div class="mt-10 bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-4">User Growth Overview</h2>
                <div class="h-80 bg-gray-200 flex items-center justify-center rounded-md"><p>Chart.js Placeholder</p></div>
            </div>
        `;
    }

    function renderStateHubDashboard() {
        mainContent.innerHTML = `
            <h1 class="text-3xl font-bold text-slate-800">State Hub Dashboard: <span class="text-blue-600">${currentUser.role}</span></h1>
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div class="bg-white p-6 rounded-lg shadow-md"><h3 class="text-gray-500">Users in State</h3><p class="text-3xl font-bold">15,789</p></div>
                <div class="bg-white p-6 rounded-lg shadow-md"><h3 class="text-gray-500">Pending Verifications</h3><p class="text-3xl font-bold text-amber-600">72</p></div>
                <div class="bg-white p-6 rounded-lg shadow-md"><h3 class="text-gray-500">State Transactions (30d)</h3><p class="text-3xl font-bold">₦ 150M</p></div>
                <div class="bg-white p-6 rounded-lg shadow-md"><h3 class="text-gray-500">State Disputes</h3><p class="text-3xl font-bold text-red-600">5</p></div>
            </div>
             <div class="mt-10 bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-4">Manual Verification Queue</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead><tr class="border-b"><th class="p-3">Name</th><th class="p-3">Email</th><th class="p-3">Date Joined</th><th class="p-3">Actions</th></tr></thead>
                        <tbody>
                            <tr class="border-b hover:bg-gray-50"><td class="p-3">Aisha Bello</td><td class="p-3">a.bello@email.com</td><td class="p-3">2025-10-19</td><td class="p-3"><button class="text-blue-600 hover:underline">View Details</button></td></tr>
                            <tr class="border-b hover:bg-gray-50"><td class="p-3">Chinedu Okoro</td><td class="p-3">c.okoro@email.com</td><td class="p-3">2025-10-18</td><td class="p-3"><button class="text-blue-600 hover:underline">View Details</button></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function renderUserDashboard() {
        const verificationUI = currentUser.verified 
            ? `<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                   <p class="font-bold">Profile Verified</p>
                   <p>You have full access to all Innov8ion services.</p>
               </div>`
            : `<div class="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded-md">
                   <p class="font-bold">Pending Verification</p>
                   <p>Your documents are under review by your state hub. You will be notified upon completion.</p>
               </div>
               <div class="mt-4"><button class="btn btn-primary">Upload Documents to Get Verified</button></div>`;
        
        const idCardUI = currentUser.verified
            ? `<div class="p-6 rounded-lg shadow-md text-white innov8ion-gradient h-48 flex flex-col items-center justify-center">
                <i data-lucide="scan-face" class="w-16 h-16 mb-2"></i>
                <p>Digital ID Card Ready</p>
               </div>`
            : `<div class="bg-slate-800 p-6 rounded-lg shadow-md text-white">
                <h2 class="text-xl font-semibold mb-4">Your Innov8ion ID Card</h2>
                <div class="bg-gray-500 h-48 flex items-center justify-center rounded-md">
                    <p class="text-gray-300">Available after verification</p>
                </div>
              </div>`;


        mainContent.innerHTML = `
            <h1 class="text-3xl font-bold text-slate-800">Welcome, <span class="text-blue-600">${currentUser.name}</span>!</h1>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-xl font-semibold mb-4">Verification Status</h2>
                        ${verificationUI}
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h2 class="text-xl font-semibold mb-4">Recent Transactions</h2>
                        <p class="text-gray-500">No transactions yet.</p>
                    </div>
                </div>
                <div class="lg:col-span-1">
                    ${idCardUI}
                </div>
            </div>
        `;
    }
    
    // =========== INITIALIZE THE DASHBOARD ===========
    renderDashboard();
});
