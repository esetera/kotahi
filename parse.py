c = open('out2.txt','r').read().strip().split('\n')
rows = sorted(c, key=lambda l: eval(l.split(',')[1].replace('mb', '*1000').replace('kb', '*1')), reverse=True)
for l in rows:
  print(l)