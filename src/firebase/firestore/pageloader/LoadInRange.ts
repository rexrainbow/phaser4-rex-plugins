import { IPageLoader } from './IPageLoader';
import { Load } from '../utils/query/Load';


export let LoadInRange = function (
    pageLoader: IPageLoader,
    count: number,
    skip: number = 0
): Promise<firebase.firestore.DocumentData[]> {

    return Load(pageLoader.nextQuery, count, skip, pageLoader.baselineDocRef, pageLoader.baselineMode)
        .then(function (docs) {
            let docCount = docs.length;
            pageLoader.cacheItems = docs;
            pageLoader.pageIndex = undefined; // Not in Page mode
            pageLoader.startItemIndex = skip;
            pageLoader.endItemIndex = pageLoader.startItemIndex + docCount - 1;
            pageLoader.isFullPage = (count === undefined) ? true : (docCount === count);
            return Promise.resolve(pageLoader.cacheItems);
        })
}