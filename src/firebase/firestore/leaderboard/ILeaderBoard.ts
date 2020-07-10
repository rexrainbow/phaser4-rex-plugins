import * as firebase from 'firebase/app';

export type TimeFiltersType = {
    d?: boolean,
    w?: boolean,
    m?: boolean,
    y?: boolean
}

export type TimeFilterTypeStringType = 'day' | 'd' | 'week' | 'w' | 'month' | 'm' | 'year' | 'y';

export type TimeDataType = {
    d: string,
    w: string,
    m: string,
    y: string
}

export const TimeTagKeys = {
    d: 'tagD',
    w: 'tagW',
    m: 'tagM',
    y: 'tagY'
}

export const ScoreKeys = {
    d: 'scoreD',
    w: 'scoreW',
    m: 'scoreM',
    y: 'scoreY'
}

export const FullTimeName = {
    d: 'day',
    w: 'week',
    m: 'month',
    y: 'year'
}

export interface IRecord {
    userID: string;
    userName?: string;
    boardID?: string;
    tag?: string;

    score?: number;
    tagD?: string;
    tagW?: string;
    tagM?: string;
    tagY?: string;
    scoreD?: number;
    scoreW?: number;
    scoreM?: number;
    scoreY?: number;
};

export type UserInfoType = {
    userID: string,
    userName: string
}

// GetRank
export type RankResultType = {
    userID: string,
    rank: number
}

export interface IConfig {
    root?: string;
    userID?: string;
    userName?: string;
    boardID?: string;
    tag?: string;
    timeFilters?: false | TimeFiltersType;
    timeFilterType?: TimeFilterTypeStringType;
    pageItemCount?: number;
}

import { IPageLoader } from '../pageloader/IPageLoader';

export interface ILeaderBoard {
    database: firebase.firestore.Firestore;
    rootPath: string;
    rootRef: firebase.firestore.CollectionReference;

    userInfo: UserInfoType;
    userID: string;
    userName: string;

    resetQueryFlag: boolean;
    boardID: string;
    tag: string;

    timeFilters: false | TimeFiltersType;
    timeFilterType: TimeFilterTypeStringType;

    pageItemCount: number;
    page: IPageLoader;
}