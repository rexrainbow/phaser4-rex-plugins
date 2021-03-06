import * as firebase from 'firebase/app';
import {
    ILeaderBoard, IConfig,
    UserInfoType,
    TimeFiltersType, TimeFilterTypeString, TimeFilterTypeStringAlias, TimeFilterTypeStringAliasMap,
    IRecord, RankResultType
} from './ILeaderBoard';
import { Post } from './Post';
import { LoadFirstPage, LoadNextPage, LoadPreviousPage, LoadCurrentPage, Load } from './LoadMethods';
import { GetScore } from './GetScore';
import { GetRank } from './GetRank';
import { DeleteUser, DeleteBoard } from './DeleteMethods';
import { } from './GetQueryMethods';
import { IPageLoader } from '../pageloader/IPageLoader';
import { DynamicPageLoader } from '../pageloader/DynamicPageLoader';


export class LeaderBoard implements ILeaderBoard {
    database: firebase.firestore.Firestore;
    rootPath: string;
    rootRef: firebase.firestore.CollectionReference;
    userInfo: UserInfoType;

    resetQueryFlag: boolean;
    boardID: string;
    tag: string;

    timeFilters: false | TimeFiltersType;
    timeFilterType: TimeFilterTypeString;

    pageItemCount: number;
    page: IPageLoader;

    constructor({
        root = '',
        userID = '',
        userName = '',
        boardID,
        tag,
        timeFilters = false,
        timeFilterType = 'year',
        pageItemCount = 100
    }: IConfig = {}) {
        this.database = firebase.firestore();
        this.setRootPath(root);

        this.userInfo = { userID: undefined, userName: undefined };
        this.setUser(userID, userName);
        this.setBoardID(boardID);
        this.setTag(tag);
        this.setTimeFilters(timeFilters);
        this.setTimeFilterType(timeFilterType);

        this.page = new DynamicPageLoader({ itemCount: pageItemCount });
        this.resetQueryFlag = true;
    }

    destroy() {
    }

    get userID() {
        return this.userInfo.userID;
    }

    set userID(value) {
        this.userInfo.userID = value;
    }

    get userName() {
        return this.userInfo.userName;
    }

    set userName(value) {
        this.userInfo.userName = value;
    }

    setRootPath(
        rootPath: string
    ): this {

        this.resetQueryFlag = this.resetQueryFlag || (this.rootPath !== rootPath);
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    setUser(
        userID: string | UserInfoType,
        userName?: string
    ): this {

        if (typeof (userID) === 'string') {
            this.userID = userID;
            this.userName = userName;
        } else {
            this.userInfo = userID;
        }
        return this;
    }

    setBoardID(
        boardID?: string
    ): this {

        this.resetQueryFlag = this.resetQueryFlag || (this.boardID !== boardID);
        this.boardID = boardID;
        return this;
    }

    setTag(
        tag?: string
    ): this {

        this.resetQueryFlag = this.resetQueryFlag || (this.tag !== tag);
        this.tag = tag;
        return this;
    }

    setTimeFilters(
        filters: boolean | TimeFiltersType
    ): this {

        if (filters === false) {
            this.timeFilters = false;
        } else { // filters is true, or a plain object
            let d: boolean, w: boolean, m: boolean, y: boolean, a: boolean;
            ({
                d = true,
                w = true,
                m = true,
                y = true,
                a = true
            } = (filters === true) ? {} : filters)
            this.timeFilters = {
                d: d,
                w: w,
                m: m,
                y: y,
                a: a
            }
        }
        return this;
    }

    setTimeFilterType(
        type: TimeFilterTypeStringAlias
    ): this {

        this.resetQueryFlag = this.resetQueryFlag || (this.timeFilterType !== type);
        this.timeFilterType = TimeFilterTypeStringAliasMap[type];
        return this;
    }

    setPageItemCount(
        count: number
    ): this {

        this.page.setItemCount(count);
        return this;
    }

    get pageIndex() {
        return this.page.pageIndex;
    }

    get isFirstPage() {
        return (this.page.pageIndex === 0);
    }

    get isLastPage() {
        return (this.page.isFullPage === false);
    }

    post(
        score: number,
        extraData?: object | undefined | null,
        timeStamp?: number | Date
    ): Promise<void> {

        if (timeStamp instanceof Date) {
            timeStamp = timeStamp.getTime();
        }
        return Post(this, score, extraData, timeStamp);
    }

    getScore(
        userID: string = this.userID
    ): Promise<IRecord> {

        return GetScore(this, userID);
    }

    getRank(
        userID: string = this.userID
    ): Promise<RankResultType> {

        return GetRank(this, userID);
    }

    loadFirstPage(): Promise<IRecord[]> {

        return LoadFirstPage(this);
    }

    loadNextPage(): Promise<IRecord[]> {

        return LoadNextPage(this);
    }

    loadPreviousPage(): Promise<IRecord[]> {

        return LoadPreviousPage(this);
    }

    loadCurrentPage(): Promise<IRecord[]> {

        return LoadCurrentPage(this);
    }

    Load(
        count: number,
        skip: number = 0
    ): Promise<IRecord[]> {

        return Load(this, count, skip);
    }

    deleteUser(
        userID: string = this.userID
    ): Promise<void> {

        return DeleteUser(this, userID);
    }

    deleteBoard(
        boardID: string = this.boardID,
        tag: string = this.tag,
    ): Promise<void> {

        return DeleteBoard(this, boardID, tag);
    }
}