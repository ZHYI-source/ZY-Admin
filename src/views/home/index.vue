<template>
    <section class="zy-home">
        <div class="img-box">
            <ZyLogo :showTitle="false" size="80"/>
        </div>
        <hr/>
        <section class="one">
            <header class="major">
                <h1>ZY · 项目基础模板</h1>
                <p class="sub-title">Vue3、Vue Router、Pinia、Axios、Express、Mongoose、MongoDB、<a href="https://www.antdv.com/docs/vue/getting-started-cn">Ant Design</a>.</p>
                <p>【开箱即用】前后端已接通，前端响应式，http请求方式的封装，错误处理、路由、Axios等基础配置都已安装完备.<br>对快速构建Vue3全栈项目有很大的帮助，解决每次新建项目基础配置的烦恼.</p>
                <a href="https://gitee.com/Z568_568/ZY.Vue3.Mongodb.Basics.git" target="_blank">
                    <a-button type="primary">源码</a-button>
                </a>
                <a href="http://www.zhouyi.run/#/About" target="_blank">
                    <a-button type="primary">个人主页</a-button>
                </a>
            </header>
            <div class="zy-code">
                <code>$ git clone https://gitee.com/Z568_568/ZY.Vue3.Mongodb.Basics.git</code>
                <code>$ npm i</code>
                <code>$ npm run dev</code>
            </div>

        </section>

    </section>
</template>

<script setup>
import ZyLogo from "../../components/common/ZyLogo.vue";

</script>

<style lang="scss" scoped>
.zy-home {
  padding-top: 2rem;
}
    .img-box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2rem auto 2rem;
    }

    .one {
        max-width: 1200px;
        margin: 2rem auto;

        .major {
            text-align: center;
            margin-bottom: 2rem;

            h1 {
                margin-bottom: 1rem;
            }

            p:nth-child(3) {
                margin-bottom: 1rem;
            }

            a {
                margin: .5rem;
            }
        }
    }
</style>
