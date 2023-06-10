<template>
  <div id="App">
  <div>
    <ToastNotification/>
  </div>
  <nav class="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">List Tamu</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/">Tambah Tamu</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/list">Lihat Semua Tamu</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="container-fluid">
    <div class="grid">
      <div class="row align-items-start">
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
    </div>
</div>
</div>
</template>


<script>
  export default {
    name: 'App',
    components: {
        ToastNotification
      }
  }
</script>
<script>
  export default {
    mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js')
      document.head.appendChild(recaptchaScript)
    },
  }
</script>
