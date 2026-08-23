import urllib.request, time

def fetch(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'agent-reach/1.0'})
        r = urllib.request.urlopen(req, timeout=20)
        return r.status, r.read().decode('utf-8', 'ignore')
    except Exception as e:
        return 0, str(e)[:80]

ok = False
for i in range(18):
    st, body = fetch('https://tangwenqing123.github.io/gaoshan-liushui/')
    checks = ('class="view active" id="view-home"' in body) and ('btn-start' in body)
    if st == 200 and checks:
        print('[%ds] 首页视图已激活，含开始按钮' % (i * 10))
        ok = True
        break
    time.sleep(10)

print('RESULT:', '修复生效' if ok else '仍在构建或未生效')
if ok:
    print('包含 hero-title:', 'hero-title' in body)
    print('包含 CTA「开始测试」:', '开始测试' in body)
    print('包含每日一签入口:', 'btn-quote-home' in body)
