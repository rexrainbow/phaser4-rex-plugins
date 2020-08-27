import os

for dname, dirs, files in os.walk('./examples'):
    for fname in files:
        if '.project.bat' not in fname:
            continue

        print('Build project {batName}'.format(batName=fname))
        cmdString = 'cd {path} && {batName}'.format(path=dname, batName=fname)
        # print(cmdString)
        os.system(cmdString)
        
