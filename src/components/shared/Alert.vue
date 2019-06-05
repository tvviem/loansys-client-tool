<template>
  <article class="message is-warning is-hidden">
    <div class="message-header">
      {{ header }}
      <button class="delete"></button>
    </div>
    <div class="message-body">
      {{ content }}
    </div>
  </article>
</template>

<script>
export default {
  props: ["header", "content"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>