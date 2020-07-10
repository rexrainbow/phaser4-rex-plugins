import { IPageLoader } from './IPageLoader';
import { Load } from '../utils/query/Load';


export let LoadStaticPage = function (
    pageLoader: IPageLoader
): Promise<firebase.firestore.DocumentData[]> {

    return Load(pageLoader.nextQuery, pageLoader.itemCount, 0, pageLoader.baselineDocRef, pageLoader.baselineMode)
        .then(function (docs) {
            let docCount = docs.length;
            pageLoader.cacheItems = docs;
            pageLoader.pageIndex = 0;
            pageLoader.startItemIndex = 0;
            pageLoader.endItemIndex = pageLoader.startItemIndex + docCount - 1;
            pageLoader.isFullPage = (docCount === pageLoader.itemCount);
            // Doc reference for paging
            pageLoader.prevPageEndDocRef = null;
            pageLoader.currPageStartDocRef = docs[0];
            pageLoader.currPageEndDocRef = docs[docCount - 1];
            return Promise.resolve(pageLoader.cacheItems);
        })
}

export let LoadDynamicPage = function (
    pageLoader: IPageLoader
): Promise<firebase.firestore.DocumentData[]> {

    return Load(pageLoader.nextQuery, pageLoader.itemCount, 0, pageLoader.baselineDocRef, pageLoader.baselineMode)
        .then(function (docs) {
            let docCount = docs.length;
            pageLoader.cacheItems = docs;
            pageLoader.pageIndex = 0;
            pageLoader.startItemIndex = 0;
            pageLoader.endItemIndex = pageLoader.startItemIndex + docCount - 1;
            pageLoader.isFullPage = (docCount === pageLoader.itemCount);
            return Promise.resolve(pageLoader.cacheItems);
        })
}