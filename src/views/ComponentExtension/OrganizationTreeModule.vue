<script setup lang="ts">
  import { shallowRef } from 'vue'
  import OrganizationTree from '@/components/OrganizationTree/OrganizationTree.vue'

  const orgTree = shallowRef([
    {
      name: '公司总部',
      leader: {
        id: 1,
        name: '张三'
      },
      members: [
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        },
        {
          id: 4,
          name: '赵六'
        }
      ],
      children: [
        {
          name: '市场部',
          leader: {
            id: 5,
            name: '李四'
          },
          members: [
            {
              id: 6,
              name: '王五'
            },
            {
              id: 7,
              name: '赵六'
            }
          ],
          children: [
            {
              name: '销售团队',
              leader: {
                id: 8,
                name: '王五'
              },
              members: [
                {
                  id: 9,
                  name: '赵六'
                }
              ],
              children: [
                {
                  name: '销售一部',
                  leader: {
                    id: 10,
                    name: '赵六'
                  },
                  members: [
                    {
                      id: 11,
                      name: '张七'
                    },
                    {
                      id: 12,
                      name: '李八'
                    }
                  ],
                  children: []
                },
                {
                  name: '销售二部',
                  leader: {
                    id: 13,
                    name: '赵六'
                  },
                  members: [
                    {
                      id: 14,
                      name: '王九'
                    },
                    {
                      id: 15,
                      name: '刘十'
                    }
                  ],
                  children: []
                }
              ]
            },
            {
              name: '市场推广团队',
              leader: {
                id: 16,
                name: '赵六'
              },
              members: [
                {
                  id: 17,
                  name: '钱十一'
                },
                {
                  id: 18,
                  name: '孙十二'
                }
              ],
              children: []
            }
          ]
        },
        {
          name: '技术部',
          leader: {
            id: 19,
            name: '钱七'
          },
          members: [
            {
              id: 20,
              name: '孙八'
            }
          ],
          children: [
            {
              name: '前端团队',
              leader: {
                id: 21,
                name: '孙八'
              },
              members: [
                {
                  id: 22,
                  name: '周九'
                },
                {
                  id: 23,
                  name: '吴十'
                }
              ],
              children: []
            },
            {
              name: '后端团队',
              leader: {
                id: 24,
                name: '孙八'
              },
              members: [
                {
                  id: 25,
                  name: '郑十一'
                },
                {
                  id: 26,
                  name: '王十二'
                }
              ],
              children: []
            }
          ]
        }
      ]
    }
  ])
</script>

<template>
  <div class="demo-page-container">
    <organization-tree :data="orgTree" />
  </div>
</template>
