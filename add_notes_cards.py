import pathlib
p = pathlib.Path('C:/Users/MDRS Bahaddurghatta/Documents/Teaching/kreis-ict-resources/index.html')
t = p.read_text(encoding='utf-8-sig')

names = {'1': 'Class 6', '2': 'Class 7', '3': 'Classes 8-10'}
block = ''
for c in ['1', '2', '3']:
    card = '                <a href="downloads/student-notes-level' + c + '.pdf" class="download-item" data-cat="notes">\n'
    card += '                    <div class="download-icon" style="background:#fef3c7;color:#92400e;">&#x1F4D3;</div>\n'
    card += '                    <div class="download-info">\n'
    card += '                        <strong>Student Notes &mdash; Level ' + c + '</strong>\n'
    card += '                        <span>' + names[c] + ' &middot; 72 lessons &middot; Key words, worked examples, try it, check yourself</span>\n'
    card += '                    </div>\n'
    card += '                </a>\n'
    block += card

anchor = t.find('downloads/level3-lesson-plan-tabular.pdf?v=4')
end = t.find('</a>', anchor) + len('</a>\n')
t = t[:end] + block + t[end:]
p.write_text(t, encoding='utf-8')
print('cards added:', t.count('student-notes-level'))
