<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户

        <span class="go">我有账号，去
          <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone"> -->
        <input placeholder="请输入你的手机号码" v-model="phone" name="phone" v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }" />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input placeholder="请输入你的验证码" v-model="code" name="code" v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }" />
        <button style="width: 100px;height: 38px;" @click="getCode">获取验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>

      </div>
      <div class="content">
        <label>登录密码:</label>
        <input placeholder="请输入你的密码" v-model="password" name="password" type="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }" :class="{ invalid: errors.has('password') }" />
        <span class="error-msg">{{ errors.first("password") }}</span>

      </div>
      <div class="content">
        <label>确认密码:</label>
        <input placeholder="请你输入确认密码" v-model="password1" name="password1" type="password"
          v-validate="{ required: true, is: password }" :class="{ invalid: errors.has('password1') }" />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="controls">
        <input v-model="agree" name="agree" type="checkbox" v-validate="{ required: true, 'tongyi': true }"
          :class="{ invalid: errors.has('agree') }" />
        <span>同意协议并注册《无名百货用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>

      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <!-- <li>手机无名百货</li> -->
        <li>销售联盟</li>
        <li>无名百货社区</li>
      </ul>
      <div class="address">地址：广州市花都区赤坭镇培正大道</div>
      <div class="beian">粤ICP备21352759号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      // 收集表单信息
      phone: '',
      code: '',
      password: '',
      password1: '',
      agree: true


    }
  },
  methods: {
    async getCode() {
      try {
        // 简单判断一下--至少有数据
        const { phone } = this;
        phone && await this.$store.dispatch('user/getCode', this.phone);
        // 成功将组件的code属性变为store中的code
        this.code = this.$store.state.user.code;
      } catch (error) {
        alert(error.message)
      }

    },
    async userRegister() {
      const success = await this.$validator.validateAll();
      // success代表表单全部是否已验证正确
      // 只要有一个表单不正确，不发送请求
      if (success) {
        // 表单全部正确
        try {
          // 成功
          const { phone, code, password, password1 } = this;
          // 与或非，前面都为真才执行最后语句
          (phone && code && password === password1) && (await this.$store.dispatch('user/register', { phone, code, password }))
          // 进行路由跳转到登录页面
          this.$router.push('/login')
        } catch (error) {
          alert(error.message)
        }
      }

    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>