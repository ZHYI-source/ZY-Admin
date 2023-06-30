<template>
  <section class="zy-tree">
    <a-tree
        :expandedKeys="internalExpandedKeys"
        :selectedKeys="internalSelectedKeys"
        :checkedKeys="internalCheckedKeys"
        checkable
        :tree-data="treeData"
        :field-names="fieldNames"
        @update:expandedKeys="updateExpandedKeys"
        @update:selectedKeys="updateSelectedKeys"
        @update:checkedKeys="updateCheckedKeys"
    >
      <template #title="{ auth, name, key }">
        <span v-if="auth">
          {{ name }}
          <a-tag color="orange" style="margin-left: 5px">
            <template #icon>
              <IconFont type="icon-quanxianguanli"/>
            </template>
            {{ key }}
          </a-tag>
        </span>
        <template v-else>{{ name }}</template>
      </template>
    </a-tree>
  </section>
</template>

<script setup>
import {ref, watch} from 'vue';

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:value']);

const internalExpandedKeys = ref(props.value);
const internalSelectedKeys = ref(props.value);
const internalCheckedKeys = ref(props.value);

const fieldNames = {
  children: 'child',
  title: 'name',
};
const treeData = [
  {
    name: '首页',
    key: 'index',
  },
  {
    name: '系统管理',
    key: 'sys',
    child: [
      {
        name: '用户管理',
        key: 'sys:user',
        child: [
          {
            name: '查询',
            key: 'sys:user:list',
            auth: true,
          },
          {
            name: '增加',
            key: 'sys:user:create',
            auth: true,
          },
          {
            name: '更新',
            key: 'sys:user:update',
            auth: true,
          },
          {
            name: '删除',
            key: 'sys:user:delete',
            auth: true,
          },
        ],
      },
      {
        name: '角色管理',
        key: 'sys:role',
        child: [
          {
            name: '查询',
            key: 'sys:role:list',
            auth: true,
          },
          {
            name: '增加',
            key: 'sys:role:create',
            auth: true,
          },
          {
            name: '更新',
            key: 'sys:role:update',
            auth: true,
          },
          {
            name: '删除',
            key: 'sys:role:delete',
            auth: true,
          },
        ],
      },
      {
        name: '菜单管理',
        key: 'sys:menu',
        child: [
          {
            name: '查询',
            key: 'sys:menu:list',
            auth: true,
          },
          {
            name: '增加',
            key: 'sys:menu:create',
            auth: true,
          },
          {
            name: '更新',
            key: 'sys:menu:update',
            auth: true,
          },
          {
            name: '删除',
            key: 'sys:menu:delete',
            auth: true,
          },
        ],
      },
    ],
  },
];


// 定义一个空数组来存储筛选后的key值
const keysArray = [];

// 递归遍历treeData数组，筛选出key值并存储到keysArray数组中
function extractKeys(data) {
  data.forEach(item => {
    keysArray.push(item.key);
    if (item.child) {
      extractKeys(item.child);
    }
  });
}

// 对于超级管理员的判断
if (props.value.includes('*')) {
  extractKeys(treeData)
  internalExpandedKeys.value = keysArray
  internalSelectedKeys.value = keysArray
  internalCheckedKeys.value = keysArray
}


watch(internalCheckedKeys, (newValue) => {
  // 父组件直接使用 v-model:value
  emit('update:value', newValue);
});


function updateExpandedKeys(keys) {
  internalExpandedKeys.value = keys;
}

function updateSelectedKeys(keys) {
  internalSelectedKeys.value = keys;
}


function updateCheckedKeys(keys) {
  internalCheckedKeys.value = keys;
}
</script>

<style lang="scss" scoped>
.zy-tree {
  border-radius: 5px;
  overflow: hidden;
  padding: 5px;
  margin: 10px 0;
  border: 1px solid #eee;
  //box-shadow: 0 0 10px rgba($color-primary,.2);
}
</style>
