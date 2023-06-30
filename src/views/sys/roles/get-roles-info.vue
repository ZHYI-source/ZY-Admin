<template>
    <section class="zy-get">
        <a-form :model="state.form" class="zy-form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="角色名称">
                <a-input v-model:value="state.form.roleName" allowClear placeholder="请输入角色名称"/>
            </a-form-item>
            <a-form-item label="角色备注">
                <a-textarea v-model:value="state.form.remark" allowClear placeholder="请输入角色备注"/>
            </a-form-item>
            <a-form-item label="状态">
                <a-radio-group v-model:value="state.form.status">
                    <a-radio :value="1">正常</a-radio>
                    <a-radio :value="0">禁用</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="菜单权限">
                <ZyPermTree v-model:value="state.form.perms"/>
            </a-form-item>
        </a-form>
        <ZyFormButton @save="onSubmit" @close="close"/>
    </section>
</template>

<script setup>
    import {ref, watch, reactive, toRaw} from 'vue';
    import ZyPermTree from "comps/common/ZyPermTree.vue";
    import ZyFormButton from "comps/common/ZyFormButton.vue";
    import {ZyConfirm} from "../../../libs/utils.toast";

    const labelCol = {
        style: {
            width: '100px',
        },
    }
    const wrapperCol = {
        span: 14,
    }

    const state = reactive({
        form: {}
    });

    const props = defineProps({
        updateData: {
            type: Object,
            default: () => {
            }
        }
    })
    const emit = defineEmits(['close'])

    state.form = props.updateData || {}


    const onSubmit = () => {
        console.log('submit!', toRaw(state.form));
    };

    const close = () => {
        ZyConfirm('还没保存数据，确认退出?').then(ok => {
            if (!ok) return
            emit('close')
        })
    }
</script>

<style scoped>

</style>
