<template>
  <nav>
    <div class="container">
        <a><router-link to="/" class="">Список задач</router-link></a>
    </div>
  </nav>
</template>

<script>
export default {
name: 'NavBar'
}
</script>

<style lang="scss" scoped>
a {
  text-align: center;
  color: black;
  font-size: 25px;
  text-decoration: none;
  font-weight: bold;
}
nav {
  margin: 30px 0;
}
</style>