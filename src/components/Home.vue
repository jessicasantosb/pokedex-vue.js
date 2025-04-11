<template>
  <main class="min-vh-100 container">
    <Suspense>
      <infinite-scroll />
      <template #fallback>
        <div class="spinner-border" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </template>
    </Suspense>
  </main>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped></style>
