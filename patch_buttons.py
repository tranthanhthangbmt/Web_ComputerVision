import os
import re
import glob

# Ensure CWD is the root of Web_ComputerVision
root_dir = r'd:\\DongAUniversity\\TÀI LIỆU DẠY HỌC_2024-2025\\Thị giác máy tính\\Web_ComputerVision'
os.chdir(root_dir)

# Find all index.html files in Chương * folders
files = glob.glob('Chương */index.html')

print(f'Found files: {files}')

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply changes to <style> block
    style_addition = '''
        .btn-text-short {
            display: none;
        }

        /* Mobile adjustments */'''
    
    if '.btn-text-short {' not in content:
        content = content.replace('/* Mobile adjustments */', style_addition)

    css_addition = '''/* Mobile adjustments */
        @media only screen and (max-width: 700px) {
            .modal-content {
                width: 100%;
            }

            .info-btn .btn-text {
                display: none;
                /* Hide text on small screens, show icon only */
            }

            .btn-text-full {
                display: none;
            }

            .btn-text-short {
                display: inline;
                font-weight: bold;
            }

            .part-btn {
                padding: 8px;
                font-size: 16px;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
            }
            /* Reset info btn shape */
            .info-btn {
                border-radius: 20px;
                width: auto;
                padding: 8px 16px;
            }
        }'''
        
    # Replace the existing media query if we haven't already
    if '.btn-text-full {' not in content:
        # Regex to match the old media query up to the closing brace of info-btn .btn-text
        pattern = re.compile(r'/\* Mobile adjustments \*/\s*@media only screen and \(max-width: 700px\) \{.*?(?=\s*#caption)', re.DOTALL)
        # Actually it's easier to just replace the whole media query block.
        # Let us find the block:
        block_pattern = r'/\* Mobile adjustments \*/\s*@media only screen and \(max-width: 700px\) \{[\s\S]*?\}\s*\}'
        content = re.sub(block_pattern, css_addition, content)
        
    # Update buttons
    # Pattern: <button class="part-btn..." onclick="loadPart(NUM, this)">Tiết X: TITLE</button>
    # Note: sometimes they don't have Tiết X, e.g., infographic btn
    
    def repl_btn(match):
        pre = match.group(1) # e.g. <button class="part-btn" onclick="loadPart(1, this)">
        # Instead of just taking match.group(2) which is the full match, let's use a regex to extract the loadPart number
        full_tag = match.group(0)
        
        # Don't replace if it's already using btn-text-full
        if 'btn-text-full' in full_tag:
            return full_tag
            
        # extract number from loadPart(\d+,
        num_m = re.search(r'loadPart\((\d+)', full_tag)
        num = num_m.group(1) if num_m else "?"
        
        text = match.group(2) # inner text
        return f'{pre}<span class=\"btn-text-full\">{text}</span><span class=\"btn-text-short\">{num}</span></button>'
        
    btn_pattern = r'(<button [^>]*class=\"[^\"]*part-btn[^\"]*\"[^>]*onclick=\"loadPart[^>]*>)(.*?)</button>'
    content = re.sub(btn_pattern, repl_btn, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f'Updated {file_path}')
