<template>
<div class="row">
  <div class="col-sm-6 offset-sm-3 text-center">
       <h1 class="display-4">Register</h1>
        <a-alert v-if="errorMessage" :message="errorMessage" type="error" showIcon />
       <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
         <a-form-item>
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [{
                    required: true, message: 'Please input your name!',
                  }]
                }
              ]"
              placeholder="Name"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }]
                }
              ]"
              placeholder="Email"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your Password!' }] }
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              :disabled="loading"
            >
              <span v-if="loading">Please Wait ...</span>
              <span v-else>Register</span>
            </a-button>
            Or <router-link :to="'/customer/login'">
              Login
            </router-link>
          </a-form-item>
        </a-form>
  </div>
</div>
</template>

<script>
import authMixin from '@/mixins/auth'
export default {
  name: 'Register',
  mixins: [authMixin],
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.authCustomer(values, 'register')
        }
      })
    }
  }
}
</script>

 <style scoped>
  #components-form-demo-normal-login .login-form {
  max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
</style>
