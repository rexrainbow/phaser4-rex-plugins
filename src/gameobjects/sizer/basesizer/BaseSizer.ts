import {
    IBaseSizer,
    IConfig, ISpace
} from './IBaseSizer';
import { Container } from '@phaserjs/phaser/gameobjects';
import { ISizerState } from '../util/ISizerState';
import { IChild } from '../util/IChild';
import { GetBoundsConfig } from '../../../utils/bounds/GetBoundsConfig';
import {
    GetLeft, GetCenterX, GetRight,
    GetTop, GetCenterY, GetBottom,
    SetLeft, SetCenterX, SetRight,
    SetTop, SetCenterY, SetBottom
} from '../../utils/bounds';
import { Layout } from './layout/Layout';
import { PreLayout } from './layout/PreLayout';
import { LayoutInit } from './layout/LayoutInit';
import { LayoutBackgrounds } from './layout/LayoutBackgrounds';
import { PostLayout } from './layout/PostLayout';
import { Pin } from './add/Pin';
import { GetSizerState } from '../util/GetSizerState';
import { AddBackground, IAddBackgroundConfig } from './add/AddBackground';
import { IsBackground } from './add/IsBackground';
import { AddChildrenMap } from './add/AddChildrenMap';
import { GetElement } from './GetElement';

export class BaseSizer extends Container implements IBaseSizer {
    isRexSpace: false;
    type: string;

    space: ISpace;
    name: string;
    rexSizer: ISizerState = {};

    needLayout: boolean = true;

    minWidth: number;
    _childrenWidth: number;

    minHeight: number;
    _childrenHeight: number;

    backgroundChildren: IChild[];
    sizerChildren: IChild[] | { [name: string]: IChild };
    childrenMap: { [name: string]: any };

    constructor({
        x = 0,
        y = 0,
        width = 0,
        height = 0,
        space = 0,
        name = ''
    }: IConfig = {}) {

        super(x, y);

        this.type = 'rexBaseSizer';
        this.setMinSize(width, height);
        this.space = GetBoundsConfig(space);
        this.name = name;
    }

    get left(): number {
        return GetLeft(this);
    }

    set left(value: number) {
        SetLeft(this, value);
    }

    alignLeft(value: number) {
        this.left = value;
        return this;
    }

    get right(): number {
        return GetRight(this);
    }

    set right(value: number) {
        SetRight(this, value);
    }

    alignRight(value: number) {
        this.right = value;
        return this;
    }

    get innerLeft(): number {
        return this.left + this.space.left;
    }

    get innerRight(): number {
        return this.right - this.space.right;
    }

    get centerX(): number {
        return GetCenterX(this);
    }

    set centerX(value) {
        SetCenterX(this, value);
    }

    alignCenterX(value: number) {
        this.centerX = value;
        return this;
    }

    get top(): number {
        return GetTop(this);
    }

    set top(value: number) {
        SetTop(this, value);
    }

    alignTop(value: number) {
        this.top = value;
        return this;
    }

    get bottom(): number {
        return GetBottom(this);
    }

    set bottom(value: number) {
        SetBottom(this, value);
    }

    alignBottom(value: number) {
        this.bottom = value;
        return this;
    }

    get innerTop(): number {
        return this.top + this.space.top;
    }

    get innerBottom(): number {
        return this.bottom - this.space.bottom;
    }

    get centerY(): number {
        return GetCenterY(this);
    }

    set centerY(value: number) {
        SetCenterY(this, value);
    }

    alignCenterY(value: number) {
        this.centerY = value;
        return this;
    }

    get innerWidth(): number {
        return this.width - this.space.left - this.space.right;
    }

    get innerHeight(): number {
        return this.height - this.space.top - this.space.bottom;
    }

    setMinSize(
        width: number,
        height: number
    ): this {

        this.setMinWidth(width).setMinHeight(height);
        return this;
    }

    setMinWidth(
        width: number = 0
    ): this {

        this.minWidth = width;
        return this;
    }

    setMinHeight(
        height: number = 0
    ): this {

        this.minHeight = height;
        return this;
    }

    // Override
    getChildrenWidth(): number {

        return 0;
    }

    // Override
    getChildrenHeight(): number {

        return 0;
    }

    get childrenWidth() {
        if (this._childrenWidth === undefined) {
            this._childrenWidth = this.getChildrenWidth();
        }
        return this._childrenWidth;
    }

    get childrenHeight() {
        if (this._childrenHeight === undefined) {
            this._childrenHeight = this.getChildrenHeight();
        }
        return this._childrenHeight;
    }

    resize(
        width: number = this.width,
        height: number = this.height
    ): this {

        this.setSize(width, height)
        return this;
    }

    getSizerState(
        child: IChild
    ): ISizerState {

        return GetSizerState(child);
    }


    // Override
    getChildrenSizers(
        out: IBaseSizer[] = []
    ): IBaseSizer[] {

        return out;
    }

    layout(): this {

        const x = this.x;
        const y = this.y;
        this
            .setPosition(0, 0)  // Offset to (0,0)
            ._layout()          // Run layout
            .setPosition(x, y); // Offset back original position
        return this;
    }

    // Override
    _layout(
        parent?: IBaseSizer,
        width?: number,
        height?: number
    ) {

        Layout(this, parent, width, height);
        return this;
    }

    preLayout(
        parent?: IBaseSizer,
        width?: number,
        height?: number
    ): this {

        PreLayout(this, parent, width, height);
        return this;
    }

    // Override
    layoutInit(): this {

        LayoutInit(this);
        return this;
    }

    layoutBackgrounds(
    ): this {

        LayoutBackgrounds(this);
        return this;
    }

    postLayout(
        parent?: IBaseSizer,
        width?: number,
        height?: number
    ): this {


        PostLayout(this, parent, width, height);
        return this;
    }

    pin(
        child: IChild
    ): this {

        Pin(this, child);
        return this;
    }

    addBackground(
        child: IChild,
        config?: IAddBackgroundConfig
    ): this {

        AddBackground(this, child, config);
        return this;
    }

    isBackground(
        child: IChild
    ): boolean {

        return IsBackground(this, child);
    }

    addChildrenMap(
        key: string,
        child: any
    ): this {

        AddChildrenMap(this, key, child);
        return this;
    }

    getElement(
        name: string,
        recursive: boolean = false
    ): any {

        return GetElement(this, name, recursive);
    }
}