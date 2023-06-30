<template>
    <section class="zy-get">
        <a-form :model="state.form" style="background-color:#fff;" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="角色名称">
                <a-input v-model:value="state.form.roleName" allowClear placeholder="请输入角色名称"/>
            </a-form-item>
            <a-form-item label="角色标识">
                <a-input v-model:value="state.form.roleAuth" allowClear placeholder="请输入角色标识"/>
            </a-form-item>
            <a-form-item label="角色备注">
                <a-textarea v-model:value="state.form.remark" allowClear placeholder="请输入角色备注"/>
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

    const perms = ref(['sys:user'])

    watch(perms, (newValue) => {
        console.log('Parent component - perms:', newValue);
    });

    const labelCol = {
        style: {
            width: '100px',
        },
    }
    const wrapperCol = {
        span: 14,
    }


    const props = defineProps({})
    const emit = defineEmits(['close'])


    const state = reactive({
        form: {}
    });
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
