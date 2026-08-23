import urllib.request, time, re

def fetch(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'agent-reach/1.0'})
        r = urllib.request.urlopen(req, timeout=20)
        return r.status, r.read().decode('utf-8', 'ignore')
    except Exception as e:
        return 0, str(e)[:80]

ok = False
for i in range(18):
    st, body = fetch('https://tangwenqing123.github.io/gaoshan-liushui/js/data/quotes.js')
    if st == 200 and 'id: "q105"' in body:
        print('[%ds] 新题库已上线' % (i * 10))
        ok = True
        break
    time.sleep(10)

print('RESULT:', '已上线' if ok else '仍在构建')
if ok:
    count = len(re.findall(r'id: "q\d+"', body))
    print('检测到金句数量:', count)
    for cat in ['知音','孤独','治愈','成长','自由','热爱','释怀','哲思','深情','勇气','时间','自我']:
        n = body.count('category: "' + cat + '"')
        print('  %s: %d 句' % (cat, n))
