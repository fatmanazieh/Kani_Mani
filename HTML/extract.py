import re
import os

SCRIPT_FILE = 'script.js'

def extract_content(filename, marker_start_regex):
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Find start
    match_start = re.search(marker_start_regex, html)
    if not match_start:
        raise Exception(f"Start not found in {filename}")
    
    start_idx = match_start.end()
    
    # Find end (before </main>)
    end_idx = html.find('</main>', start_idx)
    if end_idx == -1:
        raise Exception(f"</main> not found in {filename}")
        
    content = html[start_idx:end_idx].strip()
    
    # Escape backticks and standard substitutions so it doesn't break JS template literal
    content = content.replace("`", r"\`")
    content = content.replace("${", r"\${")
    return content

files_to_process = {
    'PendingRequest.html': r'<!-- Content Area -->',
    'EmployeeSecretaryView.html': r'<!-- Editorial Content Area -->',
    'BranchManagerPortal.html': r'<!-- Content Area -->'
}

extracted = {}
for file, regex in files_to_process.items():
    extracted[file] = extract_content(file, regex)

# Now read script.js and inject these into pageContents
with open(SCRIPT_FILE, 'r', encoding='utf-8') as f:
    script_content = f.read()

# We need to insert the extracted content before the end of the pageContents dictionary
# The dictionary looks like:
#     const pageContents = {
#         'AdminMaster.html': originalDashboardHTML,
#         ...
#         'HelpCenter.html': `...`
#     };

injection_string = ",\n"
for file, content in extracted.items():
    injection_string += f"        '{file}': `\n{content}\n`,\n"

# Find insertion point: matching `'HelpCenter.html': `...`\n    };`
pattern = re.compile(r"('HelpCenter\.html': `.*?`\n    )};", re.DOTALL)
match = pattern.search(script_content)

if not match:
    # Alternative: check if 'HelpCenter.html' was modified
    raise Exception("Could not find insertion marker in script.js")

# Insert right before the closing brace of pageContents
new_script_content = script_content[:match.end(1)] + injection_string + "};" + script_content[match.end(0):]

with open(SCRIPT_FILE, 'w', encoding='utf-8') as f:
    f.write(new_script_content)

print("Successfully injected new UI components into script.js!")
