<script setup lang="ts"></script>

<template>
  <div class="page-desc">所有css动画均来自 Code Pen 和 GitHub</div>
  <div class="spin-loading-list">
    <!-- SPINNER ORBITS -->
    <div class="loader">
      <div class="blue-orbit leo"></div>
      <div class="green-orbit leo"></div>
      <div class="red-orbit leo"></div>
      <div class="white-orbit w1 leo"></div>
      <div class="white-orbit w2 leo"></div>
      <div class="white-orbit w3 leo"></div>
    </div>

    <!-- GRADIENT CIRCLE PLANES -->
    <div class="loader">
      <div class="leo-border-1">
        <div class="leo-core-1"></div>
      </div>
      <div class="leo-border-2">
        <div class="leo-core-2"></div>
      </div>
    </div>

    <!-- SPINNING SQUARES -->
    <div class="loader">
      <div class="configure-border-1">
        <div class="configure-core"></div>
      </div>
      <div class="configure-border-2">
        <div class="configure-core"></div>
      </div>
    </div>

    <!-- SOLAR SYSTEM -->
    <div class="loader">
      <div class="solar-system">
        <div class="earth-orbit orbit">
          <div class="planet earth"></div>
          <div class="venus-orbit orbit">
            <div class="planet venus"></div>
            <div class="mercury-orbit orbit">
              <div class="planet mercury"></div>
              <div class="sun"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loader loading-wrapper">
      <div class="loading-wrapper-text">LOADING</div>
      <div class="loading-wrapper-content"></div>
    </div>

    <div class="loader">
      <div class="spinner-loader"></div>
    </div>
    <div class="loader">
      <div class="throbber-loader"></div>
    </div>
    <div class="loader">
      <div class="refreshing-loader"></div>
    </div>
    <div class="loader">
      <div class="heartbeat-loader"></div>
    </div>
    <div class="loader">
      <div class="gauge-loader"></div>
    </div>
    <div class="loader">
      <div class="three-quarters-loader"></div>
    </div>
    <div class="loader">
      <div class="wobblebar-loader"></div>
    </div>
    <div class="loader">
      <div class="atebits-loader"></div>
    </div>
    <div class="loader">
      <div class="whirly-loader"></div>
    </div>
    <div class="loader">
      <div class="flower-loader"></div>
    </div>
    <div class="loader">
      <div class="dots-loader"></div>
    </div>
    <div class="loader">
      <div class="circles-loader"></div>
    </div>
    <div class="loader">
      <div class="plus-loader"></div>
    </div>
    <div class="loader">
      <div class="pulse-loader"></div>
    </div>
    <div class="loader">
      <div class="hex-dots-loader"></div>
    </div>
    <div class="loader">
      <div class="inner-circles-loader"></div>
    </div>
    <div class="loader">
      <div class="pong-loader"></div>
    </div>
    <div class="loader">
      <div class="timer-loader"></div>
    </div>
    <div class="loader">
      <div class="ball-loader"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import './index';
  @import '@/css/spin-loading/complex';
</style>
