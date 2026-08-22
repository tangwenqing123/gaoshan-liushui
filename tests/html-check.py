import io, re, sys

html = io.open(r'C:\Users\25714\Desktop\项目\gaoshan-liushui\index.html', encoding='utf-8').read()
scripts = ['personas.js','quotes.js','engine.js','quote.js','poster.js','result.js','app.js']

problems = []

# 1. 脚本引用与文件存在性
for s in scripts:
    if ('js/' + s) in html or ('js/data/' + s) in html:
        pass
    else:
        problems.append('脚本引用缺失: ' + s)

# 2. HTML 中定义的 id
html_ids = set(re.findall(r'id="([^"]+)"', html))

# 3. JS 中 getElementById 引用的 id
js_ids = set()
for f in ['app.js','quote.js','poster.js','result.js']:
    src = io.open(r'C:\Users\25714\Desktop\项目\gaoshan-liushui\js\\' + f, encoding='utf-8').read()
    js_ids.update(re.findall(r'getElementById\("([^"]+)"\)', src))

# 动态创建的 id 排除
dynamic = {'p-desc','p-picks'}
missing = js_ids - html_ids - dynamic
for m in sorted(missing):
    problems.append('JS 引用但 HTML 无此 id: ' + m)

# 4. 事件绑定的按钮都存在
for bid in ['btn-start','btn-quote-home','btn-quote-back','btn-quote-refresh','btn-quote-share','btn-test-home','btn-skip','btn-poster','btn-share','btn-retest','poster-close','btn-debug-all']:
    if bid not in html_ids:
        problems.append('按钮缺失: ' + bid)

# 5. 视图容器
for v in ['view-home','view-test','view-result','view-quote']:
    if v not in html_ids:
        problems.append('视图容器缺失: ' + v)

print('HTML id 数量:', len(html_ids))
print('JS 引用 id 数量:', len(js_ids))
if problems:
    print('发现问题:')
    for p in problems: print(' -', p)
    sys.exit(1)
else:
    print('✅ 全部交叉检查通过：脚本引用完整、所有 JS 引用的 id 均存在')
