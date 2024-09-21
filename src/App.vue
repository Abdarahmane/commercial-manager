<template>
  <div id="app">
    <!-- Barre de navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
       
        <div class="collapse navbar-collapse ml-3" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/customers">
                <i class="fa fa-users"></i> Customers
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">
                <i class="fa fa-box"></i> Products
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/orders">
                <i class="fa fa-shopping-cart"></i> Orders
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Composant dynamique -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
.nav-link {
  margin-right: 12px;
  text-decoration: none;
  color: rgb(78, 78, 83);
  cursor: pointer;
}

.nav-link i {
  margin-right: 8px;
}


.router-link-active {
  font-weight: bold;
  color: rgb(51, 51, 243); 
  text-decoration: underline;
}

.nav-link:hover {
  text-decoration: underline;
  color: rgb(51, 51, 243);
}

.ml-3 {
  margin-left: 54px; 
}
</style>
