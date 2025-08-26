/**
 * CesiumManager.ts
 *
 * 一个用于管理 Cesium Viewer、动态添加/移除高德（Amap）切片图层以及加载/移除 3D Tiles 模型的 TypeScript 类。
 *
 * *从 node_modules 中引入的 cesium 仅提供类型支持，需要将实际的 cesium 相关 js 手动引入手挂在到 window 对象上。*
 *
 * s3mb 格式 3D Tiles 文件，需要通过 superMap 插件导入
 *
 * files and plugins:
 * cesium-helpers: https://github.com/geoblocks/cesium-helpers
 */
import type { Viewer, UrlTemplateImageryProvider, ImageryLayer } from 'cesium'

const Cesium = window.Cesium

/**
 * Cesium 构造函数配置
 */
export interface CesiumManagerOptions {
  // Viewer 挂载容器 id 或 HTMLElement，默认 "cesiumContainer"
  container?: string | HTMLElement
  // 透传给 Viewer 的参数
  viewerOptions?: Viewer.ConstructorOptions
  // 是否在构造时自动初始化 Viewer，默认 true
  autoInit?: boolean
}

/**
 * 高德地图图层配置
 */
export interface AMapImageTemplateOptions {
  // 手动指定图层加载地址，默认为空
  url?: string
  // 子域名，默认webst
  domain?: 'webst' | 'webrd'
  // 指定服务轮询参数，默认 ['01', '02', '03', '04']
  subdomains?: string[]
  // 指定语言， 默认中文 'zh_cn'
  lang: 'zh_cn' | 'en'
  // 高德地图服务地图风格类型，'6': 卫星影像; '7': 道路图; '8': 道路图(背景透明)
  mapStyle: 6 | 7 | 8
  // 指定尺寸控制参数。 '1': 256*256; '2': 512*512
  scl: '1' | '2'
  // 指定类型参数。'0': 默认; '4': 只有注记; '8': 只有道路
  ltype: '0' | '4' | '8'
}

/**
 * CesiumManager
 * 管理 Cesium Viewer、高德图层和 3D Tiles 模型
 */
export default class CesiumManager {
  public viewer: Viewer | null = null
  private container: string | HTMLElement
  private viewerOptions?: Viewer.ConstructorOptions
  private autoInit: boolean

  private layers: Map<string, { provider: UrlTemplateImageryProvider; imageryLayer: ImageryLayer }>
  private models: Map<string, any>

  constructor(options?: CesiumManagerOptions) {
    this.container = options?.container ?? 'cesiumContainer'
    this.viewerOptions = options?.viewerOptions || {}
    this.autoInit = options?.autoInit ?? true

    this.layers = new Map()
    this.models = new Map()

    if (this.autoInit) {
      this.initViewer()
    }
  }

  /**
   * 初始化 Cesium Viewer
   */
  public initViewer(): Viewer {
    if (this.viewer) return this.viewer

    const container =
      typeof this.container === 'string'
        ? (document.getElementById(this.container) as HTMLElement)
        : this.container

    if (!container) {
      throw new Error(`CesiumManager: 无法找到容器元素: ${this.container}`)
    }

    // 常用默认项，可由 viewerOptions 覆盖
    const defaultOptions: Viewer.ConstructorOptions = {
      timeline: false,
      animation: false,
      baseLayerPicker: false,
      geocoder: false,
      scene3DOnly: true,
      selectionIndicator: false,
      infoBox: false,
      shouldAnimate: true
    }

    const options = { ...defaultOptions, ...this.viewerOptions }

    this.viewer = new Cesium.Viewer(container, options) as Viewer

    console.log(Cesium.CameraEventType)
    console.log(this.viewer.scene.screenSpaceCameraController)
    // this.viewer.scene.screenSpaceCameraController.zoomEventTypes = [
    //   Cesium.CameraEventType.WHEEL,
    //   Cesium.CameraEventType.PINCH
    // ]
    // this.viewer.scene.screenSpaceCameraController.tiltEventTypes = [
    //   Cesium.CameraEventType.PINCH,
    //   Cesium.CameraEventType.RIGHT_DRAG
    // ]

    return this.viewer
  }

  /**
   * 销毁 Viewer 并清理所有资源
   */
  public destroy(): void {
    if (this.viewer) {
      try {
        this.viewer.destroy()
      } catch (e) {
        // ignore
        // console.warn("CesiumManager: viewer.destroy() 抛出异常", e);
      }
    }
    this.viewer = null
  }

  ///////////////////////////// 图层相关
  /**
   * 获取高德地图
   * 高德瓦片地图参考：https://zouyaoji.top/vue-cesium/#/zh-CN/component/providers/vc-imagery-provider-amap
   */
  public initAMapImageryProvider(
    amapOptions?: AMapImageTemplateOptions,
    providerOptions?: UrlTemplateImageryProvider.ConstructorOptions
  ) {
    const {
      url,
      domain = 'webst',
      subdomains = ['01', '02', '03', '04'],
      lang = 'zh_cn',
      mapStyle = 6,
      ltype = '0',
      scl = '1'
    } = amapOptions || {}
    if (url) {
      return new Cesium.UrlTemplateImageryProvider({
        url,
        ...providerOptions
      }) as UrlTemplateImageryProvider
    }

    const amapUrl = `https://${domain}{s}.is.autonavi.com/appmaptile?&x={x}&y={y}&z={z}&size=1&scl=${scl}&ltype=${ltype}&lang=${lang}&style=${mapStyle}`
    return new Cesium.UrlTemplateImageryProvider({
      url: amapUrl,
      subdomains, //多域名请求
      ...providerOptions
    }) as UrlTemplateImageryProvider
  }

