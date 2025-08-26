/// <reference types="vite/client" />
import * as Cesium from 'cesium'

declare global {
  window: {
    Cesium: Cesium
  }
}
