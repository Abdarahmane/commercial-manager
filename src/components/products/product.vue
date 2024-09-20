<template>
  <div class="container my-4">
    <h1>List of Products</h1>
    <div class="mb-3 d-flex justify-content-end">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" @click="openModal('add')">
        Add Product
      </button>
    </div>
    <table class="table table-striped col-12">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Barcode</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>\${{ product.price.toFixed(2) }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.barcode }}</td>
          <td>{{ product.status }}</td>
          <td>
            <button class="btn btn-info btn-sm me-2" @click="openModal('view', product)">
              <i class="fa fa-eye"></i>
            </button>
            <button class="btn btn-warning btn-sm me-2" @click="openModal('edit', product)">
              <i class="fa fa-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(product.id)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit/View Product Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form v-if="modalAction !== 'view'" @submit.prevent="modalAction === 'add' ? addProduct() : submitEdit()">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label">Product Name</label>
                  <input v-model="currentProduct.name" type="text" class="form-control" id="name" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="category" class="form-label">Category</label>
                  <input v-model="currentProduct.category" type="text" class="form-control" id="category" required />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="price" class="form-label">Price</label>
                  <input v-model="currentProduct.price" type="number" step="0.01" class="form-control" id="price" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="stock" class="form-label">Stock Quantity</label>
                  <input v-model="currentProduct.stock" type="number" class="form-control" id="stock" required />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="barcode" class="form-label">Barcode</label>
                  <input v-model="currentProduct.barcode" type="text" class="form-control" id="barcode" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="status" class="form-label">Status</label>
                  <select v-model="currentProduct.status" class="form-select" id="status" required>
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea v-model="currentProduct.description" class="form-control" id="description"></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary me-2">Confirm</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              </div>
            </form>

            <!-- View Mode -->
            <div v-if="modalAction === 'view'">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label">Product Name</label>
                  <input v-model="currentProduct.name" type="text" class="form-control" id="name" disabled />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="category" class="form-label">Category</label>
                  <input v-model="currentProduct.category" type="text" class="form-control" id="category" disabled />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="price" class="form-label">Price</label>
                  <input v-model="currentProduct.price" type="number" step="0.01" class="form-control" id="price" disabled />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="stock" class="form-label">Stock Quantity</label>
                  <input v-model="currentProduct.stock" type="number" class="form-control" id="stock" disabled />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="barcode" class="form-label">Barcode</label>
                  <input v-model="currentProduct.barcode" type="text" class="form-control" id="barcode" disabled />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="status" class="form-label">Status</label>
                  <select v-model="currentProduct.status" class="form-select" id="status" disabled>
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea v-model="currentProduct.description" class="form-control" id="description" disabled></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Product 1",
          description: "Description for Product 1",
          price: 10.0,
          stock: 100,
          category: "Category 1",
          barcode: "1234567890123",
          status: "Available",
        },
        // Add more product objects here...
      ],
      currentProduct: {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        barcode: "",
        status: "Available",
      },
      modalAction: "add",
      modalTitle: "Add Product",
    };
  },
  methods: {
    openModal(action, product = null) {
      this.modalAction = action;
      if (action === "add") {
        this.modalTitle = "Add Product";
        this.currentProduct = {
          name: "",
          description: "",
          price: 0,
          stock: 0,
          category: "",
          barcode: "",
          status: "Available",
        };
      } else if (action === "edit") {
        this.modalTitle = "Edit Product";
        this.currentProduct = { ...product };
      } else if (action === "view") {
        this.modalTitle = "View Product";
        this.currentProduct = { ...product };
      }
      new bootstrap.Modal(document.getElementById("productModal")).show();
    },
    addProduct() {
      const newProduct = {
        id: this.products.length + 1,
        ...this.currentProduct,
      };
      this.products.push(newProduct);
      this.closeModal();
    },
    submitEdit() {
      const index = this.products.findIndex((p) => p.id === this.currentProduct.id);
      if (index !== -1) {
        this.products.splice(index, 1, this.currentProduct);
      }
      this.closeModal();
    },
    confirmDelete(productId) {
      this.products = this.products.filter((p) => p.id !== productId);
    },
    closeModal() {
      const modalElement = document.getElementById("productModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();  // Programmatically close the modal
      }
    },
    
  },
};
</script>

<style>
/* Add any additional styles here */
</style>
