<template>
    <div class="text-white text-center font-bold p-5 mb-4"
        v-if="reg_show_allert" :class="reg_alert_variant">
        {{reg_alert_msg}}
    </div>
    <vee-form :validation-schema="schema"
    @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
        <p class="inline-block mb-2" for="c">Name</p>
        <vee-field name="name" type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"/>
        <ErrorMessage class="text-red-600" name="name"/>

    </div>
    <!-- Email -->
    <div class="mb-3">
        <p class="inline-block mb-2" for="d">Email </p>
        <vee-field type="email" name="email"
        id="d"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
        <ErrorMessage class="text-red-600" name="email"/>
    </div>
    <!-- Age -->
    <div class="mb-3">
        <p class="inline-block mb-2" for="e">Age</p>
        <vee-field type="number" name ="age"
        id = "e"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded" />
        <ErrorMessage class="text-red-600" name = "age"/>
    </div>
    <!-- Password -->
    <div class="mb-3">
        <p class="inline-block mb-2">Password</p>
        <vee-field name="password" type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"/>
        <ErrorMessage class="text-red-600" name = "password"/>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
        <p class="inline-block mb-2">Confirm Password</p>
        <vee-field type="password" name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password" />
        <ErrorMessage class="text-red-600" name="confirm_password"/>
    </div>
    <!-- Country -->
    <div class="mb-3">
        <p class="inline-block mb-2" for="h">Country</p>
        <vee-field as ="select" name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded">
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        </vee-field>
        <ErrorMessage class="text-red-600" name="country"/>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
        <p class="inline-block" for="i">
        <vee-field type="checkbox" name="tos" value="1"
        id="i" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
        Accept terms of service</p><br>
        <ErrorMessage class="text-red-600" name="tos"/>
    </div>
    <button type="submit" :disabled="reg_in_submisson"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
        Submit
    </button>
  </vee-form>

</template>

<script>

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:6|max:100',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      reg_in_submisson: false,
      reg_show_allert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created',
    };
  },
  methods: {
    async register(values) {
      this.reg_in_submisson = true;
      this.reg_show_allert = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';
      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        console.error(error);
        this.reg_in_submisson = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = 'An error occured. Please try again later';
        return;
      }
      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account has been created.';
      window.location.reload();
    },
  },
};
</script>
