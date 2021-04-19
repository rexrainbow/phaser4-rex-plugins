import {
    IBaseSizer,
    IConfig, ISpace
} from './IBaseSizer';
import { Container } from '../../container';
import { ISizerState } from '../util/ISizerState';
import { IGameObject } from '@phaserjs/phaser/gameobjects/IGameObject'
import { IChild } from '../util/IChild';
import { GetBoundsConfig } from '../../../utils/bounds/GetBoundsConfig';
import * as Bounds from '../../utils/align/bounds';
import { GetChildWidth } from './layout/GetChildWidth';
import { GetChildHeight } from './layout/GetChildHeight';
import { RunLayout } from './layout/RunLayout';
import { ResolveWidth } from './layout/ResolveWidth';
import { ResolveHeight } from './layout/ResolveHeight';
import { ResolveChildrenWidth } from './layout/ResolveChildrenWidth';
import { RunWidthWrap } from './layout/RunWidthWrap';
import { PreLayout } from './layout/PreLayout';
import { LayoutBackgrounds } from './layout/LayoutBackgrounds';
import { PostLayout } from './layout/PostLayout';
import { Pin } from './add/Pin';
import { GetSizerState } from '../util/GetSizerState';
import { AddBackground } from './add/AddBackground';
import { IAddBackgroundConfig } from './add/IAddBackgroundConfig';
import { IsBackground } from './add/IsBackground';
import { AddChildrenMap } from './add/AddChildrenMap';
import { GetElement } from './child/GetElement';
import { IsChild } from './child/IsChild';
import { IsBackgroundChild } from './child/IsBackgroundChild';
import { GetTopmostParentSizer } from '../util/parent/GetTopmostParentSizer';

export class BaseSizer extends Container implements IBaseSizer {
    type = 'rexBaseSizer';

    space: {
        left: number,
        right: number,
        top: number,
        bottom: number
    };
    name: string;
    rexSizer: ISizerState = {};

    needLayout: boolean = true;

    minWidth: number;
    _childrenWidth: number;

    minHeight: number;
    _childrenHeight: number;

    backgroundChildren: IChild[];
    sizerChildren: any;
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

        this.setMinSize(width, height);
        this.space = GetBoundsConfig(space);
        this.name = name;
    }

    destroy(reparentChildren?: IGameObject) {

        this.sizerChildren = null;
        this.backgroundChildren = null;
        super.destroy(reparentChildren);
    }

    get ignoreLayout(): boolean {
        return this.rexSizer.hidden || (!this.needLayout);
    }

    get left(): number {
        return Bounds.GetLeft(this);
    }

    set left(value: number) {
        Bounds.SetLeft(this, value);
    }

    alignLeft(value: number) {
        this.left = value;
        return this;
    }

    get right(): number {
        return Bounds.GetRight(this);
    }

    set right(value: number) {
        Bounds.SetRight(this, value);
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
        return Bounds.GetCenterX(this);
    }

    set centerX(value) {
        Bounds.SetCenterX(this, value);
    }

    alignCenterX(value: number) {
        this.centerX = value;
        return this;
    }

    get top(): number {
        return Bounds.GetTop(this);
    }

    set top(value: number) {
        Bounds.SetTop(this, value);
    }

    alignTop(value: number) {
        this.top = value;
        return this;
    }

    get bottom(): number {
        return Bounds.GetBottom(this);
    }

    set bottom(value: number) {
        Bounds.SetBottom(this, value);
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
        return Bounds.GetCenterY(this);
    }

    set centerY(value: number) {
        Bounds.SetCenterY(this, value);
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

    getChildWidth(child): number {

        return GetChildWidth(child);
    }

    getChildHeight(child): number {

        return GetChildHeight(child);
    }

    // Override
    getChildrenWidth(): number {

        return 0;
    }

    // Override
    getChildrenHeight(): number {

        return 0;
    }

    // Override
    getExpandedChildWidth(
        child: IChild,
        parentWidth?: number
    ): number {

        return parentWidth;
    }

    // Override
    getExpandedChildHeight(
        child: IChild,
        parentHeight?: number
    ): number {

        return parentHeight;
    }

    getChildrenSizers(
        out: IBaseSizer[] = []
    ): IBaseSizer[] {

        return out;
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

    layout(): this {

        const x = this.x;
        const y = this.y;
        this
            .setPosition(0, 0)  // Offset to (0,0)
            .runLayout()        // Run layout
            .setPosition(x, y); // Offset back original position
        return this;
    }

    // Override
    runLayout(
        parent?: IBaseSizer,
        width?: number,
        height?: number
    ): this {

        RunLayout(this, parent, width, height);
        return this;
    }

    preLayout(
        parent?: IBaseSizer,
        width?: number,
        height?: number
    ): this {

        PreLayout(this);
        return this;
    }

    resolveWidth(
        width?: number
    ): number {

        return ResolveWidth(this, width);
    }

    resolveHeight(
        height?: number
    ): number {

        return ResolveHeight(this, height);
    }

    resolveChildrenWidth(
        width?: number
    ): void {

        ResolveChildrenWidth(this, width);
    }

    runWidthWrap(
        width: number
    ): void {

        RunWidthWrap(this, width);
    }

    layoutChildren(): void {
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

    isChild(child: IChild): boolean {

        return IsChild(this, child);
    }

    isBackgroundChild(child: IChild): boolean {

        return IsBackgroundChild(this, child);
    }

    getTopmostParentSizer(
        child: IChild = this
    ): IBaseSizer {

        return GetTopmostParentSizer(child);
    }
}