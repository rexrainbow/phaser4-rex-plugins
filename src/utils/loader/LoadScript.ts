export function LoadScript(
    url: string,
    onload: (() => void)
): void {

    const scripts = document.getElementsByTagName('script');
    for (let i = 0, cnt = scripts.length; i < cnt; i++) {
        if (scripts[i].src.includes(url)) {
            if (onload) {
                onload();
            }
            return;
        }
    }

    const newScriptTag = document.createElement('script');
    newScriptTag.setAttribute('src', url);

    if (onload) {
        newScriptTag.onload = onload;
    }

    document.head.appendChild(newScriptTag);
};