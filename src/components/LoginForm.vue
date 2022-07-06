<template>
  <div class="text-white text-center font-bold p-4 mb-4" v-if="login_show_allert"
    :class="login_alert_variant">
    {{ login_alert_msg }}
  </div>

  <vee-form :validation-schema="loginSchema"
    @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <p class="inline-block mb-2">Email</p>
      <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <ErrorMessage class = 'text-red-600' name="email"/>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <p class="inline-block mb-2" for="b">Password</p>
      <vee-field type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password" />
      <ErrorMessage class = 'text-red-600' name="password"/>
    </div>
    <button type="submit" :disabled="login_in_submisson"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
      Submit
    </button>
  </vee-form>

</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required',
      },
      login_in_submisson: false,
      login_show_allert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait! We are loggin you in',
    };
  },
  methods: {
    async login(values) {
      this.login_in_submisson = true;
      this.login_show_allert = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_msg = 'Please wait! We are loggin you in';

      try {
        await this.$store.dispatch('login', values);
      } catch (err) {
        console.error(err);
        this.login_in_submisson = false;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_msg = 'Invalid login details! Try again later';
        return;
      }

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_msg = 'Success! you are loggend in';

      window.location.reload();
    },
  },
};
</script>
