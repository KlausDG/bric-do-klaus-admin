<template>
  <v-card class="ma-auto pa-10" width="500px">
    <h1>Login</h1>

    <v-form ref="form" v-model="valid" lazy-validation class="ma-auto" @submit.prevent>
      <v-text-field v-model="user.email" label="E-mail" required></v-text-field>

      <v-text-field
        v-model.trim="user.password"
        name="input-10-1"
        label="Senha"
        hint="At least 8 characters"
        counter
      ></v-text-field>

      <div class="d-flex w-100 justify-center">
        <v-btn :disabled="!valid" color="success" class="align-center" @click="login()">
          Validate
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      valid: true
    };
  },

  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.user.email,
        password: this.user.password
      });
    }
  }
};
</script>
