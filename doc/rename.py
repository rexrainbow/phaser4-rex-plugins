import os

RootPath = 'build/html/'
NamesMap = {
    '_images': 'images',
    '_sources': 'sources',
    '_static': 'static'
}

# Rename files
for dname, dirs, files in os.walk(RootPath):
    for fname in files:
        if not os.path.splitext(fname)[1] in ['.html', '.js', '.css']:
            continue

        fpath = os.path.join(dname, fname)
        with open(fpath, encoding='utf-8') as f:
            s = f.read()

        for oldString, newString in NamesMap.items():
            s = s.replace(oldString, newString)

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(s)

# Rename folders
for oldString, newString in NamesMap.items():
    os.rename(
        RootPath + oldString,
        RootPath + newString
    )
