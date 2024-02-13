<template>
  <div class="not-found">
    <div class="content">
      <h2>Oops! Page Not Found</h2>
      <p>La page que vous recherchez n'a pas pu être trouvée.</p>
      <router-link to="/" class="back-link">Retour à la page d'accueil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
}

.content {
  text-align: center;
}

h2 {
  font-size: 2em;
  color: #333;
}

p {
  color: #666;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: #2980b9;
}
</style>
