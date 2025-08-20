<script setup lang="ts">
  import ServiceTimelineFragments from '@/components/ServiceTimelineFragments/ServiceTimelineFragments.vue'
  import { ref } from 'vue'

  const fragments = ref<any>()

  // 模拟进程数据
  const activeProcess = ref({
    "p1": {
      serviceName: "User Service",
      tags: [
        { key: "instance", value: "user-service-1" },
        { key: "version", value: "v1.2.0" }
      ]
    },
    "p2": {
      serviceName: "Order Service",
      tags: [
        { key: "instance", value: "order-service-3" },
        { key: "version", value: "v2.1.0" }
      ]
    },
    "p3": {
      serviceName: "Payment Service",
      tags: [
        { key: "instance", value: "payment-service-2" },
        { key: "version", value: "v1.5.0" }
      ]
    },
    "p4": {
      serviceName: "Inventory Service",
      tags: [
        { key: "instance", value: "inventory-service-1" },
        { key: "version", value: "v1.0.0" }
      ]
    }
  })

  // 总时间范围 (微秒)
  const timeRange = ref(8000000) // 8秒

  // 开始时间 (微秒时间戳)
  const activeStartTime = ref(1625097600000000) // 一个基准时间

  // 模拟跟踪数据
  const activeTrace = ref([
    {
      id: "span-1",
      operationName: "GET /api/user/profile",
      startTime: activeStartTime.value,
      duration: 3200000, // 3.2秒
      processID: "p1",
      tags: [
        { key: "http.method", value: "GET" },
        { key: "http.status_code", value: "200" },
        { key: "http.url", value: "/api/user/profile" }
      ],
      logs: [
        {
          timestamp: activeStartTime.value + 100000, // 0.1s
          fields: [
            { key: "event", value: "request.started" },
            { key: "message", value: "开始处理用户信息请求" }
          ]
        }
      ],
      children: [
        {
          id: "span-1-1",
          operationName: "getUserFromDB",
          startTime: activeStartTime.value + 200000, // 0.2s
          duration: 800000, // 0.8s
          processID: "p1",
          tags: [
            { key: "db.type", value: "mysql" },
            { key: "db.statement", value: "SELECT * FROM users WHERE id = ?" }
          ],
          logs: [],
          children: [
            {
              id: "span-1-1-1",
              operationName: "DB Connection",
              startTime: activeStartTime.value + 250000, // 0.25s
              duration: 150000, // 0.15s
              processID: "p1",
              tags: [
                { key: "db.connection", value: "acquired" }
              ],
              logs: [],
              children: []
            }
          ]
        },
        {
          id: "span-1-2",
          operationName: "GET /api/orders",
          startTime: activeStartTime.value + 1200000, // 1.2s
          duration: 1800000, // 1.8s
          processID: "p2",
          tags: [
            { key: "http.method", value: "GET" },
            { key: "http.status_code", value: "200" },
            { key: "http.url", value: "/api/orders?userId=123" }
          ],
          logs: [
            {
              timestamp: activeStartTime.value + 1250000, // 1.25s
              fields: [
                { key: "event", value: "request.started" },
                { key: "message", value: "开始获取用户订单" }
              ]
            }
          ],
          children: [
            {
              id: "span-1-2-1",
              operationName: "queryOrders",
              startTime: activeStartTime.value + 1300000, // 1.3s
              duration: 600000, // 0.6s
              processID: "p2",
              tags: [
                { key: "db.type", value: "mysql" },
                { key: "db.statement", value: "SELECT * FROM orders WHERE user_id = ?" }
              ],
              logs: [],
              children: []
            },
            {
              id: "span-1-2-2",
              operationName: "GET /api/payments",
              startTime: activeStartTime.value + 2000000, // 2.0s
              duration: 900000, // 0.9s
              processID: "p3",
              tags: [
                { key: "http.method", value: "GET" },
                { key: "http.status_code", value: "200" },
                { key: "error", value: "true", type: "error" }
              ],
              logs: [
                {
                  timestamp: activeStartTime.value + 2050000, // 2.05s
                  fields: [
                    { key: "event", value: "request.started" },
                    { key: "message", value: "获取支付信息失败，重试中" }
                  ]
                },
                {
                  timestamp: activeStartTime.value + 2400000, // 2.4s
                  fields: [
                    { key: "event", value: "retry" },
                    { key: "message", value: "重试成功" }
                  ]
                }
              ],
              children: []
            }
          ]
        }
      ]
    },
    {
      id: "span-2",
      operationName: "UPDATE /api/inventory",
      startTime: activeStartTime.value + 4000000, // 4.0s
      duration: 3500000, // 3.5s
      processID: "p4",
      tags: [
        { key: "http.method", value: "PUT" },
        { key: "http.status_code", value: "200" },
        { key: "http.url", value: "/api/inventory/update" }
      ],
      logs: [
        {
          timestamp: activeStartTime.value + 4100000, // 4.1s
          fields: [
            { key: "event", value: "inventory.update.started" },
            { key: "message", value: "开始更新库存" }
          ]
        }
      ],
      children: [
        {
          id: "span-2-1",
          operationName: "reserveInventory",
          startTime: activeStartTime.value + 4200000, // 4.2s
          duration: 1200000, // 1.2s
          processID: "p4",
          tags: [
            { key: "db.type", value: "mysql" },
            { key: "db.statement", value: "UPDATE inventory SET reserved = reserved + ? WHERE product_id = ?" }
          ],
          logs: [],
          children: []
        },
        {
          id: "span-2-2",
          operationName: "notifyWarehouse",
          startTime: activeStartTime.value + 5500000, // 5.5s
          duration: 1800000, // 1.8s
          processID: "p4",
          tags: [
            { key: "messaging.system", value: "kafka" },
            { key: "messaging.destination", value: "warehouse-notifications" }
          ],
          logs: [
            {
              timestamp: activeStartTime.value + 5600000, // 5.6s
              fields: [
                { key: "event", value: "message.sent" },
                { key: "message", value: "发送仓库通知" }
              ]
            }
          ],
          children: []
        }
      ]
    }
  ])

  function expandAll() {
    fragments.value?.expandAll()
  }
  function collapseAll() {
    fragments.value?.collapseAll()
  }
  function expandAllChildren() {
    fragments.value?.expandAllChildren()
  }
  function collapseAllChildren() {
    fragments.value?.collapseAllChildren()
  }
  function expandAllDetails() {
    fragments.value?.expandAllDetails()
  }
  function collapseAllDetails() {
    fragments.value?.collapseAllDetails()
  }
</script>

<template>
  <div class="page-container">
    <service-timeline-fragments
      ref="fragments"
      :fragments="activeTrace"
      :processes="activeProcess"
      :duration="timeRange"
      :start-time="activeStartTime"
      title="Service & Operation"
    >
      <template #header>
        <span class="ctrl-btn-item" title="收起所有子节点" @click="collapseAllChildren">
          <Icon type="ios-arrow-forward" />
        </span>
        <span class="ctrl-btn-item" title="展开所有子节点" @click="expandAllChildren">
          <Icon type="ios-arrow-down" />
        </span>
        <span class="ctrl-btn-item" title="收起所有节点详情" @click="collapseAll">
          <Icon type="md-arrow-round-forward" />
        </span>
        <span class="ctrl-btn-item" title="展开所有节点详情" @click="expandAll">
          <Icon type="md-arrow-round-down" />
        </span>
      </template>
    </service-timeline-fragments>
  </div>
</template>

<style scoped lang="scss"></style>
