import { IPageLoader } from './IPageLoader';
import { Load } from '../utils/query/Load';


export let LoadStaticPage = function (
    pageLoader: IPageLoader
): Promise<firebase.firestore.DocumentData[]> {

    return Load(pageLoader.prevQuery, (pageLoader.itemCount + 1), 0, pageLoader.currPageStartDocRef, 'startAfter')
        .then(function (docs) {
            // Get one more document for previous page end
            let docCount = docs.length - 1;
            pageLoader.cacheItems = docs;
            pageLoader.cacheItems.pop(); // Pop up endDoc of previous page
            pageLoader.cacheItems.reverse();
            pageLoader.pageIndex -= 1;
            pageLoader.endItemIndex = pageLoader.startItemIndex - 1;
            pageLoader.startItemIndex = pageLoader.endItemIndex - docCount + 1;
            pageLoader.isFullPage = (docCount === pageLoader.itemCount);
            // Doc reference for paging
            pageLoader.prevPageEndDocRef = docs[docCount];
            pageLoader.currPageStartDocRef = docs[docCount - 1];
            pageLoader.currPageEndDocRef = docs[0];
            return Promise.resolve(pageLoader.cacheItems);
        })
}

export let LoadDynamicPage = function (
    pageLoader: IPageLoader
): Promise<firebase.firestore.DocumentData[]> {

    let skip = (pageLoader.pageIndex - 1) * pageLoader.itemCount;
    return Load(pageLoader.nextQuery, pageLoader.itemCount, skip, pageLoader.baselineDocRef, pageLoader.baselineMode)
        .then(function (docs) {
            // Get one more document for previous page end
            let docCount = docs.length;
            pageLoader.cacheItems = docs;
            pageLoader.pageIndex -= 1;
            pageLoader.endItemIndex = pageLoader.startItemIndex - 1;
            pageLoader.startItemIndex = pageLoader.endItemIndex - docCount + 1;
            pageLoader.isFullPage = (docCount === pageLoader.itemCount);
            return Promise.resolve(pageLoader.cacheItems);
        })
}