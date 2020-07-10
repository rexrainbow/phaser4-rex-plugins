import { IPageLoader } from './IPageLoader';
import { Load } from '../utils/query/Load';


export let LoadStaticPage = function (
    pageLoader: IPageLoader
): Promise<firebase.firestore.DocumentData[]> {

    return Load(pageLoader.nextQuery, pageLoader.itemCount, 0, pageLoader.currPageEndDocRef, 'startAfter')
        .then(function (docs) {
            let docCount = docs.length;
            pageLoader.cacheItems = docs;
            pageLoader.pageIndex += 1;
            pageLoader.startItemIndex = pageLoader.endItemIndex + 1;
            pageLoader.endItemIndex = pageLoader.startItemIndex + docCount - 1;
            pageLoader.isFullPage = (docCount === pageLoader.itemCount);
            // Doc reference for paging
            pageLoader.prevPageEndDocRef = pageLoader.currPageEndDocRef;
            pageLoader.currPageStartDocRef = docs[0];
            pageLoader.currPageEndDocRef = docs[docCount - 1];
            return Promise.resolve(pageLoader.cacheItems);
        })
}

export let LoadDynamicPage = function (
    pageLoader: IPageLoader
): Promise<firebase.firestore.DocumentData[]> {

    let skip = (pageLoader.pageIndex + 1) * pageLoader.itemCount;
    return Load(pageLoader.nextQuery, pageLoader.itemCount, skip, pageLoader.baselineDocRef, pageLoader.baselineMode)
        .then(function (docs) {
            let docCount = docs.length;
            pageLoader.cacheItems = docs;
            pageLoader.pageIndex += 1;
            pageLoader.startItemIndex = pageLoader.endItemIndex + 1;
            pageLoader.endItemIndex = pageLoader.startItemIndex + docCount - 1;
            pageLoader.isFullPage = (docCount === pageLoader.itemCount);
            return Promise.resolve(pageLoader.cacheItems);
        })
}