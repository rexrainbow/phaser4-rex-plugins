import { IPageLoader } from './IPageLoader';
import { Load } from '../utils/query/Load';

export function LoadStaticPage(
    pageLoader: IPageLoader
): Promise<firebase.firestore.DocumentData[]> {

    return Load(pageLoader.nextQuery, pageLoader.itemCount, 0, pageLoader.prevPageEndDocRef, 'startAfter')
        .then(function (docs) {
            let docCount = docs.length;
            pageLoader.cacheItems = docs;
            pageLoader.endItemIndex = pageLoader.startItemIndex + docCount - 1;
            pageLoader.isFullPage = (docCount === pageLoader.itemCount);
            // Doc reference for paging
            pageLoader.currPageStartDocRef = docs[0].ref;
            pageLoader.currPageEndDocRef = docs[docCount - 1].ref;
            return Promise.resolve(pageLoader.cacheItems);
        })
}

export function LoadDynamicPage(
    pageLoader: IPageLoader
): Promise<firebase.firestore.DocumentData[]> {

    let skip = pageLoader.pageIndex * pageLoader.itemCount;
    return Load(pageLoader.nextQuery, pageLoader.itemCount, skip, pageLoader.baselineDocRef, pageLoader.baselineMode)
        .then(function (docs) {
            let docCount = docs.length;
            pageLoader.cacheItems = docs;
            pageLoader.endItemIndex = pageLoader.startItemIndex + docCount - 1;
            pageLoader.isFullPage = (docCount === pageLoader.itemCount);
            return Promise.resolve(pageLoader.cacheItems);
        })
}