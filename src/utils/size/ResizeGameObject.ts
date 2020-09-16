export function ResizeGameObject(
    gameObject: any,
    newWidth: number,
    newHeight: number
) {

    if (!gameObject || ((newWidth === undefined) && (newHeight === undefined))) {
        return;
    }
    if (gameObject.resize) { // Has `resize` method
        if (newWidth === undefined) {
            newWidth = gameObject.width;
        }
        if (newHeight === undefined) {
            newHeight = gameObject.height;
        }
        gameObject.resize(newWidth, newHeight);
    } else { // Set display width/height
        if (newWidth !== undefined) {
            // gameObject.displayWidth = newWidth;
            gameObject.width = newWidth;
        }
        if (newHeight !== undefined) {
            // gameObject.displayHeight = newHeight;
            gameObject.height = newHeight;
        }
    }
}