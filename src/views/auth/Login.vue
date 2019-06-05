<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered is-mobile">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen is-two-thirds-mobile box">
            <h4 class="title has-text-grey is-4">TÀI KHOẢN</h4>
            <form @submit.prevent="onSignin">
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    class="input"
                    type="text"
                    placeholder="Tên đăng nhập"
                    autofocus
                    v-model="username"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <div class="control has-icons-left">
                  <input class="input" type="password" placeholder="Mật khẩu" v-model="password">
                  <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
              </div>
              <button class="button is-primary is-fullwidth">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignin() {
      console.log(this.username + "  " + this.password)
      this.$store.dispatch("userSignIn", {
        username: this.username,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>