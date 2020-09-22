import { BaseSizer } from '../basesizer';
import { ISizer, IConfig, KeyType } from './IOverlapSizer';
import { IBaseSizer } from '../basesizer/IBaseSizer';
import { IChild } from '../util/IChild';
import { GetChildrenSizers } from './layout/GetChildrenSizers';
import { GetChildrenWidth } from './layout/GetChildrenWidth';
import { GetChildrenHeight } from './layout/GetChildrenHeight';
import { Layout } from './layout/Layout';

import { Add } from './add/Add';
import { IAddConfig } from './add/IAddConfig';
import { Remove } from './remove/Remove';
import { RemoveAll } from './remove/RemoveAll';
import { Clear } from './remove/Clear';
import { GetChildKey } from './child/GetChildKey';

export class OverlapSizer extends BaseSizer implements ISizer {
    type: string = 'rexOverlapSizer';
    sizerChildren: Map<KeyType, IChild> = new Map();

    constructor(config: IConfig = {}) {

        super(config);
    }

    getChildrenSizers(
        out: IBaseSizer[] = []
    ): IBaseSizer[] {

        return GetChildrenSizers(this, out);
    }

    getChildrenWidth(): number {

        return GetChildrenWidth(this)
    }

    getChildrenHeight(): number {

        return GetChildrenHeight(this);
    }

    _layout(
        parent?: IBaseSizer,
        minWidth?: number,
        minHeight?: number
    ): this {

        Layout(this, parent, minWidth, minHeight);
        return this;
    }

    add(
        child: IChild,
        config?: IAddConfig
    ): this {

        Add(this, child, config);
        return this;
    }

    getChildKey(
        child: IChild | KeyType
    ): KeyType {

        return GetChildKey(this, child);
    }

    remove(
        child: IChild,
        destroyChild: boolean = true
    ): this {

        Remove(this, child, destroyChild);
        return this;
    }

    removeAll(
        destroyChild: boolean = true
    ): this {

        RemoveAll(this, destroyChild);
        return this;
    }

    clear(
        destroyChild: boolean = true
    ): this {

        Clear(this, destroyChild);
        return this;
    }
}
