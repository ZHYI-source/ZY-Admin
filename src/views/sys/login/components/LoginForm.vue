<template>
  <div v-show="getShow">
    <h2 class="login-title">登录</h2>
    <a-form
        loading
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
      >
        <a-input v-model:value="formState.username" allowClear autocomplete="off" size="large"
                 placeholder="用户名">
          <template #prefix>
            <IconFont type="icon-yonghuming" style="font-size: 18px"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="formState.password" allowClear autocomplete="off" placeholder="密码"
                          size="large">
          <template #prefix>
            <IconFont type="icon-mima" style="font-size: 18px"/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
          name="code"
          :rules="[{ required: true, validator: validatePass,}]"
      >
        <div style="display: flex">
          <a-input v-model:value.number="formState.code" allowClear autocomplete="off" size="large" placeholder="验证码">
            <template #prefix>
              <IconFont type="icon-yanzhengma" style="font-size: 18px"/>
            </template>
          </a-input>
          <div class="login-code">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="38" viewBox="0,0,90,38">
              <path d="M4 26 C63 31,57 27,84 29" stroke="#92e476" fill="none"></path>
              <path d="M19 7 C51 20,34 11,69 26" stroke="#e56a6a" fill="none"></path>
              <path d="M6 30 C45 30,48 22,85 8" stroke="#b2d740" fill="none"></path>
              <path d="M20 6 C45 34,24 8,83 19" stroke="#e89b82" fill="none"></path>
              <path fill="#df714d"
                    d="M42.62 33.27L42.50 33.15L42.65 33.29Q41.96 33.24 41.29 33.28L41.29 33.29L41.23 33.22Q40.48 33.26 39.80 33.26L39.92 33.37L39.75 33.20Q40.37 30.01 40.37 26.64L40.26 26.54L40.31 26.58Q38.41 26.52 37.52 26.52L37.60 26.61L37.67 26.67Q36.68 26.50 34.88 26.43L34.86 26.40L34.96 26.50Q34.96 26.20 34.77 23.77L34.84 23.84L34.74 23.75Q37.31 24.33 40.22 24.33L40.21 24.32L40.14 24.24Q39.95 19.98 39.54 17.44L39.48 17.38L39.47 17.37Q40.33 17.55 41.11 17.55L41.15 17.59L42.72 17.55L42.69 17.52Q42.56 21.80 42.56 24.34L42.61 24.40L42.61 24.40Q44.72 24.37 47.86 24.04L47.88 24.06L47.81 23.99Q47.65 25.25 47.65 26.44L47.66 26.46L47.63 26.43Q47.39 26.44 46.60 26.48L46.64 26.52L46.69 26.57Q45.58 26.43 44.98 26.47L45.03 26.52L45.02 26.50Q45.14 26.63 42.53 26.63L42.53 26.63L42.53 30.00L42.38 29.85Q42.42 31.49 42.53 33.18ZM48.27 23.55L48.14 23.42L48.28 23.56Q46.41 23.86 44.58 23.93L44.44 23.80L44.56 23.92Q44.75 20.78 45.16 18.94L45.25 19.04L45.24 19.02Q44.44 18.97 43.05 19.12L43.14 19.20L43.27 17.13L43.19 17.05Q40.67 17.11 39.03 17.00L39.05 17.02L39.03 17.00Q39.62 20.10 39.81 23.91L39.85 23.95L39.77 23.87Q38.08 23.87 34.46 23.27L34.47 23.28L34.44 23.25Q34.63 24.34 34.63 26.92L34.62 26.92L36.20 26.99L36.09 26.89Q36.10 27.60 35.95 28.99L36.10 29.14L39.86 28.75L39.87 28.76Q39.62 31.84 39.32 33.64L39.44 33.75L39.46 33.77Q40.19 33.75 41.57 33.64L41.49 33.56L41.52 33.59Q41.55 34.29 41.52 35.60L41.39 35.48L41.48 35.56Q41.92 35.48 45.47 35.63L45.53 35.69L45.47 35.63Q44.70 32.73 44.48 28.84L44.51 28.87L44.49 28.85Q47.72 28.90 49.77 29.28L49.69 29.20L49.73 29.23Q49.53 28.29 49.53 27.36L49.57 27.39L49.62 25.57L49.62 25.58Q49.27 25.45 48.75 25.49L48.87 25.61L47.93 25.46L48.01 25.53Q48.05 24.78 48.16 23.44Z"></path>
              <path fill="#8484e5"
                    d="M16.48 34.04L16.45 34.02L16.47 34.03Q12.55 34.34 11.58 32.06L11.61 32.09L11.53 32.01Q12.30 31.10 13.83 29.34L13.79 29.30L13.88 29.39Q14.39 31.40 17.35 31.51L17.23 31.39L17.30 31.46Q20.70 31.61 22.31 30.30L22.15 30.14L22.12 30.12Q23.51 28.55 23.44 25.90L23.51 25.97L23.53 25.99Q23.45 21.08 18.74 21.31L18.67 21.24L18.74 21.31Q15.93 21.41 14.21 22.65L14.15 22.59L13.76 22.35L13.74 22.41L13.72 22.39Q14.09 19.32 13.98 16.62L13.91 16.56L13.89 16.54Q13.79 13.97 13.45 10.71L13.43 10.70L13.53 10.79Q17.00 11.61 20.74 11.50L20.70 11.45L20.73 11.49Q24.59 11.54 28.11 10.30L28.07 10.27L27.37 11.62L27.52 11.77Q27.18 12.48 26.99 13.30L26.99 13.30L26.88 13.19Q23.88 14.27 20.07 14.27L20.12 14.31L20.09 14.29Q18.64 14.26 17.18 14.11L17.22 14.14L17.14 14.07Q17.21 14.88 16.87 19.26L16.80 19.18L16.87 19.26Q17.53 18.65 19.55 18.50L19.68 18.62L19.57 18.51Q23.33 18.84 24.75 20.48L24.74 20.47L24.71 20.43Q26.06 21.94 26.32 25.71L26.26 25.66L26.38 25.77Q26.65 29.89 25.45 31.87L25.42 31.85L25.40 31.83Q23.45 33.72 20.20 33.95L20.16 33.91L20.14 33.89Q19.21 34.01 16.60 34.16ZM22.51 36.38L22.45 36.32L22.43 36.29Q25.85 36.42 27.72 35.34L27.67 35.29L27.80 35.42Q28.76 33.91 28.76 31.86L28.64 31.74L28.63 31.72Q28.74 28.81 27.80 24.77L27.79 24.75L27.77 24.73Q27.37 22.99 26.18 21.61L26.10 21.53L26.17 21.63L26.04 21.43L25.66 21.21L25.71 21.25Q25.45 20.59 24.82 19.91L24.80 19.89L24.64 19.77L24.72 19.85Q23.33 18.31 19.70 18.31L19.68 18.28L19.40 18.27L19.32 18.19Q19.38 17.62 19.57 16.53L19.67 16.63L19.58 16.54Q24.57 16.75 28.54 15.14L28.44 15.04L28.55 15.16Q28.87 13.68 29.81 10.92L29.85 10.96L27.77 11.87L27.69 11.79Q28.19 10.80 28.68 9.68L28.58 9.58L28.57 9.57Q24.91 11.11 20.88 11.18L20.84 11.15L20.76 11.06Q16.85 11.31 12.96 10.22L12.87 10.13L12.86 10.12Q13.56 14.49 13.56 18.83L13.59 18.85L13.62 18.89Q13.49 20.62 13.37 22.49L13.38 22.50L13.48 22.60Q13.68 22.72 14.24 23.02L14.18 22.96L14.34 23.12Q14.50 22.72 15.14 22.38L15.27 22.51L15.19 22.43Q15.22 23.25 15.00 24.75L14.89 24.64L15.01 24.76Q15.39 24.91 15.80 25.14L15.83 25.16L15.79 25.13Q18.59 23.47 20.42 23.47L20.40 23.46L20.30 23.36Q21.71 23.46 22.87 24.09L22.80 24.03L22.75 23.97Q23.09 24.99 23.13 25.92L23.13 25.93L23.24 26.04Q23.35 28.61 22.34 29.69L22.32 29.68L22.22 29.57Q20.96 30.86 18.76 31.09L18.72 31.05L18.71 31.04Q17.72 31.06 17.04 30.98L17.04 30.97L17.15 31.09Q16.32 30.96 15.57 30.63L15.45 30.51L15.59 30.46L15.35 30.44L15.29 30.38Q14.68 30.07 14.15 28.76L14.15 28.76L14.09 28.70Q12.85 30.15 11.21 32.25L11.04 32.08L11.05 32.09Q11.44 32.81 12.26 33.75L12.25 33.74L12.32 33.81Q13.30 35.53 16.06 36.02L15.99 35.94L16.01 35.96Q17.21 36.23 22.48 36.34Z"></path>
              <path fill="#eebc8a"
                    d="M59.24 26.76L59.27 26.80L59.38 26.91Q62.27 26.39 65.41 26.50L65.52 26.62L65.48 26.57Q65.34 23.97 65.34 21.61L65.41 21.69L65.47 21.74Q65.47 19.31 65.66 16.81L65.53 16.68L65.64 16.79Q64.39 18.42 59.27 26.79ZM69.01 34.03L69.08 34.10L68.99 34.01Q67.45 33.82 65.69 33.74L65.59 33.64L65.57 33.62Q65.40 31.32 65.29 28.89L65.29 28.89L65.31 28.91Q60.06 28.71 55.42 30.09L55.41 30.07L55.45 30.12Q55.56 29.63 55.74 28.65L55.68 28.59L55.77 28.68Q57.58 25.63 61.10 19.46L61.10 19.46L60.98 19.35Q63.93 14.67 67.29 10.85L67.25 10.81L67.26 10.82Q68.08 10.59 69.72 10.33L69.63 10.24L69.67 10.28Q67.75 16.54 67.75 23.46L67.91 23.62L67.91 23.62Q67.75 24.92 67.83 26.38L67.91 26.46L69.25 26.64L69.16 26.56Q69.87 26.70 70.47 26.82L70.43 26.78L70.37 26.72Q70.41 27.62 70.67 29.52L70.68 29.53L70.82 29.67Q69.48 29.27 68.03 29.08L68.19 29.24L68.17 29.22Q68.32 31.14 69.00 34.02ZM70.61 26.32L70.59 26.30L70.62 26.33Q70.43 26.25 70.24 26.25L70.25 26.26L69.83 26.22L70.01 26.39Q69.81 24.85 69.81 23.47L69.77 23.42L69.88 23.53Q69.81 17.19 71.83 11.28L71.86 11.31L71.71 11.16Q71.15 11.60 69.73 11.98L69.70 11.95L69.64 11.89Q69.84 11.11 70.28 9.73L70.39 9.84L70.29 9.74Q69.08 10.17 67.06 10.39L67.01 10.35L67.13 10.46Q63.17 14.62 58.05 23.82L58.01 23.77L60.12 20.24L60.21 20.33Q59.69 21.24 59.43 21.80L59.48 21.85L55.06 30.66L55.05 30.65Q55.77 30.58 56.89 30.21L56.77 30.09L56.65 30.34L56.59 30.29Q56.50 30.98 56.20 32.21L56.31 32.32L56.29 32.31Q60.25 30.92 65.00 31.11L65.11 31.21L64.99 31.10Q65.08 32.08 65.27 34.03L65.25 34.01L65.32 34.08Q66.23 33.94 67.27 34.05L67.38 34.15L67.33 34.11Q67.59 34.89 67.85 36.24L67.76 36.14L67.84 36.23Q69.72 36.46 72.67 37.36L72.64 37.32L72.55 37.24Q71.57 35.13 70.67 31.91L70.73 31.97L72.05 32.32L72.11 32.38Q72.79 32.62 73.47 32.95L73.45 32.94L73.47 32.95Q72.74 30.54 72.59 28.90L72.61 28.92L72.54 28.85Q71.95 28.67 70.83 28.45L70.98 28.59L70.95 28.57Q70.59 27.16 70.59 26.30ZM62.76 26.18L62.90 26.31L62.86 26.28Q63.49 24.89 65.03 22.38L65.15 22.50L65.10 22.46Q65.02 23.31 64.98 24.25L65.05 24.31L65.09 24.35Q65.02 25.25 65.05 26.19L65.09 26.22L65.16 26.29Q64.52 26.17 63.96 26.17L63.89 26.11L63.97 26.19Q63.49 26.31 62.89 26.31Z"></path>
            </svg>
          </div>
        </div>
      </a-form-item>
      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
        </a-form-item>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="width: 100%" :disabled="disabled" html-type="submit" size="large"
                  class="login-form-button">
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div>
      <a-space class="login-btn-list">
        <a-button @click="setLoginState('register')" class="login-form-button">
          注册
        </a-button>
        <a-button @click="setOtherUser" class="login-form-button">
          其他用户
        </a-button>
        <a-button disabled class="login-form-button">
          手机登录
        </a-button>
        <a-button disabled class="login-form-button">
          扫二维码登录
        </a-button>
      </a-space>
    </div>
    <a-divider class="hr">其他方式登录</a-divider>
    <div class="other-login-type">
      <IconFont class="type-item" type="icon-github"/>
      <IconFont class="type-item" type="icon-gitee"/>
      <IconFont class="type-item" type="icon-weixin"/>
      <IconFont class="type-item" type="icon-weibo"/>
      <IconFont class="type-item" type="icon-qq"/>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, computed} from 'vue';
