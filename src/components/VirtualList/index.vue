<template>
  <div
    ref="visualListEl"
    class="virtual-scroller"
    :class="{ horizontal: horizontal, vertical: !horizontal, 'self-scroll': !parentScroll }"
  >
    <div ref="invisiblePaddingEl" class="total-padding"></div>
    <div ref="contentEl" class="scrollable-content">
      <slot v-for="item in viewPortItems" :key="item" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Object">
  import {
    ref,
    PropType,
    computed,
    watch,
    onMounted,
    onBeforeUnmount,
    onUpdated,
    nextTick
  } from 'vue'
  import { useDebounceFn, useThrottleFn } from '@vueuse/core'
  import {
    CacheInvalidateAItem,
    CacheInvalidateAll,
    CacheInvalidateAtIndex,
    DOMRectDimensions,
    IPageInfo,
    IViewport,
    ItemsComparison,
    ScrollInto,
    ScrollToIndex,
    ScrollToPosition,
    IDimensions,
    WrapGroupDimension,
    WrapGroupDimensions
  } from '@/components/VirtualList/types'
  import { Tween, Easing } from '@tweenjs/tween.js'

  defineOptions({ name: 'MVirtualList' })

  const $props = defineProps({
    items: {
      type: Array as PropType<T[]>,
      default: () => []
    },
    bufferAmount: {
      type: Number as PropType<number>,
      default: 0
    },
    checkResizeInterval: {
      type: Number as PropType<number>,
      default: 1000
    },
    compareItems: {
      type: Function as PropType<ItemsComparison>,
      default: () => false
    },
    enableUnequalChildrenSizes: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    horizontal: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    modifyOverflowStyleOfParentScroll: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    parentScroll: {
      type: Object as PropType<HTMLElement | Window>,
      default: () => null
    },
    resizeBypassRefreshThreshold: {
      type: Number as PropType<number>,
      default: 5
    },
    scrollAnimationTime: {
      type: Number as PropType<number>,
      default: 750
    },
    scrollDebounceTime: {
      type: Number as PropType<number>,
      default: 0
    },
    scrollThrottlingTime: {
      type: Number as PropType<number>,
      default: 0
    },
    scrollInto: {
      type: Function as PropType<ScrollInto>,
      default: () => void 0
    },
    scrollbarHeight: {
      type: Number as PropType<number>,
      default: 0
    },
    scrollbarWidth: {
      type: Number as PropType<number>,
      default: 0
    },
    stripedTable: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    useMarginInsteadOfTranslate: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  })

  const $emits = defineEmits<{
    vsChange: [event?: IPageInfo]
    vsStart: [event?: IPageInfo]
    vsEnd: [event?: IPageInfo]
    vsUpdate: [event?: T[]]
  }>()

  const visualListEl = ref<HTMLDivElement | null>(null)
  const invisiblePaddingEl = ref<HTMLDivElement | null>(null)
  const contentEl = ref<HTMLDivElement | null>(null)
  const viewPortItems = ref<T[]>([])
  const previousViewPort = ref<IViewport>({
    endIndex: 0,
    endIndexWithBuffer: 0,
    maxScrollPosition: 0,
    padding: 0,
    scrollEndPosition: 0,
    scrollLength: 0,
    scrollStartPosition: 0,
    startIndex: 0,
    startIndexWithBuffer: 0
  })
  const minMeasuredChildWidth = ref<number | undefined>()
  const minMeasuredChildHeight = ref<number | undefined>()

  const _bufferAmount = computed(() => {
    if (typeof $props.bufferAmount === 'number' && $props.bufferAmount >= 0) {
      return $props.bufferAmount
    } else {
      return $props.enableUnequalChildrenSizes ? 5 : 0
    }
  })
  const viewPortInfo = computed<IPageInfo>(() => {
    const pageInfo: Partial<IViewport> = previousViewPort.value || {}
    return {
      startIndex: pageInfo.startIndex || 0,
      endIndex: pageInfo.endIndex || 0,
      scrollStartPosition: pageInfo.scrollStartPosition || 0,
      scrollEndPosition: pageInfo.scrollEndPosition || 0,
      maxScrollPosition: pageInfo.maxScrollPosition || 0,
      startIndexWithBuffer: pageInfo.startIndexWithBuffer || 0,
      endIndexWithBuffer: pageInfo.endIndexWithBuffer || 0
    }
  })

  // 仅需要初始化时执行一次
  let _onScroll: () => void
  let _checkScrollElementResizedTimer: NodeJS.Timeout | undefined
  let _invisiblePaddingProperty: string
  let _offsetType: 'offsetLeft' | 'offsetTop'
  let _scrollType: 'scrollLeft' | 'scrollTop'
  let _pageOffsetType: 'pageXOffset' | 'pageYOffset'
  let _childScrollDim: 'childWidth' | 'childHeight'
  let _translateDir: 'translateX' | 'translateY'
  let _marginDir: 'marginLeft' | 'marginTop'
  let _currentTween: Tween<{ scrollPosition: number }> | undefined
  let wrapGroupDimensions: WrapGroupDimensions
  let cachedItemsLength: number
  let oldParentScrollOverflow: { x: string; y: string }
  let calculatedScrollbarWidth = 0
  let calculatedScrollbarHeight = 0

  const updateDirection = (): void => {
    if ($props.horizontal) {
      _childScrollDim = 'childWidth'
      _invisiblePaddingProperty = 'scaleX'
      _marginDir = 'marginLeft'
      _offsetType = 'offsetLeft'
      _pageOffsetType = 'pageXOffset'
      _scrollType = 'scrollLeft'
      _translateDir = 'translateX'
    } else {
      _childScrollDim = 'childHeight'
      _invisiblePaddingProperty = 'scaleY'
      _marginDir = 'marginTop'
      _offsetType = 'offsetTop'
      _pageOffsetType = 'pageYOffset'
      _scrollType = 'scrollTop'
      _translateDir = 'translateY'
    }
  }

  const getScrollElement = (): HTMLElement => {
    return $props.parentScroll instanceof Window
      ? (document.scrollingElement as HTMLElement) || document.documentElement || document.body
      : $props.parentScroll || visualListEl.value!
  }
  const getElementSize = (element: HTMLElement): DOMRectDimensions => {
    const result = element.getBoundingClientRect()
    const styles = getComputedStyle(element)
    const marginTop = parseInt(styles.marginTop, 10) || 0
    const marginBottom = parseInt(styles.marginBottom, 10) || 0
    const marginLeft = parseInt(styles.marginLeft, 10) || 0
    const marginRight = parseInt(styles.marginRight, 10) || 0

    return {
      top: result.top + marginTop,
      bottom: result.bottom + marginBottom,
      left: result.left + marginLeft,
      right: result.right + marginRight,
      width: result.width + marginLeft + marginRight,
      height: result.height + marginTop + marginBottom
    }
  }
  const updateOnScrollFunction = (): void => {
    if ($props.scrollDebounceTime) {
      _onScroll = useDebounceFn(() => {
        refresh_internal(false)
      }, $props.scrollDebounceTime)
    } else if ($props.scrollThrottlingTime) {
      _onScroll = useThrottleFn(() => {
        refresh_internal(false)
      }, $props.scrollThrottlingTime)
    } else {
      _onScroll = () => {
        refresh_internal(false)
      }
    }
  }
  const addScrollEventHandlers = (): void => {
    const scrollElement = getScrollElement()
    removeScrollEventHandlers()
    if ($props.parentScroll instanceof Window) {
      window.addEventListener<'scroll'>('scroll', _onScroll)
      window.addEventListener<'resize'>('resize', _onScroll)
    } else {
      scrollElement.addEventListener<'scroll'>('scroll', _onScroll)
      if ($props.checkResizeInterval > 0) {
        _checkScrollElementResizedTimer = setInterval(() => {
          checkScrollElementResized()
        }, $props.checkResizeInterval)
      }
    }
  }
  const removeScrollEventHandlers = (): void => {
    const scrollElement = getScrollElement()
    if (_checkScrollElementResizedTimer) {
      clearInterval(_checkScrollElementResizedTimer)
    }
    if ($props.parentScroll instanceof Window) {
      window.removeEventListener<'scroll'>('scroll', _onScroll)
      window.removeEventListener<'resize'>('resize', _onScroll)
    } else {
      scrollElement.removeEventListener<'scroll'>('scroll', _onScroll)
    }
  }
  let _previousScrollBoundingRect: DOMRectDimensions | undefined
  const checkScrollElementResized = (): void => {
    const boundingRect = getElementSize(getScrollElement())

    let sizeChanged: boolean
    if (!_previousScrollBoundingRect) {
      sizeChanged = true
    } else {
      const widthChange = Math.abs(boundingRect.width - _previousScrollBoundingRect.width)
      const heightChange = Math.abs(boundingRect.height - _previousScrollBoundingRect.height)
      sizeChanged =
        widthChange > $props.resizeBypassRefreshThreshold ||
        heightChange > $props.resizeBypassRefreshThreshold
    }

    if (sizeChanged) {
      _previousScrollBoundingRect = boundingRect
      if (boundingRect.width > 0 && boundingRect.height > 0) {
        refresh_internal(false)
      }
    }
  }
  const getElementsOffset = (): number => {
    let offset = 0
    if ($props.parentScroll) {
      const scrollElement = getScrollElement()
      const elementClientRect = getElementSize(visualListEl.value!)
      const scrollClientRect = getElementSize(scrollElement)
      if ($props.horizontal) {
        offset += elementClientRect.left - scrollClientRect.left
      } else {
        offset += elementClientRect.top - scrollClientRect.top
      }

      if (!($props.parentScroll instanceof Window)) {
        offset += scrollElement[_scrollType]
      }
    }
    return offset
  }
  const getScrollStartPosition = (): number => {
    let windowScrollValue = undefined
    if ($props.parentScroll instanceof Window) {
      windowScrollValue = window[_pageOffsetType]
    }
    return windowScrollValue || getScrollElement()[_scrollType] || 0
  }

  // 核心
  const calculatePageInfo = (scrollPosition: number, dimensions: IDimensions): IPageInfo => {
    let scrollPercentage = 0
    if ($props.enableUnequalChildrenSizes) {
      const numberOfWrapGroups = Math.ceil(dimensions.itemCount / dimensions.itemsPerWrapGroup)
      let totalScrolledLength = 0
      const defaultScrollLengthPerWrapGroup = dimensions[_childScrollDim]
      for (let i = 0; i < numberOfWrapGroups; ++i) {
        const childSize =
          wrapGroupDimensions.maxChildSizePerWrapGroup[i] &&
          wrapGroupDimensions.maxChildSizePerWrapGroup[i]?.[_childScrollDim]
        if (childSize) {
          totalScrolledLength += childSize
        } else {
          totalScrolledLength += defaultScrollLengthPerWrapGroup
        }

        if (scrollPosition < totalScrolledLength) {
          scrollPercentage = i / numberOfWrapGroups
          break
        }
      }
    } else {
      scrollPercentage = scrollPosition / dimensions.scrollLength
    }

    const startingArrayIndex_fractional =
      Math.min(
        Math.max(scrollPercentage * dimensions.pageCount_fractional, 0),
        dimensions.pageCount_fractional
      ) * dimensions.itemsPerPage

    const maxStart = dimensions.itemCount - dimensions.itemsPerPage - 1
    let arrayStartIndex = Math.min(Math.floor(startingArrayIndex_fractional), maxStart)
    arrayStartIndex -= arrayStartIndex % dimensions.itemsPerWrapGroup // round down to start of wrapGroup

    if ($props.stripedTable) {
      const bufferBoundary = 2 * dimensions.itemsPerWrapGroup
      if (arrayStartIndex % bufferBoundary !== 0) {
        arrayStartIndex = Math.max(arrayStartIndex - (arrayStartIndex % bufferBoundary), 0)
      }
    }

    let arrayEndIndex = Math.ceil(startingArrayIndex_fractional) + dimensions.itemsPerPage - 1
    const endIndexWithinWrapGroup = (arrayEndIndex + 1) % dimensions.itemsPerWrapGroup
    if (endIndexWithinWrapGroup > 0) {
      arrayEndIndex += dimensions.itemsPerWrapGroup - endIndexWithinWrapGroup // round up to end of wrapGroup
    }

    if (isNaN(arrayStartIndex)) {
      arrayStartIndex = 0
    }
    if (isNaN(arrayEndIndex)) {
      arrayEndIndex = 0
    }

    arrayStartIndex = Math.min(Math.max(arrayStartIndex, 0), dimensions.itemCount - 1)
    arrayEndIndex = Math.min(Math.max(arrayEndIndex, 0), dimensions.itemCount - 1)

    const bufferSize = _bufferAmount.value * dimensions.itemsPerWrapGroup
    const startIndexWithBuffer = Math.min(
      Math.max(arrayStartIndex - bufferSize, 0),
      dimensions.itemCount - 1
    )
    const endIndexWithBuffer = Math.min(
      Math.max(arrayEndIndex + bufferSize, 0),
      dimensions.itemCount - 1
    )

    return {
      startIndex: arrayStartIndex,
      endIndex: arrayEndIndex,
      startIndexWithBuffer: startIndexWithBuffer,
      endIndexWithBuffer: endIndexWithBuffer,
      scrollStartPosition: scrollPosition,
      scrollEndPosition: scrollPosition + dimensions.viewportLength,
      maxScrollPosition: dimensions.maxScrollPosition
    }
  }
  const calculatePadding = (arrayStartIndexWithBuffer: number, dimensions: IDimensions): number => {
    if (dimensions.itemCount === 0) {
      return 0
    }

    const defaultScrollLengthPerWrapGroup = dimensions[_childScrollDim]
    const startingWrapGroupIndex =
      Math.floor(arrayStartIndexWithBuffer / dimensions.itemsPerWrapGroup) || 0

    if (!$props.enableUnequalChildrenSizes) {
      return defaultScrollLengthPerWrapGroup * startingWrapGroupIndex
    }

    let numUnknownChildSizes = 0
    let result = 0
    for (let i = 0; i < startingWrapGroupIndex; ++i) {
      const childSize =
        wrapGroupDimensions.maxChildSizePerWrapGroup[i] &&
        wrapGroupDimensions.maxChildSizePerWrapGroup[i]?.[_childScrollDim]
      if (childSize) {
        result += childSize
      } else {
        ++numUnknownChildSizes
      }
    }
    result += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup)

    return result
  }
  const calculateViewport = (): IViewport => {
    const dimensions = calculateDimensions()
    const offset = getElementsOffset()

    let scrollStartPosition = getScrollStartPosition()
    if (
      scrollStartPosition > dimensions.scrollLength + offset &&
      !($props.parentScroll instanceof Window)
    ) {
      scrollStartPosition = dimensions.scrollLength
    } else {
      scrollStartPosition -= offset
    }
    scrollStartPosition = Math.max(0, scrollStartPosition)

    const pageInfo = calculatePageInfo(scrollStartPosition, dimensions)
    const newPadding = calculatePadding(pageInfo.startIndexWithBuffer, dimensions)
    const newScrollLength = dimensions.scrollLength

    return {
      startIndex: pageInfo.startIndex,
      endIndex: pageInfo.endIndex,
      startIndexWithBuffer: pageInfo.startIndexWithBuffer,
      endIndexWithBuffer: pageInfo.endIndexWithBuffer,
      padding: Math.round(newPadding),
      scrollLength: Math.round(newScrollLength),
      scrollStartPosition: pageInfo.scrollStartPosition,
      scrollEndPosition: pageInfo.scrollEndPosition,
      maxScrollPosition: pageInfo.maxScrollPosition
    }
  }
  const countItemsPerWrapGroup = (): number => {
    const propertyName = $props.horizontal ? 'offsetLeft' : 'offsetTop'
    const children = contentEl.value!.children

    const childrenLength = children ? children.length : 0
    if (childrenLength === 0) {
      return 1
    }

    const firstOffset = (children[0] as HTMLElement)[propertyName]
    let result = 1
    while (
      result < childrenLength &&
      firstOffset === (children[result] as HTMLElement)[propertyName]
    ) {
      ++result
    }

    return result
  }
  const calculateDimensions = (): IDimensions => {
    const scrollElement = getScrollElement()

    const maxCalculatedScrollBarSize = 25 // Note: Formula to auto-calculate doesn't work for ParentScroll, so we default to this if not set by consuming application
    calculatedScrollbarHeight = Math.max(
      Math.min(scrollElement.offsetHeight - scrollElement.clientHeight, maxCalculatedScrollBarSize),
      calculatedScrollbarHeight
    )
    calculatedScrollbarWidth = Math.max(
      Math.min(scrollElement.offsetWidth - scrollElement.clientWidth, maxCalculatedScrollBarSize),
      calculatedScrollbarWidth
    )

    let viewportWidth =
      scrollElement.offsetWidth -
      ($props.scrollbarWidth ||
        calculatedScrollbarWidth ||
        ($props.horizontal ? 0 : maxCalculatedScrollBarSize))
    let viewportHeight =
      scrollElement.offsetHeight -
      ($props.scrollbarHeight ||
        calculatedScrollbarHeight ||
        ($props.horizontal ? maxCalculatedScrollBarSize : 0))

    const content = contentEl.value!

    const itemsPerWrapGroup = countItemsPerWrapGroup()
    let wrapGroupsPerPage

    let defaultChildWidth
    let defaultChildHeight

    if (!$props.enableUnequalChildrenSizes) {
      if (content.children.length > 0) {
        if (!minMeasuredChildWidth.value && viewportWidth > 0) {
          minMeasuredChildWidth.value = viewportWidth
        }
        if (!minMeasuredChildHeight.value && viewportHeight > 0) {
          minMeasuredChildHeight.value = viewportHeight
        }
        const child = content.children[0]
        const clientRect = getElementSize(child as HTMLElement)
        minMeasuredChildWidth.value = Math.min(minMeasuredChildWidth.value!, clientRect.width)
        minMeasuredChildHeight.value = Math.min(minMeasuredChildHeight.value!, clientRect.height)
      }

      defaultChildWidth = minMeasuredChildWidth.value || viewportWidth
      defaultChildHeight = minMeasuredChildHeight.value || viewportHeight
      const itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1)
      const itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1)
      wrapGroupsPerPage = $props.horizontal ? itemsPerRow : itemsPerCol
    } else {
      let scrollOffset = scrollElement[_scrollType] - previousViewPort.value.padding

      let arrayStartIndex = previousViewPort.value.startIndexWithBuffer || 0
      let wrapGroupIndex = Math.ceil(arrayStartIndex / itemsPerWrapGroup)

      let maxWidthForWrapGroup = 0
      let maxHeightForWrapGroup = 0
      let sumOfVisibleMaxWidths = 0
      let sumOfVisibleMaxHeights = 0
      wrapGroupsPerPage = 0

      for (let i = 0; i < content.children.length; ++i) {
        ++arrayStartIndex
        const child = content.children[i]
        const clientRect = getElementSize(child as HTMLElement)

        maxWidthForWrapGroup = Math.max(maxWidthForWrapGroup, clientRect.width)
        maxHeightForWrapGroup = Math.max(maxHeightForWrapGroup, clientRect.height)

        if (arrayStartIndex % itemsPerWrapGroup === 0) {
          const oldValue = wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex]
          if (oldValue) {
            --wrapGroupDimensions.numberOfKnownWrapGroupChildSizes
            wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= oldValue.childWidth || 0
            wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= oldValue.childHeight || 0
          }

          ++wrapGroupDimensions.numberOfKnownWrapGroupChildSizes
          const items = $props.items.slice(arrayStartIndex - itemsPerWrapGroup, arrayStartIndex)
          wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = {
            childWidth: maxWidthForWrapGroup,
            childHeight: maxHeightForWrapGroup,
            items: items
          }
          wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += maxWidthForWrapGroup
          wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += maxHeightForWrapGroup

          if ($props.horizontal) {
            let maxVisibleWidthForWrapGroup = Math.min(
              maxWidthForWrapGroup,
              Math.max(viewportWidth - sumOfVisibleMaxWidths, 0)
            )
            if (scrollOffset > 0) {
              const scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleWidthForWrapGroup)
              maxVisibleWidthForWrapGroup -= scrollOffsetToRemove
              scrollOffset -= scrollOffsetToRemove
            }

            sumOfVisibleMaxWidths += maxVisibleWidthForWrapGroup
            if (maxVisibleWidthForWrapGroup > 0 && viewportWidth >= sumOfVisibleMaxWidths) {
              ++wrapGroupsPerPage
            }
          } else {
            let maxVisibleHeightForWrapGroup = Math.min(
              maxHeightForWrapGroup,
              Math.max(viewportHeight - sumOfVisibleMaxHeights, 0)
            )
            if (scrollOffset > 0) {
              const scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleHeightForWrapGroup)
              maxVisibleHeightForWrapGroup -= scrollOffsetToRemove
              scrollOffset -= scrollOffsetToRemove
            }

            sumOfVisibleMaxHeights += maxVisibleHeightForWrapGroup
            if (maxVisibleHeightForWrapGroup > 0 && viewportHeight >= sumOfVisibleMaxHeights) {
              ++wrapGroupsPerPage
            }
          }

          ++wrapGroupIndex

          maxWidthForWrapGroup = 0
          maxHeightForWrapGroup = 0
        }
      }

      const averageChildWidth =
        wrapGroupDimensions.sumOfKnownWrapGroupChildWidths /
        wrapGroupDimensions.numberOfKnownWrapGroupChildSizes
      const averageChildHeight =
        wrapGroupDimensions.sumOfKnownWrapGroupChildHeights /
        wrapGroupDimensions.numberOfKnownWrapGroupChildSizes
      defaultChildWidth = averageChildWidth || viewportWidth
      defaultChildHeight = averageChildHeight || viewportHeight

      if ($props.horizontal) {
        if (viewportWidth > sumOfVisibleMaxWidths) {
          wrapGroupsPerPage += Math.ceil(
            (viewportWidth - sumOfVisibleMaxWidths) / defaultChildWidth
          )
        }
      } else {
        if (viewportHeight > sumOfVisibleMaxHeights) {
          wrapGroupsPerPage += Math.ceil(
            (viewportHeight - sumOfVisibleMaxHeights) / defaultChildHeight
          )
        }
      }
    }

    const itemCount = $props.items.length
    const itemsPerPage = itemsPerWrapGroup * wrapGroupsPerPage
    const pageCount_fractional = itemCount / itemsPerPage
    const numberOfWrapGroups = Math.ceil(itemCount / itemsPerWrapGroup)

    let scrollLength = 0

    const defaultScrollLengthPerWrapGroup = $props.horizontal
      ? defaultChildWidth
      : defaultChildHeight
    if ($props.enableUnequalChildrenSizes) {
      let numUnknownChildSizes = 0
      for (let i = 0; i < numberOfWrapGroups; ++i) {
        const childSize =
          wrapGroupDimensions.maxChildSizePerWrapGroup[i] &&
          wrapGroupDimensions.maxChildSizePerWrapGroup[i]?.[_childScrollDim]
        if (childSize) {
          scrollLength += childSize
        } else {
          ++numUnknownChildSizes
        }
      }

      scrollLength += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup)
    } else {
      scrollLength = numberOfWrapGroups * defaultScrollLengthPerWrapGroup
    }

    const viewportLength = $props.horizontal ? viewportWidth : viewportHeight
    const maxScrollPosition = Math.max(scrollLength - viewportLength, 0)

    return {
      childHeight: defaultChildHeight,
      childWidth: defaultChildWidth,
      itemCount: itemCount,
      itemsPerPage: itemsPerPage,
      itemsPerWrapGroup: itemsPerWrapGroup,
      maxScrollPosition: maxScrollPosition,
      pageCount_fractional: pageCount_fractional,
      scrollLength: scrollLength,
      viewportLength: viewportLength,
      wrapGroupsPerPage: wrapGroupsPerPage
    }
  }
  const refresh_internal = (
    itemsArrayModified: boolean,
    refreshCompletedCallback?: () => void,
    maxRunTimes = 2
  ) => {
    if (itemsArrayModified && previousViewPort.value.scrollStartPosition > 0) {
      const oldViewPort = previousViewPort.value
      const oldViewPortItems = viewPortItems.value

      const oldRefreshCompletedCallback = refreshCompletedCallback
      refreshCompletedCallback = () => {
        const scrollLengthDelta = previousViewPort.value.scrollLength - oldViewPort.scrollLength
        if (scrollLengthDelta > 0 && viewPortItems.value) {
          const oldStartItem = oldViewPortItems[0]
          const oldStartItemIndex = $props.items.findIndex((x) =>
            $props.compareItems(oldStartItem, x)
          )
          if (oldStartItemIndex > previousViewPort.value.startIndexWithBuffer) {
            let itemOrderChanged = false
            for (let i = 1; i < viewPortItems.value.length; ++i) {
              if (!$props.compareItems($props.items[oldStartItemIndex + i], oldViewPortItems[i])) {
                itemOrderChanged = true
                break
              }
            }
            if (!itemOrderChanged) {
              scrollToPosition(
                previousViewPort.value.scrollStartPosition + scrollLengthDelta,
                0,
                oldRefreshCompletedCallback
              )
              return
            }
          }
        }

        if (oldRefreshCompletedCallback) {
          oldRefreshCompletedCallback()
        }
      }
    }

    const requestAnimations = () => {
      if (itemsArrayModified) {
        resetWrapGroupDimensions()
      }
      const viewport = calculateViewport()

      const startChanged =
        itemsArrayModified || viewport.startIndex !== previousViewPort.value.startIndex
      const endChanged = itemsArrayModified || viewport.endIndex !== previousViewPort.value.endIndex
      const scrollLengthChanged = viewport.scrollLength !== previousViewPort.value.scrollLength
      const paddingChanged = viewport.padding !== previousViewPort.value.padding
      const scrollPositionChanged =
        viewport.scrollStartPosition !== previousViewPort.value.scrollStartPosition ||
        viewport.scrollEndPosition !== previousViewPort.value.scrollEndPosition ||
        viewport.maxScrollPosition !== previousViewPort.value.maxScrollPosition

      previousViewPort.value = viewport

      if (scrollLengthChanged) {
        invisiblePaddingEl.value!.style.transform = `${_invisiblePaddingProperty}(${viewport.scrollLength})`
      }

      if (paddingChanged) {
        if ($props.useMarginInsteadOfTranslate) {
          contentEl.value!.style[_marginDir!] = `${viewport.padding}px`
        } else {
          contentEl.value!.style.transform = `${_translateDir}(${viewport.padding}px)`
        }
      }

      const changeEventArg: IPageInfo | undefined =
        startChanged || endChanged
          ? {
              startIndex: viewport.startIndex,
              endIndex: viewport.endIndex,
              scrollStartPosition: viewport.scrollStartPosition,
              scrollEndPosition: viewport.scrollEndPosition,
              startIndexWithBuffer: viewport.startIndexWithBuffer,
              endIndexWithBuffer: viewport.endIndexWithBuffer,
              maxScrollPosition: viewport.maxScrollPosition
            }
          : undefined

      if (startChanged || endChanged || scrollPositionChanged) {
        const handleChanged = () => {
          // update the scroll list to trigger re-render of components in viewport
          viewPortItems.value =
            viewport.startIndexWithBuffer >= 0 && viewport.endIndexWithBuffer >= 0
              ? ($props.items as any[]).slice(
                  viewport.startIndexWithBuffer,
                  viewport.endIndexWithBuffer + 1
                )
              : []
          $emits('vsUpdate', viewPortItems.value as any[])

          if (startChanged) {
            $emits('vsStart', changeEventArg!)
          }

          if (endChanged) {
            $emits('vsEnd', changeEventArg!)
          }

          if (startChanged || endChanged) {
            $emits('vsChange', changeEventArg!)
          }

          if (maxRunTimes > 0) {
            refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1)
            return
          }

          if (refreshCompletedCallback) {
            refreshCompletedCallback()
          }
        }

        handleChanged()
      } else {
        if (maxRunTimes > 0 && (scrollLengthChanged || paddingChanged)) {
          refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1)
          return
        }

        if (refreshCompletedCallback) {
          refreshCompletedCallback()
        }
      }
    }
    // requestAnimations()
    // requestAnimationFrame(requestAnimations)
    nextTick(() => requestAnimationFrame(requestAnimations))
  }
  const revertParentOverscroll = () => {}
  const resetWrapGroupDimensions = (): void => {
    const oldWrapGroupDimensions = wrapGroupDimensions
    invalidateAllCachedMeasurements()

    if (
      !$props.enableUnequalChildrenSizes ||
      !oldWrapGroupDimensions ||
      oldWrapGroupDimensions.numberOfKnownWrapGroupChildSizes === 0
    ) {
      return
    }

    const itemsPerWrapGroup: number = countItemsPerWrapGroup()
    for (
      let wrapGroupIndex = 0;
      wrapGroupIndex < oldWrapGroupDimensions.maxChildSizePerWrapGroup.length;
      ++wrapGroupIndex
    ) {
      const oldWrapGroupDimension: WrapGroupDimension =
        oldWrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex]!
      if (
        !oldWrapGroupDimension ||
        !oldWrapGroupDimension.items ||
        !oldWrapGroupDimension.items.length
      ) {
        continue
      }

      if (oldWrapGroupDimension.items.length !== itemsPerWrapGroup) {
        return
      }

      let itemsChanged = false
      const arrayStartIndex = itemsPerWrapGroup * wrapGroupIndex
      for (let i = 0; i < itemsPerWrapGroup; ++i) {
        if (
          !$props.compareItems(oldWrapGroupDimension.items[i], $props.items[arrayStartIndex + i])
        ) {
          itemsChanged = true
          break
        }
      }

      if (!itemsChanged) {
        ++wrapGroupDimensions.numberOfKnownWrapGroupChildSizes
        wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += oldWrapGroupDimension.childWidth || 0
        wrapGroupDimensions.sumOfKnownWrapGroupChildHeights +=
          oldWrapGroupDimension.childHeight || 0
        wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = oldWrapGroupDimension
      }
    }
  }

  const invalidateAllCachedMeasurements = (): void => {
    wrapGroupDimensions = {
      maxChildSizePerWrapGroup: [],
      numberOfKnownWrapGroupChildSizes: 0,
      sumOfKnownWrapGroupChildWidths: 0,
      sumOfKnownWrapGroupChildHeights: 0
    }
    minMeasuredChildWidth.value = undefined
    minMeasuredChildHeight.value = undefined

    refresh_internal(false)
  }
  const invalidateCachedMeasurementAtIndex = (index: number): void => {
    if ($props.enableUnequalChildrenSizes) {
      const cachedMeasurement = wrapGroupDimensions.maxChildSizePerWrapGroup[index]
      if (cachedMeasurement) {
        wrapGroupDimensions.maxChildSizePerWrapGroup[index] = undefined
        --wrapGroupDimensions.numberOfKnownWrapGroupChildSizes
        wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= cachedMeasurement.childWidth || 0
        wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= cachedMeasurement.childHeight || 0
      }
    } else {
      minMeasuredChildWidth.value = undefined
      minMeasuredChildHeight.value = undefined
    }

    refresh_internal(false)
  }
  const invalidateCachedMeasurementForItem = (item: T): void => {
    if ($props.enableUnequalChildrenSizes) {
      const index = $props.items && $props.items.indexOf(item)
      if (index >= 0) {
        invalidateCachedMeasurementAtIndex(index)
      }
    } else {
      minMeasuredChildWidth.value = undefined
      minMeasuredChildHeight.value = undefined
    }

    refresh_internal(false)
  }
  const scrollToIndex_internal = (
    index: number,
    alignToBeginning = true,
    additionalOffset = 0,
    animationMilliseconds?: number,
    animationCompletedCallback?: VoidFunction
  ) => {
    animationMilliseconds =
      animationMilliseconds === undefined ? $props.scrollAnimationTime : animationMilliseconds

    const dimensions = calculateDimensions()
    let scroll = calculatePadding(index, dimensions) + additionalOffset
    if (!alignToBeginning) {
      scroll -= dimensions.wrapGroupsPerPage * dimensions[_childScrollDim]
    }

    scrollToPosition(scroll, animationMilliseconds, animationCompletedCallback)
  }
  const scrollToIndex = (
    index: number,
    alignToBeginning = true,
    additionalOffset = 0,
    animationMilliseconds?: number,
    animationCompletedCallback?: VoidFunction
  ) => {
    let maxRetries = 5

    const retryIfNeeded = () => {
      --maxRetries
      if (maxRetries <= 0) {
        if (animationCompletedCallback) {
          animationCompletedCallback()
        }
        return
      }

      const dimensions = calculateDimensions()
      const desiredStartIndex = Math.min(Math.max(index, 0), dimensions.itemCount - 1)
      if (previousViewPort.value.startIndex === desiredStartIndex) {
        if (animationCompletedCallback) {
          animationCompletedCallback()
        }
        return
      }

      scrollToIndex_internal(index, alignToBeginning, additionalOffset, 0, retryIfNeeded)
    }

    scrollToIndex_internal(
      index,
      alignToBeginning,
      additionalOffset,
      animationMilliseconds,
      retryIfNeeded
    )
  }
  const scrollToPosition = (
    scrollPosition: number,
    animationMilliseconds?: number,
    animationCompletedCallback?: VoidFunction
  ): void => {
    scrollPosition += getElementsOffset()

    animationMilliseconds =
      animationMilliseconds === undefined ? $props.scrollAnimationTime : animationMilliseconds

    const scrollElement = getScrollElement()

    let animationRequest: number

    if (_currentTween) {
      _currentTween.stop()
      _currentTween = undefined
    }

    if (!animationMilliseconds) {
      scrollElement[_scrollType] = scrollPosition
      refresh_internal(false, animationCompletedCallback)
      return
    }

    const tweenConfigObj = { scrollPosition: scrollElement[_scrollType] }

    const newTween = new Tween(tweenConfigObj)
      .to({ scrollPosition }, animationMilliseconds)
      .easing(Easing.Quadratic.Out)
      .onUpdate((data) => {
        if (isNaN(data.scrollPosition)) {
          return
        }
        scrollElement[_scrollType] = data.scrollPosition
        refresh_internal(false)
      })
      .onStop(() => {
        cancelAnimationFrame(animationRequest)
      })
      .start()

    const animate = (time?: number) => {
      if (!newTween['isPlaying']()) {
        return
      }

      newTween.update(time)
      if (tweenConfigObj.scrollPosition === scrollPosition) {
        refresh_internal(false, animationCompletedCallback)
        return
      }

      nextTick(() => {
        animationRequest = requestAnimationFrame(animate)
      })
    }

    animate()
    _currentTween = newTween
  }
  const scrollInto = (
    item: any,
    alignToBeginning = true,
    additionalOffset = 0,
    animationMilliseconds?: number,
    animationCompletedCallback?: VoidFunction
  ): void => {
    const index: number = $props.items.indexOf(item)
    if (index === -1) {
      return
    }

    scrollToIndex(
      index,
      alignToBeginning,
      additionalOffset,
      animationMilliseconds,
      animationCompletedCallback
    )
  }
  const refresh = () => refresh_internal(true)

  onMounted(() => {
    minMeasuredChildWidth.value = undefined
    minMeasuredChildHeight.value = undefined
    updateDirection()
    updateOnScrollFunction()
    addScrollEventHandlers()
    refresh_internal(false)
  })
  onBeforeUnmount(() => {
    removeScrollEventHandlers()
    revertParentOverscroll()
  })

  watch(
    () => [$props.enableUnequalChildrenSizes, $props.scrollDebounceTime],
    () => {
      minMeasuredChildWidth.value = undefined
      minMeasuredChildHeight.value = undefined
    }
  )
  watch(
    () => [$props.scrollThrottlingTime, $props.scrollDebounceTime],
    () => updateOnScrollFunction()
  )
  watch(
    () => $props.checkResizeInterval,
    () => addScrollEventHandlers()
  )
  watch(
    () => $props.horizontal,
    () => updateDirection()
  )
  watch(
    () => [...$props.items],
    (value, oldValue) => {
      console.log('change')
      const indexLengthChanged = cachedItemsLength !== $props.items.length
      cachedItemsLength = value.length

      const firstRun: boolean = !oldValue || oldValue.length === 0
      refresh_internal(indexLengthChanged || firstRun)
    }
  )
  watch(
    () => $props.parentScroll,
    () => {
      revertParentOverscroll()
      addScrollEventHandlers()

      const scrollElement = getScrollElement()
      if ($props.modifyOverflowStyleOfParentScroll && scrollElement !== visualListEl.value) {
        oldParentScrollOverflow = {
          x: scrollElement.style.overflowX,
          y: scrollElement.style.overflowY
        }
        scrollElement.style.overflowX = $props.horizontal ? 'visible' : 'auto'
        scrollElement.style.overflowY = $props.horizontal ? 'auto' : 'visible'
      }
    }
  )

  defineExpose({
    viewPortItems,
    viewPortInfo,
    refresh,
    invalidateAllCachedMeasurements,
    invalidateCachedMeasurementForItem,
    invalidateCachedMeasurementAtIndex,
    scrollInto,
    scrollToIndex,
    scrollToPosition
  })
</script>

<style lang="scss" src="./styles/index.scss"></style>
