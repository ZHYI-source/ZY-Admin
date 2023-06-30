<template>
    <section>
        <ZYSearchForm
                :formValue="query.params"
                @submit="goPage"
                @reset="handleReset"
        >
            <a-form-item name="name">
                <a-input v-model:value="query.params.name" allowClear placeholder="请输入名称" @pressEnter="goPage"
                         autocomplete="off"/>
            </a-form-item>
        </ZYSearchForm>
        <ZyFittleRow @add="goAdd" :showDelete="false"/>
        <a-table
                bordered
                :resizable="true"
                :loading="loading"
                :columns="columns"
                :row-key="record => record.key"
                :pagination="query.pagination"
                @change="handleTableChange"
                :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
                :data-source="data">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'status'">
                    <a-tag color="#f70">{{ record.status === 1 ? '正常' : '禁用' }}</a-tag>
                </template>
                <template v-else-if="column.key === 'action'">
                    <ZyToolButton
                            @view="goView(record)"
                            @edit="goEdit(record)"
                            @delete="goDelete(record)"
                    >
                    </ZyToolButton>
                </template>
            </template>
        </a-table>

        <ZyModal :minWidth="650" :show="state.show.add" title="新增角色" key="GetRolesInfo" @close="close('add')">
            <AddRolesInfo @close="close('add')"/>
        </ZyModal>
        <ZyModal :minWidth="650" :show="state.show.edit" title="编辑角色" key="GetRolesInfo" @close="close('edit')">
            <GetRolesInfo :updateData="state.updateData" @close="close('edit')"/>
        </ZyModal>
        <ZyModal :minWidth="650" :show="state.show.view" title="查看角色" key="GetRolesInfo" @close="close('view')">
            <view-roles-info :viewData="state.viewData" @close="close('view')"/>
        </ZyModal>
        <ZyModalToast ref="childComponentRef"/>
    </section>

</template>

<script setup>
    import {reactive, ref, toRefs, toRaw, onMounted} from 'vue'
    import ZYSearchForm from "comps/common/ZySearchForm.vue";
    import ZyModal from "comps/common/ZyModal.vue";
    import ZyToolButton from "comps/common/ZyToolButton.vue";
    import {ZyConfirm, ZyMessage, ZyNotification} from "../../../libs/utils.toast";
    import {isEmptyObject} from "../../../libs/util.common";
    import ZyFittleRow from "comps/common/ZyFittleRow.vue";
    import ZyModalToast from "comps/common/ZyModalToast.vue";
    import GetRolesInfo from "./get-roles-info.vue";
    import AddRolesInfo from "./add-roles-info.vue";
    import ViewRolesInfo from "./view-roles-info.vue";


    const columns = [
        {title: '角色名称', dataIndex: 'roleName', key: 'roleName', align: 'center'},
        {title: '角色标识', dataIndex: 'roleAuth', key: 'roleAuth', align: ''},
        {title: '备注', dataIndex: 'remark', key: 'remark', align: ''},
        {title: '状态', dataIndex: 'status', key: 'status', align: 'center'},
        {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', align: 'center'},
        {title: '操作', width: 225, key: 'action', align: 'center', fixed: 'right'}
    ];
    const data = [
        {
            id: 1,
            roleName: '超级管理员',
            roleAuth: 'SUPER-ADMIN',
            remark: '拥有所有权限',
            status: 1,
            perms: ['*'],
            createdAt: '2022-04-26 14:11:49'
        },
        {
            id: 2,
            roleName: '普通管理员',
            roleAuth: 'COMMON-ADMIN',
            remark: '拥有部分指定权限',
            status: 1,
            perms: ['sys:user'],
            createdAt: '2022-04-26 14:11:49'
        },

    ];


    // 弹窗
    const openModal = ref(false)
    const state = reactive({
        show: {
            add: false,
            edit: false,
            view: false
        },
        activeComponent: null,
        // 暂存更新数据
        updateData: {},
        // 暂存查看数据
        viewData: {}
    })
    // 请求参数
    const query = reactive({
        params: {},
        pagination: {
            current: 1,
            pageSize: 10,
            total: 100,
            hideOnSinglePage: true,
        },
        sort: {
            columnKey: "id",
            order: "ascend"
        }
    });
    const loading = reactive({
        spinning: false,
        tip: '加载中'
    });
    // 查询
    const goPage = (num = 1) => {
        query.pagination.current = num;
        getDataList()
    }
    // 重置查询条件
    const handleReset = () => {
        goPage()
    }
    // 分页
    const pageChange = ({current, pageSize}) => {
        // 更新当前页码和每页条数
        query.pagination.current = current;
        query.pagination.pageSize = pageSize;
        getDataList()
    }
    // 排序
    const sorterChange = ({columnKey, order}) => {
        // 更新当前排序
        query.sort.current = columnKey;
        query.sort.order = order;
        getDataList()
    }

    // 加载数据
    const getDataList = () => {
        loading.spinning = true
        // 将响应式query返回起原始对象
        let p = toRaw(query)

        setTimeout(() => {
            loading.spinning = false
        }, 1000)
    }

    // 处理表格变化事件
    const handleTableChange = (paginationValue, filters, sorter) => {
        if (!isEmptyObject(paginationValue)) {
            pageChange(paginationValue)
        }
        if (!isEmptyObject(sorter)) {
            sorterChange(sorter)
        }
    };


    const goView = (row) => {
        state.show.view = true
        state.viewData = row
    }

    const goAdd = () => {
        state.show.add = true

    }

    const goEdit = (row) => {
        state.show.edit = true
        state.updateData = row
        // ZyMessage.success('success')
        // ZyNotification.info('提示', '你好啊')
    }

    const goDelete = (row) => {
        console.log(row)
        ZyConfirm('确认删除该条数据?').then(ok => {
            console.log(ok)
        })
    }
    const close = (type) => {
        state.show[type] = false
    }


</script>

<style scoped>

</style>
