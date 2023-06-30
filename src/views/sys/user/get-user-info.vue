<template>
  <section class="zy-get">
    <a-form :model="state.form"
            class="zy-form"
            :label-col="labelCol"
            ref="formRef"
            :wrapper-col="wrapperCol">
      <a-form-item label="头像">
        <a-image
            :width="40"
            :src="state.form.avatar"
        />
      </a-form-item>
      <a-form-item label="昵称" name="nickname"
                   :rules="[{ required: true, message: 'Please input your nickname!' }]">
        <a-input v-model:value="state.form.nickname" allowClear placeholder="请输入昵称"/>
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="state.form.username" allowClear placeholder="请输入用户名"/>
      </a-form-item>
      <a-form-item label="密码">
        <a-input v-model:value="state.form.password" allowClear placeholder="请输入密码"/>
      </a-form-item>
      <a-form-item label="角色">
        <a-input v-model:value="state.form.roleName" allowClear placeholder="请输入角色"/>
      </a-form-item>
      <a-form-item label="状态">
        <a-radio-group v-model:value="state.form.status">
          <a-radio :value="1">正常</a-radio>
          <a-radio :value="0">禁用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="备注">
        <a-textarea v-model:value="state.form.remark" allowClear placeholder="请输入备注"/>
      </a-form-item>
    </a-form>
    <ZyFormButton @save="onSubmit" @close="close"/>
  </section>
</template>

<script setup>
import {reactive, toRaw, ref} from 'vue';
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
const formRef = ref();


const emit = defineEmits(['close'])

state.form = props.updateData || {}


const onSubmit = async () => {
  try {
    const values = await formRef.value.validateFields();
    console.log('submit!', toRaw(state.form));
    console.log('submit!', values);
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
  }

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
