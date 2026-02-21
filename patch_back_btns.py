import os
import re
import glob

# Ensure CWD is the root of Web_ComputerVision
root_dir = r'd:\\DongAUniversity\\TÀI LIỆU DẠY HỌC_2024-2025\\Thị giác máy tính\\Web_ComputerVision'
os.chdir(root_dir)

files = glob.glob('Chương*/index.html') + ['template_chapter.html']

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    old_content = content

    # Replace Chapter 3 style (fa-arrow-left)
    pattern3 = r'<a href=\"\.\./index\.html\"[^\>]*>\s*<i class=\"fa-solid fa-arrow-left\"><\/i>\s*Quay lại Dashboard\s*<\/a>'
    new_btn3 = '<a href=\"../index.html\" class=\"back-icon-btn\" title=\"Quay lại Dashboard\">\n                <i class=\"fa-solid fa-house\"></i>\n            </a>'
    content = re.sub(pattern3, new_btn3, content)

    # Replace Chapter 4-9 style (svg + "Quay lại")
    # Actually, in Chapters 4-9, the class is back-btn. Let's replace the whole tag.
    pattern4 = r'<a href=\"\.\./index\.html\" class=\"back-btn\">[\s\S]*?Quay lại\s*<\/a>'
    new_btn4 = '<a href=\"../index.html\" class=\"back-btn\" title=\"Quay lại Dashboard\" style=\"padding: 10px; border-radius: 50%; width: 40px; height: 40px; justify-content: center;\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\n                stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                <path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path><polyline points=\"9 22 9 12 15 12 15 22\"></polyline>\n            </svg>\n        </a>'
    
    content = re.sub(pattern4, new_btn4, content)

    if content != old_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file_path}')
