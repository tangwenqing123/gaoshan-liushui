import urllib.request, re, time

def fetch(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'agent-reach/1.0'})
        r = urllib.request.urlopen(req, timeout=20)
        return r.status, r.read().decode('utf-8', 'ignore')
    except Exception as e:
        return 0, str(e)[:80]

ok = False
for i in range(18):
    st, p = fetch('https://tangwenqing123.github.io/gaoshan-liushui/js/data/personas.js')
    st2, idx = fetch('https://tangwenqing123.github.io/gaoshan-liushui/index.html')
    if st == 200 and 'id: "sunwukong"' in p and 'p-profile' in idx:
        print('[%ds] 新人格+深度维度已上线' % (i * 10))
        ok = True
        break
    time.sleep(10)

print('RESULT:', '已上线' if ok else '仍在构建')
if ok:
    names = re.findall(r'name: "([^"]+)", title', p)
    print('上线人格卡数:', len(names))
    print('人格名单:', ' / '.join(names))
    careers = re.findall(r'career: "([^"]+)"', p)
    print('深度字段 career 数量:', len(careers))
