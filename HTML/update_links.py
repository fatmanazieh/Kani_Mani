import os
import re

html_dir = '.'
mappings = {
    'dashboard': 'AdminMaster.html',
    'pending_actions': 'PendingRequest.html',
    'edit_calendar': 'BookingEForms.html',
    'account_balance': 'BranchManagerPortal.html',
    'analytics': 'StaffStats.html',
    'settings': 'SystemSet.html',
    'assessment': 'Reports.html',
    'help': 'HelpCenter.html',
    'logout': 'Login.html'
}

for root, _, files in os.walk(html_dir):
    for filename in files:
        if filename.endswith('.html'):
            filepath = os.path.join(root, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Map navigation links
            for icon, url in mappings.items():
                # The icon might be in `data-icon="icon"` or `>icon</span>`
                # Let's match `<a ... href="#"> ... <span ...>icon</span>`
                # We can just replace all instances of href="#" that are followed by the icon name within some characters
                # Since HTML allows newlines, we use re.DOTALL and specify a reasonable lookahead window or just use capture groups over non-anchor closing tags
                
                # Match `href="#"` followed by any chars except `</a>`, containing `>icon<`
                pattern = re.compile(rf'(href="#")((?:(?!</a>).)*?>{icon}<)', re.DOTALL)
                content = pattern.sub(f'href="{url}"\\2', content)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Pass 2 complete.")
