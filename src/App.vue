<template>

  <app-headder></app-headder>

  <!-- Introduction -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <app-player/>

  <!-- Auth Modal -->
  <auth-modal/>

</template>
<script>
import AppPlayer from '@/components/Player.vue';
import AppHeadder from './components/Headder.vue';
import AuthModal from './components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeadder,
    AuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};

</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.1s linear;
}

.fade-leave-to {
  transition: all 0.1s linear;
  opacity: 0;
}
</style>