import loginBg from '@/assets/img/login-bg.png';
import {SmileOutlined} from '@ant-design/icons-vue';
import {notification} from 'ant-design-vue';

import {useAuthStore} from '../../../../stores/auth.js';
import {useLoginState} from '@/hooks/sys/useLogin.js';

const authStore = useAuthStore()
const {setLoginState, getLoginState} = useLoginState();
const getShow = computed(() => {
  return getLoginState.value === 'login'
});

let validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请输入验证码');
  } else {
    if (formState.code !== 9) {
      return Promise.reject('验证码不正确');
    }
    return Promise.resolve();
  }
};

const formState = reactive({
  username: 'admin',
  password: 'admin',
  code: '',
  remember: true,
});

const setOtherUser = () => {
  formState.username = 'test'
}

const onFinish = values => {
  // console.log('Success:', values);
  authStore.login(values)

};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

</script>

<style lang="scss" scoped>
.login-title {
  margin-bottom: 30px;
}

.hr {
  font-size: .9rem;
  color: #575656;
}

.login-form {
  max-width: 400px;
  background-color: #fff;
  overflow: hidden;
}

.login-btn-list {
  display: flex;
  flex-wrap: wrap;
}

.other-login-type {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 22px;

  .type-item {
    cursor: pointer;

    &:hover {
      color: $color-primary !important;
    }
  }
}
</style>
