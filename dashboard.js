<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Innov8ion</title>

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide-dev@latest"></script>

    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-gray-100 text-gray-800">

    <!-- =========== DASHBOARD VIEW CONTAINER =========== -->
    <div id="dashboardView" class="hidden flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <aside id="sidebar" class="w-64 bg-slate-900 text-white flex flex-col">
            <div class="p-6 text-center border-b border-slate-700">
                <h2 class="text-2xl font-bold">I8 Innov8ion</h2>
                <p id="userRoleDisplay" class="text-sm text-blue-300 capitalize"></p>
            </div>
            <nav id="sidebarNav" class="flex-1 p-4 space-y-2">
                <!-- Nav items will be populated by JS based on role -->
            </nav>
            <div class="p-4 border-t border-slate-700">
                <p id="currentUserDisplay" class="text-sm"></p>
                <button id="logoutBtn" class="w-full mt-2 text-left flex items-center p-2 rounded-lg hover:bg-slate-700">
                    <i data-lucide="log-out" class="w-5 h-5 mr-3"></i> Log Out
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main id="mainContent" class="flex-1 p-6 lg:p-10 overflow-y-auto">
            <!-- Role-specific content will be injected here by JS -->
        </main>
    </div>

    <!-- Dashboard Logic Script -->
    <script src="dashboard.js"></script>
</body>
</html>

