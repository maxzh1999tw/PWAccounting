<template>
  <Suspense>
    <RouterView></RouterView>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>