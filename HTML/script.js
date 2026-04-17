document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    
    // Store original dashboard content if we are on AdminMaster
    let originalDashboardHTML = '';
    if (mainContent) {
        originalDashboardHTML = mainContent.innerHTML;
    }

    // --- TEMPLATES ---
    const pageContents = {
        'AdminMaster.html': originalDashboardHTML,
        
        'StaffStats.html': `
            <section class="px-10 py-8">
                <div>
                    <span class="text-[#C5A059] font-bold text-[0.6875rem] uppercase tracking-widest mb-2 block">Analytics Console</span>
                    <h2 class="text-[1.75rem] font-black tracking-[-0.02em] leading-tight font-headline">Staff Statistics</h2>
                </div>
            </section>
            <div class="flex-1 px-10 pb-10 overflow-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 text-center flex flex-col items-center justify-center">
                        <span class="material-symbols-outlined text-[#C5A059] text-4xl mb-2">groups</span>
                        <h3 class="text-3xl font-black">142</h3>
                        <p class="text-sm opacity-70 font-medium mt-1">Total Active Staff</p>
                    </div>
                    <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 text-center flex flex-col items-center justify-center">
                        <span class="material-symbols-outlined text-[#C5A059] text-4xl mb-2">co_present</span>
                        <h3 class="text-3xl font-black">98%</h3>
                        <p class="text-sm opacity-70 font-medium mt-1">Attendance Rate</p>
                    </div>
                    <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 text-center flex flex-col items-center justify-center">
                        <span class="material-symbols-outlined text-[#C5A059] text-4xl mb-2">assignment_ind</span>
                        <h3 class="text-3xl font-black text-rose-600">24</h3>
                        <p class="text-sm opacity-70 font-medium mt-1">Pending Leaves</p>
                    </div>
                </div>
                <div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-6">
                    <h3 class="text-lg font-bold mb-4 border-b border-outline-variant/20 pb-2">Department Overview</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse min-w-full">
                            <thead>
                                <tr class="border-b border-outline-variant/20 text-sm opacity-70">
                                    <th class="py-3 px-4 font-semibold">Department</th>
                                    <th class="py-3 px-4 font-semibold">Headcount</th>
                                    <th class="py-3 px-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-outline-variant/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <td class="py-3 px-4 font-medium">Computer Science</td>
                                    <td class="py-3 px-4 opacity-70">45</td>
                                    <td class="py-3 px-4"><span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full font-bold">Optimal</span></td>
                                </tr>
                                <tr class="border-b border-outline-variant/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <td class="py-3 px-4 font-medium">Mathematics</td>
                                    <td class="py-3 px-4 opacity-70">28</td>
                                    <td class="py-3 px-4"><span class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 text-xs px-2 py-1 rounded-full font-bold">Understaffed</span></td>
                                </tr>
                                <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <td class="py-3 px-4 font-medium">Physics</td>
                                    <td class="py-3 px-4 opacity-70">30</td>
                                    <td class="py-3 px-4"><span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full font-bold">Optimal</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `,
        
        'SystemSet.html': `
            <section class="px-10 py-8">
                <div>
                    <span class="text-[#C5A059] font-bold text-[0.6875rem] uppercase tracking-widest mb-2 block">Configuration</span>
                    <h2 class="text-[1.75rem] font-black tracking-[-0.02em] leading-tight font-headline">System Settings</h2>
                </div>
            </section>
            <div class="flex-1 px-10 pb-10 overflow-auto">
                <div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-8 max-w-2xl">
                    <form id="settings-form" class="space-y-8">
                        <div>
                            <label class="block text-sm font-bold mb-2">Site Title</label>
                            <input type="text" id="site-title-input" value="AASTMT ARMS" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all dark:bg-white/5">
                        </div>
                        
                        <hr class="border-outline-variant/20">
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="font-bold">Dark Mode</h4>
                                <p class="text-sm opacity-70">Switch between light and dark theme.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="dark-mode-toggle" class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A1D37] dark:peer-checked:bg-[#C5A059]"></div>
                            </label>
                        </div>

                        <hr class="border-outline-variant/20">

                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="font-bold">Email Notifications</h4>
                                <p class="text-sm opacity-70">Receive daily digests and alerts.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="email-notif-toggle" class="sr-only peer" checked>
                                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A1D37] dark:peer-checked:bg-[#C5A059]"></div>
                            </label>
                        </div>
                        
                        <div class="pt-4 flex justify-end">
                            <button type="submit" class="bg-[#C5A059] text-[#0A1D37] px-6 py-2.5 rounded-lg font-bold shadow hover:brightness-110 transition-all">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        
        'Reports.html': `
            <section class="px-10 py-8">
                <div>
                    <span class="text-[#C5A059] font-bold text-[0.6875rem] uppercase tracking-widest mb-2 block">Logs & Archives</span>
                    <h2 class="text-[1.75rem] font-black tracking-[-0.02em] leading-tight font-headline">Reports</h2>
                </div>
            </section>
            <div class="flex-1 px-10 pb-10 overflow-auto">
                <div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-6 h-full flex flex-col">
                    <div class="relative w-full max-w-md mb-6">
                        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 opacity-50">search</span>
                        <input type="text" id="report-search" placeholder="Search reports by name..." class="bg-surface-container border border-outline-variant/50 rounded-lg w-full py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-[#C5A059] transition-all dark:bg-white/5">
                    </div>
                    
                    <div class="overflow-y-auto flex-1 space-y-3" id="reports-list">
                        <div class="report-item bg-surface flex items-center justify-between p-4 rounded-lg border border-outline-variant/20 hover:border-[#C5A059]/50 transition-colors dark:bg-white/5">
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-red-500 text-3xl">picture_as_pdf</span>
                                <div>
                                    <h4 class="font-bold report-title">Spring 2024 Faculty Attendance</h4>
                                    <p class="text-xs opacity-70">Generated: April 10, 2024</p>
                                </div>
                            </div>
                            <button class="dl-btn text-[#0A1D37] bg-primary-fixed hover:brightness-95 px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-all">
                                <span class="material-symbols-outlined text-sm">download</span> PDF
                            </button>
                        </div>
                        
                        <div class="report-item bg-surface flex items-center justify-between p-4 rounded-lg border border-outline-variant/20 hover:border-[#C5A059]/50 transition-colors dark:bg-white/5">
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-red-500 text-3xl">picture_as_pdf</span>
                                <div>
                                    <h4 class="font-bold report-title">Room Utilization Rates Q1</h4>
                                    <p class="text-xs opacity-70">Generated: April 02, 2024</p>
                                </div>
                            </div>
                            <button class="dl-btn text-[#0A1D37] bg-primary-fixed hover:brightness-95 px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-all">
                                <span class="material-symbols-outlined text-sm">download</span> PDF
                            </button>
                        </div>
                        
                        <div class="report-item bg-surface flex items-center justify-between p-4 rounded-lg border border-outline-variant/20 hover:border-[#C5A059]/50 transition-colors dark:bg-white/5">
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-red-500 text-3xl">picture_as_pdf</span>
                                <div>
                                    <h4 class="font-bold report-title">Financial Audit Briefing</h4>
                                    <p class="text-xs opacity-70">Generated: March 28, 2024</p>
                                </div>
                            </div>
                            <button class="dl-btn text-[#0A1D37] bg-primary-fixed hover:brightness-95 px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-all">
                                <span class="material-symbols-outlined text-sm">download</span> PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'BookingEForms.html': `
            <section class="px-10 py-8">
                <div>
                    <span class="text-[#C5A059] font-bold text-[0.6875rem] uppercase tracking-widest mb-2 block">Acquisitions</span>
                    <h2 class="text-[1.75rem] font-black tracking-[-0.02em] leading-tight font-headline">New Book Request</h2>
                </div>
            </section>
            <div class="flex-1 px-10 pb-10 overflow-auto">
                <div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-8 max-w-3xl">
                    <form id="book-request-form" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-bold mb-2">Book Title</label>
                                <input type="text" id="book-title" required placeholder="e.g. Clean Code" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all dark:bg-white/5">
                            </div>
                            <div>
                                <label class="block text-sm font-bold mb-2">Author</label>
                                <input type="text" id="book-author" required placeholder="e.g. Robert C. Martin" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all dark:bg-white/5">
                            </div>
                            <div>
                                <label class="block text-sm font-bold mb-2">Category</label>
                                <select id="book-category" required class="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all dark:bg-white/5">
                                    <option value="" disabled selected>Select Category</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Literature">Literature</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-bold mb-2">Urgency Level</label>
                                <div class="flex gap-4 mt-2">
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="urgency" value="Low" class="text-[#C5A059] focus:ring-[#C5A059]" checked>
                                        <span class="text-sm font-medium">Low</span>
                                    </label>
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="urgency" value="Medium" class="text-[#C5A059] focus:ring-[#C5A059]">
                                        <span class="text-sm font-medium">Medium</span>
                                    </label>
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="urgency" value="High" class="text-[#C5A059] focus:ring-[#C5A059]">
                                        <span class="text-sm font-medium text-red-600">High</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end pt-4 border-t border-outline-variant/20">
                            <button type="submit" class="bg-[#0A1D37] text-white px-8 py-3 rounded-lg font-bold shadow hover:brightness-125 dark:bg-[#C5A059] dark:text-[#0A1D37] transition-all flex items-center gap-2">
                                <span class="material-symbols-outlined">send</span> Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        
        'HelpCenter.html': `
            <section class="px-10 py-8">
                <div>
                    <span class="text-[#C5A059] font-bold text-[0.6875rem] uppercase tracking-widest mb-2 block">Support</span>
                    <h2 class="text-[1.75rem] font-black tracking-[-0.02em] leading-tight font-headline">Help Center / FAQ</h2>
                </div>
            </section>
            <div class="flex-1 px-10 pb-10 overflow-auto">
                <div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-8 max-w-3xl">
                    
                    <div class="space-y-4 mb-8">
                        <details class="group bg-surface rounded-lg border border-outline-variant/20 open:bg-surface-container-low transition-colors dark:bg-white/5">
                            <summary class="flex justify-between items-center font-bold cursor-pointer list-none p-4 select-none">
                                <span>How do I modify a booked room?</span>
                                <span class="transition group-open:rotate-180 material-symbols-outlined">expand_more</span>
                            </summary>
                            <div class="opacity-80 text-sm px-4 pb-4 leading-relaxed">
                                Navigate to the 'Bookings' section, search for your existing reservation, and click the 'Edit' icon. Note that changes must be made at least 24 hours in advance.
                            </div>
                        </details>
                        
                        <details class="group bg-surface rounded-lg border border-outline-variant/20 open:bg-surface-container-low transition-colors dark:bg-white/5">
                            <summary class="flex justify-between items-center font-bold cursor-pointer list-none p-4 select-none">
                                <span>How to download reports in Excel?</span>
                                <span class="transition group-open:rotate-180 material-symbols-outlined">expand_more</span>
                            </summary>
                            <div class="opacity-80 text-sm px-4 pb-4 leading-relaxed">
                                Currently, reports are primarily exported in PDF format. Excel exports will be available in the upcoming v2.1 update due next semester.
                            </div>
                        </details>
                        
                        <details class="group bg-surface rounded-lg border border-outline-variant/20 open:bg-surface-container-low transition-colors dark:bg-white/5">
                            <summary class="flex justify-between items-center font-bold cursor-pointer list-none p-4 select-none">
                                <span>What happens if a book request is rejected?</span>
                                <span class="transition group-open:rotate-180 material-symbols-outlined">expand_more</span>
                            </summary>
                            <div class="opacity-80 text-sm px-4 pb-4 leading-relaxed">
                                You will receive an email notification detailing the reason for rejection (e.g., budget limits, available in local library) and suggested alternatives.
                            </div>
                        </details>
                    </div>
                    
                    <div class="bg-[#0A1D37] rounded-xl p-6 text-center text-white border border-[#C5A059]/20 shadow-lg relative overflow-hidden">
                        <div class="absolute inset-0 bg-[#C5A059] opacity-5 pointer-events-none mix-blend-overlay"></div>
                        <h3 class="font-bold mb-2 text-lg">Still need help?</h3>
                        <p class="text-sm text-white/70 mb-4 font-medium">Our support team is available from 9 AM to 5 PM, Sunday through Thursday.</p>
                        <button id="contact-support-btn" class="bg-[#C5A059] text-[#0A1D37] px-8 py-2.5 rounded-lg font-bold hover:brightness-110 active:scale-95 shadow-md transition-all flex items-center gap-2 mx-auto">
                            <span class="material-symbols-outlined text-[20px]">mail</span> Contact Support
                        </button>
                    </div>
                </div>
            </div>
        `
    ,
        'PendingRequest.html': `
<div class="p-12 max-w-7xl mx-auto">
            <div class="flex justify-between items-end mb-12">
                <div>
                    <p class="text-[0.6875rem] font-bold text-secondary uppercase tracking-[0.05em] mb-2">Administrative
                        Suite</p>
                    <h2 class="text-[1.75rem] font-black text-primary leading-tight tracking-[-0.02em]">Pending Requests
                        Management</h2>
                </div>
                <div class="flex gap-3">
                    <button
                        class="bg-surface-container-high text-on-surface-variant px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
                        <span class="material-symbols-outlined text-lg">filter_list</span>
                        Filter
                    </button>
                    <button
                        class="bg-surface-container-high text-on-surface-variant px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
                        <span class="material-symbols-outlined text-lg">download</span>
                        Export CSV
                    </button>
                </div>
            </div>
            <!-- Bento Layout Container -->
            <div class="grid grid-cols-12 gap-8">
                <!-- Main Request Table Section -->
                <div class="col-span-12 lg:col-span-9">
                    <div
                        class="bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_rgba(10,29,55,0.04)] overflow-hidden">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-primary-container text-white">
                                    <th class="px-8 py-5 text-[0.6875rem] font-bold uppercase tracking-wider">Requester
                                        Name</th>
                                    <th class="px-8 py-5 text-[0.6875rem] font-bold uppercase tracking-wider">Room Type
                                    </th>
                                    <th class="px-8 py-5 text-[0.6875rem] font-bold uppercase tracking-wider">Date</th>
                                    <th class="px-8 py-5 text-[0.6875rem] font-bold uppercase tracking-wider">Time</th>
                                    <th
                                        class="px-8 py-5 text-[0.6875rem] font-bold uppercase tracking-wider text-right">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant/10">
                                <!-- Row 1 -->
                                <tr class="hover:bg-surface-container-low transition-colors group">
                                    <td class="px-8 py-6">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-on-primary-fixed text-xs">
                                                DA</div>
                                            <div>
                                                <p class="text-sm font-bold text-on-surface">Dr. Ahmed El-Sayed</p>
                                                <p class="text-[0.6875rem] text-on-surface-variant">Engineering Faculty
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <span
                                            class="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[0.6875rem] font-bold uppercase">Lecture
                                            Hall A</span>
                                    </td>
                                    <td class="px-8 py-6 text-sm text-on-surface-variant font-medium">Oct 24, 2023</td>
                                    <td class="px-8 py-6 text-sm text-on-surface-variant font-medium">09:00 - 11:00</td>
                                    <td class="px-8 py-6">
                                        <div
                                            class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                class="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                                                title="Approve">
                                                <span class="material-symbols-outlined">check_circle</span>
                                            </button>
                                            <button
                                                class="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                                                title="Reject">
                                                <span class="material-symbols-outlined">cancel</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Row 2 -->
                                <tr
                                    class="bg-surface-container-low/30 hover:bg-surface-container-low transition-colors group">
                                    <td class="px-8 py-6">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed text-xs">
                                                SM</div>
                                            <div>
                                                <p class="text-sm font-bold text-on-surface">Prof. Sarah Mansour</p>
                                                <p class="text-[0.6875rem] text-on-surface-variant">Computer Science</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <span
                                            class="px-3 py-1 rounded-full bg-secondary-fixed-dim text-on-secondary-fixed-variant text-[0.6875rem] font-bold uppercase">Computing
                                            Lab 4</span>
                                    </td>
                                    <td class="px-8 py-6 text-sm text-on-surface-variant font-medium">Oct 25, 2023</td>
                                    <td class="px-8 py-6 text-sm text-on-surface-variant font-medium">13:00 - 15:30</td>
                                    <td class="px-8 py-6">
                                        <div
                                            class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                class="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                                                <span class="material-symbols-outlined">check_circle</span>
                                            </button>
                                            <button
                                                class="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors">
                                                <span class="material-symbols-outlined">cancel</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Row 3 -->
                                <tr class="hover:bg-surface-container-low transition-colors group">
                                    <td class="px-8 py-6">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-on-tertiary-fixed text-xs">
                                                KH</div>
                                            <div>
                                                <p class="text-sm font-bold text-on-surface">Karim Hassan</p>
                                                <p class="text-[0.6875rem] text-on-surface-variant">Student Council</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <span
                                            class="px-3 py-1 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant text-[0.6875rem] font-bold uppercase">Conference
                                            Room</span>
                                    </td>
                                    <td class="px-8 py-6 text-sm text-on-surface-variant font-medium">Oct 26, 2023</td>
                                    <td class="px-8 py-6 text-sm text-on-surface-variant font-medium">10:00 - 12:00</td>
                                    <td class="px-8 py-6">
                                        <div
                                            class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                class="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                                                <span class="material-symbols-outlined">check_circle</span>
                                            </button>
                                            <button
                                                class="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors">
                                                <span class="material-symbols-outlined">cancel</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Row 4 -->
                                <tr
                                    class="bg-surface-container-low/30 hover:bg-surface-container-low transition-colors group">
                                    <td class="px-8 py-6">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center font-bold text-on-primary-fixed-variant text-xs">
                                                OM</div>
                                            <div>
                                                <p class="text-sm font-bold text-on-surface">Omar Mahmoud</p>
                                                <p class="text-[0.6875rem] text-on-surface-variant">Logistics Dept.</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <span
                                            class="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[0.6875rem] font-bold uppercase">Main
                                            Auditorium</span>
                                    </td>
                                    <td class="px-8 py-6 text-sm text-on-surface-variant font-medium">Oct 27, 2023</td>
                                    <td class="px-8 py-6 text-sm text-on-surface-variant font-medium">15:00 - 18:00</td>
                                    <td class="px-8 py-6">
                                        <div
                                            class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                class="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                                                <span class="material-symbols-outlined">check_circle</span>
                                            </button>
                                            <button
                                                class="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors">
                                                <span class="material-symbols-outlined">cancel</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Table Footer / Pagination -->
                        <div class="px-8 py-5 flex items-center justify-between border-t border-outline-variant/10">
                            <p class="text-xs text-on-surface-variant font-medium">Showing <span
                                    class="text-primary">1-4</span> of <span class="text-primary">12</span> pending
                                requests</p>
                            <div class="flex gap-2">
                                <button
                                    class="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant">
                                    <span class="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <button
                                    class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-container text-white text-xs font-bold">1</button>
                                <button
                                    class="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant text-xs font-bold">2</button>
                                <button
                                    class="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant text-xs font-bold">3</button>
                                <button
                                    class="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant">
                                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Action Sidebar / Stats Bento -->
                <div class="col-span-12 lg:col-span-3 space-y-8">
                    <!-- Statistics Card -->
                    <div class="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_12px_32px_rgba(10,29,55,0.04)]">
                        <h3 class="text-sm font-bold text-primary mb-6 flex items-center gap-2">
                            <span class="material-symbols-outlined text-secondary"
                                style="font-variation-settings: 'FILL' 1;">analytics</span>
                            Queue Insight
                        </h3>
                        <div class="space-y-6">
                            <div>
                                <div class="flex justify-between items-end mb-2">
                                    <span
                                        class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Response
                                        Rate</span>
                                    <span class="text-sm font-black text-primary">84%</span>
                                </div>
                                <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                                    <div class="h-full bg-secondary w-[84%]"></div>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="p-3 rounded-lg bg-primary-fixed/30">
                                    <p class="text-[0.6rem] font-bold text-on-primary-fixed-variant uppercase mb-1">Avg.
                                        Wait</p>
                                    <p class="text-lg font-black text-on-primary-fixed">14m</p>
                                </div>
                                <div class="p-3 rounded-lg bg-secondary-fixed/30">
                                    <p class="text-[0.6rem] font-bold text-on-secondary-fixed-variant uppercase mb-1">
                                        Capacity</p>
                                    <p class="text-lg font-black text-on-secondary-fixed">92%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Quick Actions / Selection Info -->
                    <div
                        class="bg-primary-container p-6 rounded-xl shadow-[0px_12px_32px_rgba(10,29,55,0.04)] text-white relative overflow-hidden group">
                        <div
                            class="absolute top-0 right-0 p-4 opacity-10 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                            <span class="material-symbols-outlined text-8xl">verified_user</span>
                        </div>
                        <h3 class="text-sm font-bold mb-4 relative z-10">Bulk Selection</h3>
                        <p class="text-xs text-white/70 mb-6 relative z-10 leading-relaxed">No requests selected. Select
                            multiple rows to perform batch approvals or rejection actions.</p>
                        <div class="space-y-3 relative z-10">
                            <button
                                class="w-full py-3 bg-white/10 border border-white/20 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors disabled:opacity-50"
                                disabled="">
                                Approve All Selected
                            </button>
                            <button
                                class="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-red-500/20 hover:border-red-500/40 transition-colors disabled:opacity-50"
                                disabled="">
                                Reject All Selected
                            </button>
                        </div>
                    </div>
                    <!-- Campus Map Card -->
                    <div class="rounded-xl overflow-hidden shadow-[0px_12px_32px_rgba(10,29,55,0.04)] h-48 relative">
                        <img alt="Campus Map" class="w-full h-full object-cover"
                            data-alt="high-angle architectural blueprint of a modern university campus layout with clean geometric lines"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARgFUa1zvj38P6AR0IZzU8ay8QxLBaBkWenGM3i6akANPMYWcerDSufdTme_vNdowAg3NzyLFGYoP8-UVmLm2wujdvLVnvy_iX8X25TgLdyX_WmvETrUJW5vJhy2KcKhi3q03rpJAoiTPn61s9kIKzo5OlLuMbO722xPlDTQ3ffzue8X1-dMH0BdMOF3ihlDxjXsaVsvnXyZEuWCFx17lBXXYYSaTd5vVhDpuVmwarm7B7wv00s6NhKVRY2kb4cpExc9hVSzueMs9v" />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent flex items-end p-4">
                            <div>
                                <p class="text-[0.6rem] font-bold text-secondary uppercase mb-1">Active Hub</p>
                                <p class="text-xs text-white font-medium">Alexandria Main Campus</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`,
        'EmployeeSecretaryView.html': `
<div class="p-8 lg:p-12 max-w-7xl mx-auto w-full space-y-12">
            <!-- Hero Section / Breadcrumb -->
            <section class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 class="text-[3.5rem] font-black text-primary tracking-tight leading-[1.1] mb-2">Welcome Back,
                        Sarah.</h2>
                    <p class="text-on-surface-variant font-medium max-w-md">You have <span
                            class="text-secondary font-bold">12 pending tasks</span> that require your attention before
                        the weekend.</p>
                </div>
                <div class="flex gap-3">
                    <div class="bg-surface-container-high px-4 py-2 rounded-lg flex items-center gap-2">
                        <span class="material-symbols-outlined text-on-surface-variant"
                            data-icon="calendar_today">calendar_today</span>
                        <span class="text-sm font-bold text-on-surface">Oct 24, 2023</span>
                    </div>
                </div>
            </section>
            <!-- Bento Grid Stats -->
            <section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <!-- Status: Pending -->
                <div
                    class="md:col-span-2 lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(10,29,55,0.04)] border-l-8 border-secondary-container flex flex-col justify-between h-64">
                    <div class="flex justify-between items-start">
                        <div>
                            <span
                                class="text-[0.6875rem] font-black uppercase tracking-[0.1em] text-on-secondary-container bg-secondary-container/30 px-3 py-1 rounded-full">In
                                Review</span>
                            <h3 class="text-2xl font-bold text-primary mt-4">Pending Requests</h3>
                        </div>
                        <span class="material-symbols-outlined text-4xl text-on-secondary-container/40"
                            data-icon="hourglass_empty">hourglass_empty</span>
                    </div>
                    <div class="flex items-baseline gap-4">
                        <span class="text-[5rem] font-black text-primary leading-none">24</span>
                        <div class="pb-3">
                            <p class="text-sm font-bold text-error flex items-center gap-1">
                                <span class="material-symbols-outlined text-sm"
                                    data-icon="trending_up">trending_up</span>
                                +8%
                            </p>
                            <p class="text-xs text-on-surface-variant font-medium">Since last Monday</p>
                        </div>
                    </div>
                </div>
                <!-- Status: Approved -->
                <div
                    class="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(10,29,55,0.04)] flex flex-col justify-between h-64 hover:bg-surface-container transition-colors cursor-pointer group">
                    <div>
                        <div
                            class="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-6 group-hover:bg-primary-container group-hover:text-white transition-colors">
                            <span class="material-symbols-outlined" data-icon="task_alt">task_alt</span>
                        </div>
                        <h3 class="text-lg font-bold text-primary">Approved</h3>
                        <p class="text-sm text-on-surface-variant mt-1">Successfully booked</p>
                    </div>
                    <p class="text-4xl font-black text-primary">142</p>
                </div>
                <!-- Status: Rejected -->
                <div
                    class="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_12px_32px_rgba(10,29,55,0.04)] flex flex-col justify-between h-64 hover:bg-surface-container transition-colors cursor-pointer group">
                    <div>
                        <div
                            class="w-12 h-12 rounded-lg bg-error-container flex items-center justify-center text-on-error-container mb-6 group-hover:bg-error group-hover:text-white transition-colors">
                            <span class="material-symbols-outlined" data-icon="cancel">cancel</span>
                        </div>
                        <h3 class="text-lg font-bold text-primary">Rejected</h3>
                        <p class="text-sm text-on-surface-variant mt-1">Conflicts detected</p>
                    </div>
                    <p class="text-4xl font-black text-primary">09</p>
                </div>
            </section>
            <!-- Tonal Layers: Bottom Asymmetric Content -->
            <section class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <!-- Recent Activity Feed (Editorial Table Style) -->
                <div class="lg:col-span-2 space-y-8">
                    <div class="flex justify-between items-center">
                        <h4 class="text-xl font-bold tracking-tight text-primary">Priority Queue</h4>
                        <button
                            class="text-sm font-bold text-secondary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View
                            All Logs</button>
                    </div>
                    <div class="space-y-4">
                        <!-- Activity Item 1 -->
                        <div
                            class="flex items-center gap-6 p-6 bg-surface-container-low rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white">
                                <img alt="Avatar" class="w-full h-full object-cover"
                                    data-alt="close up headshot of a male professor with glasses and a thoughtful expression"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8fyZ0xA5vUT4Ig2v3EHKY_7WJQ8yeaBQAK5JH1ltaKNZYgYNCNiKhMZNnn4SXf6oFz4_sjqeQh1AxZa4YmgsRXAuGMQ2AK0sEs4J6c9ag5-A1-X9FBuQZPoJ8qpYSKeHlNRUiRLFm4TR0572hhvmiMdvL5A9mPTwnjUi1NHr5842zqJt8x8xOiXdZaRdjzY8A4UTHWHBRWg1FcLIqfS1dMoK8u3yFbQ148Z8rGL3DH9q0GWfF8CiM8bNZenvLfurjY5wNSOMbf0Eq" />
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-start">
                                    <h5 class="font-bold text-primary">Dr. Michael Chen</h5>
                                    <span
                                        class="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest">2m
                                        ago</span>
                                </div>
                                <p class="text-sm text-on-surface-variant">Requesting Lab 402 for Physics Seminar</p>
                                <div class="mt-2 flex gap-2">
                                    <span
                                        class="text-[10px] font-bold bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded uppercase">Urgent</span>
                                    <span
                                        class="text-[10px] font-bold bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded uppercase">Room
                                        Conflict</span>
                                </div>
                            </div>
                            <button
                                class="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-white transition-colors">
                                <span class="material-symbols-outlined text-lg"
                                    data-icon="chevron_right">chevron_right</span>
                            </button>
                        </div>
                        <!-- Activity Item 2 -->
                        <div
                            class="flex items-center gap-6 p-6 bg-surface-container-low rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white">
                                <img alt="Avatar" class="w-full h-full object-cover"
                                    data-alt="professional photo of a smiling female department head in a modern academic setting"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMhcyyZFPUEInifGEC7iSYaC4KpjlxKVJDLnNDeguXf6iR7DSuOoEeeYTpuf0Y8vzCcVcu2FyFk0o6ZzpQeX5T5q3DL6RLTRRgU6AXO3k-luHDcxB1whh-b6BOoJ2TZYW7PjwIHnHNkBmcuyV_AijcCPSQFXr45P8mLtRJ5OZEpUeig-3nfg7OPso6iEUSQz1VHaaFMSaZOa-EkRg8e3qLD0s_oG05UZM5iWo8Qb6PIbSJDphqalolG064YRsZ_NP6DxqJHl2rppsK" />
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-start">
                                    <h5 class="font-bold text-primary">Prof. Elena Rodriguez</h5>
                                    <span
                                        class="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest">15m
                                        ago</span>
                                </div>
                                <p class="text-sm text-on-surface-variant">Annual Board Meeting - Main Auditorium</p>
                                <div class="mt-2 flex gap-2">
                                    <span
                                        class="text-[10px] font-bold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded uppercase">VIP
                                        Request</span>
                                </div>
                            </div>
                            <button
                                class="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-white transition-colors">
                                <span class="material-symbols-outlined text-lg"
                                    data-icon="chevron_right">chevron_right</span>
                            </button>
                        </div>
                        <!-- Activity Item 3 -->
                        <div
                            class="flex items-center gap-6 p-6 bg-surface-container-low rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white">
                                <img alt="Avatar" class="w-full h-full object-cover"
                                    data-alt="portrait of a young male administrator in a clean white shirt against a neutral background"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1EaXb48lVDXEqkMb9j2Icx6F5Zm8lsDTWQBfTRk4oP1LyIqlD118nBDfLnhUel2I7yQyoxAZ59XU8JJ_ECzk5dt2yzRJTHsSxmLtWaYruR7yhSNb4-qdjGD2MsC7eiPv1nbbpEN57zTPsXcAquGGcTFhFGpDFHY3VzYZrFEazHF7L3vC7B65qdT9Afl_65RsG33LZdoPnparIl2W-BhmeVPoodXz_4ktehVHcWbKecsGaDYB9aRCW1oLXqUyFrzVJj68OOsl3Y7TR" />
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-start">
                                    <h5 class="font-bold text-primary">David Wilson</h5>
                                    <span
                                        class="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest">1h
                                        ago</span>
                                </div>
                                <p class="text-sm text-on-surface-variant">External Seminar: Tech Innovations 2024</p>
                                <div class="mt-2 flex gap-2">
                                    <span
                                        class="text-[10px] font-bold bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded uppercase">External
                                        Body</span>
                                </div>
                            </div>
                            <button
                                class="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-white transition-colors">
                                <span class="material-symbols-outlined text-lg"
                                    data-icon="chevron_right">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Secondary Info Card (Glassmorphism inspired) -->
                <div class="space-y-6">
                    <div class="bg-[#0A1D37] text-white p-8 rounded-3xl relative overflow-hidden">
                        <!-- Abstract Texture -->
                        <div class="absolute -right-12 -top-12 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
                        <div
                            class="absolute -left-12 -bottom-12 w-32 h-32 bg-primary-fixed-dim/10 rounded-full blur-2xl">
                        </div>
                        <div class="relative z-10">
                            <span class="material-symbols-outlined text-secondary text-4xl mb-4"
                                data-icon="auto_awesome">auto_awesome</span>
                            <h4 class="text-2xl font-bold mb-4 leading-tight">Branch Utilization High</h4>
                            <p class="text-white/70 text-sm mb-6 leading-relaxed">The Alexandria Branch is currently at
                                94% capacity for tomorrow. Consider rerouting non-critical requests to the Engineering
                                Hall.</p>
                            <button
                                class="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors border border-white/10 backdrop-blur-md">
                                Generate Capacity Report
                            </button>
                        </div>
                    </div>
                    <!-- Shortcut Cards -->
                    <div class="grid grid-cols-2 gap-4">
                        <div
                            class="bg-surface-container-high p-6 rounded-2xl hover:bg-secondary-fixed transition-colors cursor-pointer group">
                            <span
                                class="material-symbols-outlined text-secondary mb-3 block group-hover:scale-110 transition-transform"
                                data-icon="quick_reference_all">quick_reference_all</span>
                            <p class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Policy</p>
                            <p class="text-sm font-bold text-primary mt-1">Resource Guide</p>
                        </div>
                        <div
                            class="bg-surface-container-high p-6 rounded-2xl hover:bg-secondary-fixed transition-colors cursor-pointer group">
                            <span
                                class="material-symbols-outlined text-secondary mb-3 block group-hover:scale-110 transition-transform"
                                data-icon="support_agent">support_agent</span>
                            <p class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Direct</p>
                            <p class="text-sm font-bold text-primary mt-1">Contact Dean</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
`,
        'BranchManagerPortal.html': `
<div class="pt-24 px-12 pb-12">
            <!-- Executive Hero Section -->
            <div class="mb-12 flex justify-between items-end">
                <div>
                    <h3 class="text-[3.5rem] font-black tracking-[-0.03em] leading-none text-primary-container mb-4">
                        Pending <span class="text-secondary font-medium italic">Approvals.</span>
                    </h3>
                    <p class="text-on-surface-variant max-w-xl text-lg leading-relaxed">
                        You have <span class="font-bold text-primary">8 pending signatures</span> for Multi-Purpose Room
                        requests previously vetted by Administration. Finalize or modify to commit to the schedule.
                    </p>
                </div>
                <div class="flex gap-4 mb-2">
                    <div class="p-6 bg-surface-container-low rounded-xl text-right">
                        <p class="text-on-surface-variant text-xs uppercase tracking-widest font-semibold mb-1">Queue
                            Health</p>
                        <p class="text-2xl font-bold text-primary-container">Optimum</p>
                    </div>
                    <div class="p-6 bg-[#C5A059]/10 rounded-xl text-right border-r-4 border-secondary">
                        <p class="text-secondary text-xs uppercase tracking-widest font-semibold mb-1">Response Time</p>
                        <p class="text-2xl font-bold text-secondary">4.2h Avg.</p>
                    </div>
                </div>
            </div>
            <!-- Bento Grid Layout for Requests -->
            <div class="space-y-6">
                <!-- Request Header Legend -->
                <div
                    class="grid grid-cols-12 px-8 py-4 bg-primary-container text-white rounded-t-xl text-[0.6875rem] font-bold uppercase tracking-[0.1em]">
                    <div class="col-span-4">Request Details &amp; Venue</div>
                    <div class="col-span-2">Department</div>
                    <div class="col-span-2">Time Slot</div>
                    <div class="col-span-2">Status Marker</div>
                    <div class="col-span-2 text-right">Executive Actions</div>
                </div>
                <!-- Request Rows -->
                <div class="space-y-4">
                    <!-- Row 1 -->
                    <div
                        class="grid grid-cols-12 items-center px-8 py-6 bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_rgba(10,29,55,0.04)] group hover:translate-y-[-2px] transition-transform duration-300">
                        <div class="col-span-4 flex items-center gap-6">
                            <div
                                class="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                                <span class="material-symbols-outlined text-3xl">meeting_room</span>
                            </div>
                            <div>
                                <h4 class="text-base font-bold text-primary-container tracking-tight">Executive Hall A1
                                </h4>
                                <p class="text-xs text-on-surface-variant">Annual Academic Symposium 2024</p>
                            </div>
                        </div>
                        <div class="col-span-2">
                            <span
                                class="text-xs font-semibold px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full">Engineering</span>
                        </div>
                        <div class="col-span-2">
                            <p class="text-sm font-bold text-primary-container">Mar 24, 2024</p>
                            <p class="text-[10px] text-on-surface-variant uppercase tracking-wide">09:00 AM - 02:00 PM
                            </p>
                        </div>
                        <div class="col-span-2">
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></div>
                                <span class="text-[10px] font-bold text-secondary uppercase tracking-widest">Admin
                                    Approved</span>
                            </div>
                        </div>
                        <div class="col-span-2 flex justify-end gap-3">
                            <button
                                class="p-2.5 rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors group/btn">
                                <span
                                    class="material-symbols-outlined text-lg text-on-surface-variant group-hover/btn:text-primary">edit</span>
                            </button>
                            <button
                                class="px-6 py-2.5 bg-primary-container text-white text-xs font-bold rounded-lg shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2">
                                <span>Final Approve</span>
                                <span class="material-symbols-outlined text-sm">verified_user</span>
                            </button>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div
                        class="grid grid-cols-12 items-center px-8 py-6 bg-surface-container-low/50 rounded-xl group transition-all">
                        <div class="col-span-4 flex items-center gap-6">
                            <div
                                class="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                                <span class="material-symbols-outlined text-3xl">hub</span>
                            </div>
                            <div>
                                <h4 class="text-base font-bold text-primary-container tracking-tight">Innovation Hub Lab
                                </h4>
                                <p class="text-xs text-on-surface-variant">AI Ethics Seminar Series</p>
                            </div>
                        </div>
                        <div class="col-span-2">
                            <span
                                class="text-xs font-semibold px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full">Computing</span>
                        </div>
                        <div class="col-span-2">
                            <p class="text-sm font-bold text-primary-container">Mar 25, 2024</p>
                            <p class="text-[10px] text-on-surface-variant uppercase tracking-wide">11:00 AM - 01:00 PM
                            </p>
                        </div>
                        <div class="col-span-2">
                            <div class="flex items-center gap-2 text-on-primary-container">
                                <div class="w-2 h-2 rounded-full bg-secondary-fixed-dim"></div>
                                <span class="text-[10px] font-bold uppercase tracking-widest">Awaiting Signature</span>
                            </div>
                        </div>
                        <div class="col-span-2 flex justify-end gap-3 opacity-80 hover:opacity-100 transition-opacity">
                            <button
                                class="p-2.5 rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors">
                                <span class="material-symbols-outlined text-lg text-on-surface-variant">edit</span>
                            </button>
                            <button
                                class="px-6 py-2.5 bg-primary-container text-white text-xs font-bold rounded-lg shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                                <span>Final Approve</span>
                                <span class="material-symbols-outlined text-sm">verified_user</span>
                            </button>
                        </div>
                    </div>
                    <!-- Row 3 -->
                    <div
                        class="grid grid-cols-12 items-center px-8 py-6 bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_rgba(10,29,55,0.04)] group hover:translate-y-[-2px] transition-transform duration-300 border-l-4 border-secondary/20">
                        <div class="col-span-4 flex items-center gap-6">
                            <div
                                class="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                                <span class="material-symbols-outlined text-3xl">groups</span>
                            </div>
                            <div>
                                <h4 class="text-base font-bold text-primary-container tracking-tight">Grand Theatre Hall
                                </h4>
                                <p class="text-xs text-on-surface-variant">New Faculty Orientation</p>
                            </div>
                        </div>
                        <div class="col-span-2">
                            <span
                                class="text-xs font-semibold px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full">HR
                                &amp; Admin</span>
                        </div>
                        <div class="col-span-2">
                            <p class="text-sm font-bold text-primary-container">Mar 27, 2024</p>
                            <p class="text-[10px] text-on-surface-variant uppercase tracking-wide">08:00 AM - 04:00 PM
                            </p>
                        </div>
                        <div class="col-span-2">
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></div>
                                <span class="text-[10px] font-bold text-secondary uppercase tracking-widest">Priority
                                    Approval</span>
                            </div>
                        </div>
                        <div class="col-span-2 flex justify-end gap-3">
                            <button
                                class="p-2.5 rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors group/btn">
                                <span
                                    class="material-symbols-outlined text-lg text-on-surface-variant group-hover/btn:text-primary">edit</span>
                            </button>
                            <button
                                class="px-6 py-2.5 bg-[#C5A059] text-primary-container text-xs font-bold rounded-lg shadow-lg hover:shadow-xl hover:bg-amber-400 transition-all flex items-center gap-2">
                                <span>Final Approve</span>
                                <span class="material-symbols-outlined text-sm">verified_user</span>
                            </button>
                        </div>
                    </div>
                    <!-- Row 4 -->
                    <div
                        class="grid grid-cols-12 items-center px-8 py-6 bg-surface-container-low/50 rounded-xl group transition-all">
                        <div class="col-span-4 flex items-center gap-6">
                            <div
                                class="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                                <span class="material-symbols-outlined text-3xl">podcasts</span>
                            </div>
                            <div>
                                <h4 class="text-base font-bold text-primary-container tracking-tight">Media Suite Room
                                    04</h4>
                                <p class="text-xs text-on-surface-variant">Marketing Campaign Workshop</p>
                            </div>
                        </div>
                        <div class="col-span-2">
                            <span
                                class="text-xs font-semibold px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full">Language
                                Dept</span>
                        </div>
                        <div class="col-span-2">
                            <p class="text-sm font-bold text-primary-container">Mar 28, 2024</p>
                            <p class="text-[10px] text-on-surface-variant uppercase tracking-wide">01:00 PM - 03:30 PM
                            </p>
                        </div>
                        <div class="col-span-2">
                            <div class="flex items-center gap-2 text-on-primary-container">
                                <div class="w-2 h-2 rounded-full bg-secondary-fixed-dim"></div>
                                <span class="text-[10px] font-bold uppercase tracking-widest">Vetted by Admin</span>
                            </div>
                        </div>
                        <div class="col-span-2 flex justify-end gap-3">
                            <button
                                class="p-2.5 rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors">
                                <span class="material-symbols-outlined text-lg text-on-surface-variant">edit</span>
                            </button>
                            <button
                                class="px-6 py-2.5 bg-primary-container text-white text-xs font-bold rounded-lg shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                                <span>Final Approve</span>
                                <span class="material-symbols-outlined text-sm">verified_user</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Dashboard Analytics Bottom Section -->
            <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Approval Velocity Card -->
                <div class="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group">
                    <div class="relative z-10">
                        <h5 class="text-sm font-bold text-primary-container uppercase tracking-widest mb-6">Daily
                            Throughput</h5>
                        <div class="flex items-end gap-1 h-32 mb-6">
                            <div
                                class="flex-1 bg-secondary/20 rounded-t h-[40%] group-hover:h-[50%] transition-all duration-700">
                            </div>
                            <div
                                class="flex-1 bg-secondary/20 rounded-t h-[60%] group-hover:h-[70%] transition-all duration-700">
                            </div>
                            <div
                                class="flex-1 bg-secondary rounded-t h-[80%] group-hover:h-[90%] transition-all duration-700">
                            </div>
                            <div
                                class="flex-1 bg-secondary/20 rounded-t h-[30%] group-hover:h-[40%] transition-all duration-700">
                            </div>
                            <div
                                class="flex-1 bg-secondary/20 rounded-t h-[50%] group-hover:h-[60%] transition-all duration-700">
                            </div>
                        </div>
                        <p class="text-xs text-on-surface-variant">Overall approval speed has increased by <span
                                class="text-primary font-bold">12%</span> this week.</p>
                    </div>
                    <div class="absolute -right-4 -bottom-4 opacity-5">
                        <span class="material-symbols-outlined text-[120px]">bolt</span>
                    </div>
                </div>
                <!-- Strategic Summary Bento -->
                <div
                    class="col-span-2 bg-primary-container p-8 rounded-2xl flex items-center justify-between overflow-hidden relative">
                    <div class="max-w-md z-10">
                        <span
                            class="text-secondary-fixed-dim text-[10px] font-bold uppercase tracking-[0.2em]">Institutional
                            Health</span>
                        <h5 class="text-2xl font-bold text-white mt-2 mb-4 leading-snug">Multi-Purpose Rooms are
                            currently at 88% capacity for next week.</h5>
                        <div class="flex gap-8">
                            <div>
                                <p class="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Confirmed
                                </p>
                                <p class="text-2xl font-bold text-white">42</p>
                            </div>
                            <div>
                                <p class="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">In
                                    Pipeline</p>
                                <p class="text-2xl font-bold text-[#C5A059]">08</p>
                            </div>
                            <div>
                                <p class="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Conflicts
                                </p>
                                <p class="text-2xl font-bold text-error">00</p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-48 h-48 rounded-full border border-white/5 absolute -right-12 flex items-center justify-center">
                        <div class="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center">
                            <div class="w-16 h-16 rounded-full bg-[#C5A059]/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-[#C5A059] text-3xl"
                                    style="font-variation-settings: 'FILL' 1;">insights</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`,
};

    // Find all sidebar navigation links
    const navLinks = document.querySelectorAll('aside nav a, aside .space-y-1 a');
    
    // Also grab the specific 'New Booking Request' button directly
    const newBookingBtn = document.querySelector('aside .mt-auto button');

    // Make state active highlighting reusable
    const setActiveLink = (targetHref) => {
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Check matching
            if (linkHref === targetHref) {
                // Set active style
                link.className = 'flex items-center gap-4 border-l-4 border-[#C5A059] bg-white/5 text-[#C5A059] font-bold py-3 px-6 transition-all duration-200 translate-x-1';
            } else {
                // Revert to generic style
                link.className = 'flex items-center gap-4 text-slate-300 hover:text-white py-3 px-6 hover:bg-white/10 transition-all duration-200';
            }
        });
    }

    // Bind specific JS functionality based on the injected page
    const bindPageLogic = (pageName) => {
        if (pageName === 'SystemSet.html') {
            const darkToggle = document.getElementById('dark-mode-toggle');
            const htmlTag = document.documentElement;
            
            if (darkToggle) {
                // set initial state
                if (htmlTag.classList.contains('dark')) {
                    darkToggle.checked = true;
                }
                
                darkToggle.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        htmlTag.classList.add('dark');
                        htmlTag.classList.remove('light');
                    } else {
                        htmlTag.classList.add('light');
                        htmlTag.classList.remove('dark');
                    }
                });
            }

            const formElement = document.getElementById('settings-form');
            if (formElement) {
                formElement.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const siteTitleInput = document.getElementById('site-title-input');
                    const siteTitle = siteTitleInput ? siteTitleInput.value : 'Unknown';
                    alert('Settings saved successfully!\\nNew Site Title: ' + siteTitle);
                });
            }
        }
        
        else if (pageName === 'Reports.html') {
            const searchInput = document.getElementById('report-search');
            const reportItems = document.querySelectorAll('.report-item');
            
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const term = e.target.value.toLowerCase();
                    reportItems.forEach(item => {
                        const titleEl = item.querySelector('.report-title');
                        if (titleEl) {
                            const title = titleEl.textContent.toLowerCase();
                            if (title.includes(term)) {
                                item.style.display = 'flex';
                            } else {
                                item.style.display = 'none';
                            }
                        }
                    });
                });
            }

            document.querySelectorAll('.dl-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    alert('Downloading PDF report...');
                });
            });
        }

        else if (pageName === 'BookingEForms.html') {
            const bookForm = document.getElementById('book-request-form');
            if (bookForm) {
                bookForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const titleEl = document.getElementById('book-title');
                    const authorEl = document.getElementById('book-author');
                    const categoryEl = document.getElementById('book-category');
                    const urgencyEl = document.querySelector('input[name="urgency"]:checked');
                    
                    const title = titleEl ? titleEl.value : '';
                    const author = authorEl ? authorEl.value : '';
                    const category = categoryEl ? categoryEl.value : '';
                    const urgency = urgencyEl ? urgencyEl.value : 'Low';
                    
                    alert('Book Request Submitted:\\n\\nTitle: ' + title + '\\nAuthor: ' + author + '\\nCategory: ' + category + '\\nUrgency: ' + urgency);
                    bookForm.reset();
                });
            }
        }

        else if (pageName === 'HelpCenter.html') {
            const supportBtn = document.getElementById('contact-support-btn');
            if (supportBtn) {
                supportBtn.addEventListener('click', () => {
                    alert('Opening support email client...');
                });
            }
        }
    };

    // Generic view switcher
    const switchView = (pageName) => {
        if (!mainContent) return;
        
        // Log Out is a special case
        if (pageName === 'Login.html') {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = 'Login.html';
            return;
        }

        // Render the content mapped
        if (pageContents[pageName]) {
            mainContent.innerHTML = pageContents[pageName];
            setActiveLink(pageName);
            bindPageLogic(pageName);
        } else {
            // Fallback for missing pages
            mainContent.innerHTML = '<div class="flex-1 flex items-center justify-center h-full"><h2 class="text-2xl font-bold opacity-50">Content for ' + pageName + ' is under construction.</h2></div>';
            setActiveLink(pageName);
        }
    };

    // Attach SPA event listeners to Sidebar Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetHref = link.getAttribute('href');
            if (targetHref && targetHref !== '#') {
                e.preventDefault(); // Stop standard routing
                switchView(targetHref);
            }
        });
    });

    // Attach SPA event listener to 'New Booking Request' button
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', () => {
            switchView('BookingEForms.html'); 
            // We use BookingEForms.html as the map key for the New Book Request, aligning to original nav structure
        });
    }

    // Toggle Ramadan mode stub (Exists in header so unaffected by main-content reload)
    const ramadanModeToggle = document.querySelector('.bg-\\[\\#C5A059\\]\\/10') || document.querySelector('.bg-white\\/5');
    if(ramadanModeToggle) {
        ramadanModeToggle.addEventListener('click', () => {
            alert('Ramadan Mode Toggled');
        });
    }
});
