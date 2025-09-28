<script setup lang="ts">
  import { NButton, NCard, NSpace } from 'naive-ui'
  import CesiumManager from '@/classes/CesiumManager/CesiumManager'

  const Cesium = window.Cesium

  const modelUrl = './TJSG1@JJTGS/TJSG1@JJTGS.json'

  let manager: CesiumManager | null = null

  function init() {
    manager = new CesiumManager({
      container: 'cesium-container', // 或 HTMLElement
      viewerOptions: {
        selectionIndicator: false,
        timeline: true,
        baseLayerPicker: false,
        //shadows: true,
        infoBox: false
        // geocoder: true,  //查询
        // skyBox: false, // 关闭天空盒会一同关闭太阳，场景会变暗
        // navigation: false,
        // contextOptions: {
        //   requestWebgl2: true
        // }
      },
      useUI: false,
      autoInit: true // 是否在构造时自动初始化
    })
    console.log('cesium初始化完成, 当前 Cesium 版本：', manager.getCesiumVersion())
    // @ts-expect-error
    window._manager = manager
  }

  function logAllImageLayers() {
    console.log(manager?.getAllLayers())
  }

  // 加载高德道路图层
  function loadAmapRoadLayer() {
    !manager && init()
    manager!.setAMapImageryLayer('amap-roads', {
      mapStyle: 7
    })
  }

  // 加载高德卫星影像
  function loadAmapSatelliteLayer() {
    !manager && init()
    manager!.setAMapImageryLayer('amap-satellite', {
      mapStyle: 6
    })
  }

  // 切换显示隐藏
  function toggleLayerVisibility(layerId: string) {
    !manager && init()
    manager!.toggleLayerVisibility(layerId)
  }

  // 加载本地模型
  async function loadLocalScpModel() {
    !manager && init()

    const layer = await manager!.loadSuperMapS3MBModelByScp('./localModels2/model.scp', 'localScp')

    console.log(layer)

    manager!.moveToCoordinates(layer.lon, layer.lat, 3000)

    layer.datasetInfo().then((info) => console.log(info))

    var viewModel = {
      material: '#ffffff'
    }
    // 初始化选中颜色
    var color = new Cesium.Color.fromCssColorString('rgba(23,92,239,0.5)')
    layer.selectedColor = color

    // 用户自定义选中颜色
    // Cesium.knockout.getObservable(viewModel, 'material').subscribe(function (newValue) {
    //   var color = Cesium.Color.fromCssColorString(newValue)
    //   layer.selectedColor = color
    // })
  }

  // 加载官方模型
  async function loadOfficialModel() {
    !manager && init()
    // const layer = await manager!.loadSuperMapS3MBModelByScp(
    //   'http://www.supermapol.com/realspace/services/3D-BIMbuilding/rest/realspace/scenes/BIMBuilding.json',
    //   'BIMBuilding'
    // )
    // console.log(layer)

    manager!.loadSuperMapOnlineModel(window.URL_CONFIG.SCENE_BIMBUILDING, 'SCENE_BIMBUILDING')

    // /设置相机位置、方向，定位至模型
    manager!.viewer!.scene.camera.setView({
      destination: new Cesium.Cartesian3(-2180753.065987198, 4379023.266141494, 4092583.575045952),
      orientation: {
        heading: 4.0392222751147955,
        pitch: 0.010279641987852584,
        roll: 1.240962888005015e-11
      }
    })

    // const scene = manager!.viewer.scene
    // scene.lightSource.ambientLightColor = new Cesium.Color(0.65, 0.65, 0.65, 1)
    // const widget = manager!.viewer.cesiumWidget
    // // @ts-expect-error
    // const promise = scene.open(URL_CONFIG.SCENE_SUOFEIYA)
    // Cesium.when(
    //   promise,
    //   function () {
    //     const layer = scene.layers.find('Config')
    //     //设置相机位置，定位至模型
    //     scene.camera.setView({
    //       //将经度、纬度、高度的坐标转换为笛卡尔坐标
    //       destination: new Cesium.Cartesian3(
    //         -2653915.6463913363,
    //         3571045.726807149,
    //         4570293.566342328
    //       ),
    //       orientation: {
    //         heading: 2.1953426301495345,
    //         pitch: -0.33632707158103625,
    //         roll: 6.283185307179586
    //       }
    //     })
    //   },
    //   function () {
    //     const title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？'
    //     widget.showErrorPanel(title, undefined, e)
    //   }
    // )
  }
</script>

<template>
  <div class="cesium-amap-demo">
    <div class="control-panel">
      <n-card title="Cesium 控制面板" size="small">
        <n-space vertical>
          <!-- 基础控制 -->
          <n-space>
            <n-button type="tertiary" @click="init"> 初始化Cesium </n-button>
          </n-space>
          <n-space>
            <n-button type="success" @click="loadAmapRoadLayer"> 加载高德道路图层 </n-button>
            <n-button type="success" @click="loadAmapSatelliteLayer"> 加载高德卫星图层 </n-button>
            <n-button type="success" ghost @click="toggleLayerVisibility('amap-roads')">
              切换道路图层显示
            </n-button>
            <n-button type="success" ghost @click="toggleLayerVisibility('amap-satellite')">
              切换卫星图层显示
            </n-button>
            <n-button type="success" @click="logAllImageLayers"> 打印已加载图层 </n-button>
          </n-space>
          <n-space>
            <n-button type="primary" @click="loadLocalScpModel"> 加载本地模型 </n-button>
            <n-button type="primary" @click="loadOfficialModel"> 加载官方模型 </n-button>
          </n-space>
        </n-space>
      </n-card>
    </div>

    <!-- Cesium容器 -->
    <div id="cesium-container" class="cesium-container"></div>
  </div>
</template>

<style lang="scss">
  .cesium-amap-demo {
    display: flex;
  }

  .control-panel {
    width: 400px;
    padding: 16px;
    background: #f5f5f5;
    overflow-y: auto;
    flex-shrink: 0;
  }

  .cesium-container {
    flex: 1;
    position: relative;
    background: #000;
  }
</style>
