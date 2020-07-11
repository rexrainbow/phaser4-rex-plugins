import { IMessage } from './IBroadcast';

export interface IHistory {
    records: IMessage[];

    add(
        record: IMessage
    ): this;

    clear(): this;

    changeUserName(
        userID: string,
        userName?: string
    ): this;
}

export class History {

    maxLength: number;
    records: IMessage[];

    constructor({
        maxLength = -1
    }: {
        maxLength?: number
    } = {}) {

        this.maxLength = maxLength; // -1: Infinity
        this.records = [];
    }

    add(
        record: IMessage
    ): this {

        if (this.maxLength === 0) {
            return this;
        }

        this.records.push(record);
        if ((this.maxLength > 0) && (this.records.length > this.maxLength)) {
            this.records.shift();
        }

        return this;
    }

    clear(): this {

        this.records.length = 0;
        return this;
    }

    changeUserName(
        userID: string,
        userName?: string
    ): this {

        if (this.maxLength === 0) {
            return this;
        }

        this.records.forEach((record) => {
            if (record.senderID === userID) {
                record.senderName = userName;
            }
        })

        return this;
    }
}