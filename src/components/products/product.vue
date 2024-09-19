<template>
  <div class="container my-4">
    <h1>List of Products</h1>
    <div class="mb-3 d-flex justify-content-end">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>
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
            <button class="btn btn-info btn-sm me-2" @click="showModal('view', product)">
               <i class="fa fa-eye" style="font-size: 0.8em;"></i>
            </button>
            <button class="btn btn-warning btn-sm me-2" @click="showModal('edit', product)">
               <i class="fa fa-pencil" style="font-size: 0.8em;"></i>
            </button>
            <button class="btn btn-danger btn-sm" @click="showModal('delete', product.id)">
             <i class="fa fa-trash" style="font-size: 0.9em;"></i>
            </button>

          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Product Modal -->
    <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">Add Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addProduct">
              <div class="row g-2">
                <div class="col-6">
                  <div class="mb-2">
                    <label for="name" class="form-label">Name</label>
                    <input v-model="newProduct.name" type="text" class="form-control form-control-sm" id="name" required>
                  </div>
                  <div class="mb-2">
                    <label for="price" class="form-label">Price</label>
                    <input v-model="newProduct.price" type="number" step="0.01" class="form-control form-control-sm" id="price" required>
                  </div>
                  <div class="mb-2">
                    <label for="barcode" class="form-label">Barcode</label>
                    <input v-model="newProduct.barcode" type="text" class="form-control form-control-sm" id="barcode" required>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-2">
                    <label for="category" class="form-label">Category</label>
                    <input v-model="newProduct.category" type="text" class="form-control form-control-sm" id="category" required>
                  </div>
                  <div class="mb-2">
                    <label for="stock" class="form-label">Stock</label>
                    <input v-model="newProduct.stock" type="number" class="form-control form-control-sm" id="stock" required>
                  </div>
                  <div class="mb-2">
                    <label for="status" class="form-label">Status</label>
                    <select v-model="newProduct.status" class="form-select form-select-sm" id="status" required>
                      <option value="Available">Available</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Discontinued">Discontinued</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <label for="description" class="form-label">Description</label>
                <textarea v-model="newProduct.description" class="form-control form-control-sm" id="description" rows="2"></textarea>
              </div>
              <div class="d-flex justify-content-end mt-2">
                <button type="submit" class="btn btn-primary btn-sm me-2">confirm</button>
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details / Edit / Delete Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="modalAction === 'view'">
              <p><strong>Name:</strong> {{ selectedProduct.name }}</p>
              <p><strong>Description:</strong> {{ selectedProduct.description }}</p>
              <p><strong>Price:</strong> \${{ selectedProduct.price.toFixed(2) }}</p>
              <p><strong>Stock:</strong> {{ selectedProduct.stock }}</p>
              <p><strong>Category:</strong> {{ selectedProduct.category }}</p>
              <p><strong>Barcode:</strong> {{ selectedProduct.barcode }}</p>
              <p><strong>Status:</strong> {{ selectedProduct.status }}</p>
            </div>

            <div v-if="modalAction === 'edit'">
              <form @submit.prevent="submitEdit">
          <div class="row g-2">
            <div class="col-6">
              <div class="mb-2">
                <label for="name" class="form-label">Name</label>
                <input v-model="selectedProduct.name" type="text" class="form-control form-control-sm" id="name" required>
              </div>
              <div class="mb-2">
                <label for="price" class="form-label">Price</label>
                <input v-model="selectedProduct.price" type="number" step="0.01" class="form-control form-control-sm" id="price" required>
              </div>
              <div class="mb-2">
                <label for="barcode" class="form-label">Barcode</label>
                <input v-model="selectedProduct.barcode" type="text" class="form-control form-control-sm" id="barcode" required>
              </div>
            </div>
            <div class="col-6">
              <div class="mb-2">
                <label for="category" class="form-label">Category</label>
                <input v-model="selectedProduct.category" type="text" class="form-control form-control-sm" id="category" required>
              </div>
              <div class="mb-2">
                <label for="stock" class="form-label">Stock</label>
                <input v-model="selectedProduct.stock" type="number" class="form-control form-control-sm" id="stock" required>
              </div>
              <div class="mb-2">
                <label for="status" class="form-label">Status</label>
                <select v-model="selectedProduct.status" class="form-select form-select-sm" id="status" required>
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label for="description" class="form-label">Description</label>
            <textarea v-model="selectedProduct.description" class="form-control form-control-sm" id="description" rows="2"></textarea>
          </div>
          <div class="d-flex justify-content-end mt-2">
            <button type="submit" class="btn btn-primary btn-sm me-2">confirm</button>
            <!-- <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button> -->
          </div>
        </form>
            </div>

            <div v-if="modalAction === 'delete'">
              <p>Are you sure you want to delete {{ selectedProduct.name }}?</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
            <button v-if="modalAction === 'delete'" type="button" class="btn btn-danger btn-sm" @click="confirmDelete">Delete</button>
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
        { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10.00, stock: 100, category: 'Category 1', barcode: '1234567890123', status: 'Available' },
        { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 20.00, stock: 200, category: 'Category 2', barcode: '1234567890124', status: 'Out of Stock' },
        { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30.00, stock: 300, category: 'Category 3', barcode: '1234567890125', status: 'Available' }
      ],
      newProduct: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        barcode: '',
        status: 'Available'
      },
      selectedProduct: null,
      modalAction: null,
      modalTitle: ''
    };
  },
  methods: {
    showModal(action, product) {
      this.modalAction = action;
      if (action === 'view' || action === 'edit') {
        this.selectedProduct = { ...product };
        this.modalTitle = action === 'view' ? 'View Product' : 'Edit Product';
      } else if (action === 'delete') {
        this.selectedProduct = product;
        this.modalTitle = 'Delete Product';
      }
      new bootstrap.Modal(document.getElementById('productModal')).show();
    },
    addProduct() {
      // Code to add the new product
      this.products.push({ ...this.newProduct, id: this.products.length + 1 });
      this.newProduct = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        barcode: '',
        status: 'Available'
      };
      const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
      modal.hide();
    },
    submitEdit() {
      const index = this.products.findIndex(p => p.id === this.selectedProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.selectedProduct };
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
      modal.hide();
    },
    confirmDelete() {
      this.products = this.products.filter(p => p.id !== this.selectedProduct.id);
      const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
      modal.hide();
    }
  }
};
</script>

<style scoped>
/* Add any specific styles you need here */
</style>
