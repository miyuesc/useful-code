export interface DOMRectDimensions {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
}

export interface ItemsComparison {
  (item1: unknown, item2: unknown): boolean
}

export interface CacheInvalidateAll extends VoidFunction {}

export interface CacheInvalidateAtIndex {
  (idx: number): void
}

export interface CacheInvalidateAItem {
  (item: unknown): void
}

export interface AnimationCompletedCallback {
  (): void
}

export interface ScrollInto {
  (
    item: unknown,
    alignToBeginning?: boolean,
    additionalOffset?: number,
    animationMilliseconds?: number,
    animationCompletedCallback?: AnimationCompletedCallback
  ): void
}

export interface ScrollToIndex {
  (
    index: number,
    alignToBeginning?: boolean,
    additionalOffset?: number,
    animationMilliseconds?: number,
    animationCompletedCallback?: AnimationCompletedCallback
  ): void
}

export interface ScrollToPosition {
  (
    scrollPosition: number,
    animationMilliseconds?: number,
    animationCompletedCallback?: AnimationCompletedCallback
  ): void
}

export interface IPageInfo {
  endIndex: number
  endIndexWithBuffer: number
  maxScrollPosition: number
  scrollEndPosition: number
  scrollStartPosition: number
  startIndex: number
  startIndexWithBuffer: number
}

export interface IViewport extends IPageInfo {
  padding: number
  scrollLength: number
}

export interface WrapGroupDimensions {
  maxChildSizePerWrapGroup: Array<WrapGroupDimension | undefined>
  numberOfKnownWrapGroupChildSizes: number
  sumOfKnownWrapGroupChildHeights: number
  sumOfKnownWrapGroupChildWidths: number
}

export interface WrapGroupDimension {
  childHeight: number
  childWidth: number
  items: any[]
}

export interface IDimensions {
  childHeight: number
  childWidth: number
  itemCount: number
  itemsPerPage: number
  itemsPerWrapGroup: number
  maxScrollPosition: number
  pageCount_fractional: number
  scrollLength: number
  viewportLength: number
  wrapGroupsPerPage: number
}