  /**
   * 设置高德地图图层
   */
  public setAMapImageryLayer(
    layerId: string,
    amapOptions?: AMapImageTemplateOptions,
    providerOptions?: UrlTemplateImageryProvider.ConstructorOptions,
    imageIndex?: number
  ) {
    if (!this.viewer) {
      this.initViewer()
    }
    if (this.layers.has(layerId)) {
      console.warn(`CesiumManager: 图层已存在: ${layerId}`)
      const { imageryLayer, provider } = this.layers.get(layerId)!
      return { layerId, imageryLayer, provider }
    }

    const provider = this.initAMapImageryProvider(amapOptions, providerOptions)
    const imageryLayer = this.viewer!.imageryLayers.addImageryProvider(provider, imageIndex)
    this.layers.set(layerId, { imageryLayer, provider })
    return { layerId, imageryLayer, provider }
  }

  /**
   * 获取所有已设置图层
   */
  public getAllLayers(): Map<
    string,
    { provider: UrlTemplateImageryProvider; imageryLayer: ImageryLayer }
  > {
    console.log(this.viewer?.imageryLayers)
    return this.layers
  }

  /**
   * 获取指定图层
   */
  public getLayer(
    layerId: string
  ): { provider: UrlTemplateImageryProvider; imageryLayer: ImageryLayer } | undefined {
    return this.layers.get(layerId)
  }

  /**
   * 切换指定图层的可见性
   */
  public toggleLayerVisibility(layerId: string): void {
    if (!layerId) return

    const layer = this.layers.get(layerId)
    if (layer) {
      layer.imageryLayer.show = !layer.imageryLayer.show
    }
  }

  ///////////////////////////// 3d tiles 模型相关
  /**
   * 加载超图 s3mb scp 模型
   */
  public async loadSuperMapS3MBModelByScp(scpUrl: string, modelId: string) {
    if (!scpUrl) {
      return new Error('CesiumManager: scpUrl 不能为空')
    }
    if (!this.viewer) {
      this.initViewer()
    }

    const scene = this.viewer!.scene
    const modelLayer = await (scene as any).addS3MTilesLayerByScp(scpUrl, {
      name: modelId
    })

    this.models.set(modelId, modelLayer)

    console.log(modelLayer)

    return modelLayer
  }

  ///////////////////////////// 版本相关
  /**
   * 获取当前 CesiumJS 的版本号字符串（从 Cesium.VERSION 或 Cesium.version 中读取）
   * 如果无法读取到版本信息，会返回 "unknown"
   */
  public getCesiumVersion(versionKey?: string): string {
    // Cesium 库中常见的版本字段是 VERSION（大写），但也有可能是 version（小写）
    if (versionKey && Cesium[versionKey]) {
      return String(Cesium[versionKey])
    }
    const v = (Cesium as any).VERSION ?? (Cesium as any).version ?? 'unknown'
    return String(v)
  }
  /**
   * 比较当前 Cesium 版本与目标版本（target）。
   * 返回:
   *  1  -> 当前版本大于目标版本
   *  0  -> 当前版本等于目标版本
   * -1  -> 当前版本小于目标版本
   *
   * 如果无法读取当前版本，会抛出错误。
   */
  public compareCesiumVersion(target: string): -1 | 0 | 1 {
    const current = this.getCesiumVersion()
    if (!current || current === 'unknown') {
      throw new Error('CesiumManager: 当前 Cesium 版本未知，无法比较')
    }
    if (!target) {
      throw new Error('CesiumManager: 目标版本不能为空')
    }

    const a = parseVersionString(current)
    const b = parseVersionString(target)
    const len = Math.max(a.length, b.length)

    for (let i = 0; i < len; i++) {
      const ai = a[i] ?? 0
      const bi = b[i] ?? 0
      if (ai > bi) return 1
      if (ai < bi) return -1
    }
    return 0
  }
  /**
   * 判断当前 Cesium 版本是否至少为 target（>= target）
   */
  public isCesiumVersionAtLeast(target: string): boolean {
    return this.compareCesiumVersion(target) >= 0
  }
  /**
   * 判断当前 Cesium 版本是否严格大于 target（> target）
   */
  public isCesiumVersionGreaterThan(target: string): boolean {
    return this.compareCesiumVersion(target) > 0
  }
  /**
   * 判断当前 Cesium 版本是否严格小于 target（< target）
   */
  public isCesiumVersionLessThan(target: string): boolean {
    return this.compareCesiumVersion(target) < 0
  }
}

////////////////////////////////////////// utils

/**
 * 将版本字符串解析为数字数组，例如 "1.105.0" -> [1,105,0]
 */
function parseVersionString(version: string): number[] {
  if (!version) return []
  // 去掉前缀 v 或 V，然后按非数字字符分割
  const cleaned = version.replace(/^[vV]/, '')
  return cleaned
    .split(/[^0-9]+/)
    .filter(Boolean)
    .map((p) => {
      const n = parseInt(p, 10)
      return Number.isNaN(n) ? 0 : n
    })
}
