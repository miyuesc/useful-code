// src/types/window.d.ts

import * as Cesium from 'cesium'

declare global {
  interface Window {
    Cesium: Cesium
  }
}

export {}
