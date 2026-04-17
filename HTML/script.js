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
