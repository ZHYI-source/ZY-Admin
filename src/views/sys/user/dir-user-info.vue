<template>
    <section>
        <ZYSearchForm
                :formValue="query.params"
                @submit="goPage"
                @reset="handleReset"
        >
            <a-form-item name="name">
                <a-input v-model:value="query.params.username" allowClear placeholder="请输入用户名" @pressEnter="goPage"
                         autocomplete="off"/>
            </a-form-item>
        </ZYSearchForm>
        <ZyFittleRow @add="goEdit" :showDelete="false"/>
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
                <template v-if="column.key === 'avatar'">
                    <a-image
                            :width="40"
                            :src="record.avatar"
                    />
                </template>
                <template v-if="column.key === 'status'">
                    <a-tag color="#f70">{{ record.status === 1 ? '正常' : '禁用' }}</a-tag>
                </template>
                <template v-else-if="column.key === 'action'">
                    <ZyToolButton
                            :viewAuth="['sys']"
                            @view="goView(record)"
                            @edit="goEdit(record)"
                            @delete="goDelete(record)"
                    >
                    </ZyToolButton>
                </template>
            </template>
        </a-table>
        <ZyModal :minWidth="650" :show="state.show.edit" :title="state.editTitle" key="GetUserInfo"
                 @close="close('edit')">
            <GetUserInfo :updateData="state.updateData" @close="close('edit')"/>
        </ZyModal>
        <ZyModal :minWidth="650" :show="state.show.view" title="查看用户" key="ViewUserInfo" @close="close('view')">
            <ViewUserInfo :viewData="state.viewData" @close="close('view')"/>
        </ZyModal>
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
    import GetUserInfo from "./get-user-info.vue";
    import ViewUserInfo from "./view-user-info.vue";

    const columns = [
        {title: '头像', dataIndex: 'avatar', key: 'avatar', align: 'center'},
        {title: '昵称', dataIndex: 'nickname', key: 'nickname', align: 'center'},
        {title: '用户名', dataIndex: 'username', key: 'username', align: 'center'},
        {title: '密码', dataIndex: 'password', key: 'password', align: 'center'},
        {title: '角色', dataIndex: 'roleName', key: 'roleName', align: 'center'},
        {title: '备注', dataIndex: 'remark', key: 'remark', align: ''},
        {title: '状态', dataIndex: 'status', key: 'status', align: 'center'},
        {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', align: 'center'},
        {title: '操作', width: 225, key: 'action', align: 'center', fixed: 'right'}
    ];
    const data = [
        {
            id: 1,
            avatar: 'http://zhouyi.run:5222/api/public/admin/getFiles?id=5d38c26acf509bdcab4f8c677ce90088.png&&mimetype=image/png',
            nickname: '玛丽',
            username: 'admin',
            password: '123456',
            roleName: '超级管理员',
            remark: '管理摸鱼的人',
            status: 1,
            createdAt: '2022-04-26 14:11:49'
        },
        {
            id: 2,
            avatar: 'http://zhouyi.run:5222/api/public/admin/getFiles?id=5d38c26acf509bdcab4f8c677ce90088.png&&mimetype=image/png',
            nickname: '玛丽',
            username: 'admin',
            password: '123456',
            roleName: '超级管理员',
            remark: '管理摸鱼的人',
            status: 1,
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
        editTitle: '编辑用户',
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
        row && row.id ? state.editTitle = '修改用户' : state.editTitle = '添加用户'
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
