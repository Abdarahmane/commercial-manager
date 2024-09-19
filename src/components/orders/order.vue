<template>
  <div class="container my-4">
    <div class="d-flex justify-content-end mb-3">
      <!-- Bouton pour ajouter une commande et fermer -->
      <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#addOrderModal">Add Order</button>
      <!-- <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
    </div>

    <h1>List of Orders</h1>
    <table class="table table-striped col-12">
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Delivery Address</th>
          <th>Track Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.date }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.deliveryAddress }}</td>
          <td>{{ order.trackNumber }}</td>
          <td>{{ order.status }}</td>
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

    <!-- Modal pour ajouter une commande -->
    <div class="modal fade" id="addOrderModal" tabindex="-1" aria-labelledby="addOrderModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg"> <!-- Adjusted to large modal -->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addOrderModalLabel">Add New Order</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addOrder">
              <div class="row">
                <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary me-2">submit</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
                <div class="col-md-6 mb-3">
                  <label for="date" class="form-label">Date</label>
                  <input v-model="newOrder.date" type="date" class="form-control" id="date" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="customerName" class="form-label">Customer Name</label>
                  <input v-model="newOrder.customerName" type="text" class="form-control" id="customerName" required>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="deliveryAddress" class="form-label">Delivery Address</label>
                  <input v-model="newOrder.deliveryAddress" type="text" class="form-control" id="deliveryAddress" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="trackNumber" class="form-label">Track Number</label>
                  <input v-model="newOrder.trackNumber" type="text" class="form-control" id="trackNumber" required>
                </div>
              </div>

              <!-- Status moved to the right side -->
              <div class="row">
                <div class="col-md-6 mb-3 offset-md-6">
                  <label for="status" class="form-label">Status</label>
                  <select v-model="newOrder.status" class="form-control" id="status" required>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <!-- Order Details Section -->
              <div class="mb-3">
                <h5>Order Details</h5>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(detail, index) in newOrder.details" :key="index">
                      <td>
                        <select v-model="detail.product" class="form-select" required>
                          <option disabled value="">Select Product</option>
                          <option v-for="product in products" :key="product.id" :value="product.name">{{ product.name }}</option>
                        </select>
                      </td>
                      <td>
                        <input v-model.number="detail.quantity" type="number" class="form-control" min="1" value="1" />
                      </td>
                      <td>
                        <input v-model.number="detail.price" type="number" class="form-control" min="0" />
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger" @click="removeDetail(index)">Remove</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="button" class="btn btn-success" @click="addNewDetail">Add New Detail</button>
              </div>

              <div class="d-flex justify-content-end">
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour afficher, éditer ou supprimer une commande -->
    <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="orderModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Contenu du modal selon l'action -->
            <div v-if="modalAction === 'view'">
              <p><strong>Date:</strong> {{ selectedOrder.date }}</p>
              <p><strong>Customer:</strong> {{ selectedOrder.customerName }}</p>
              <p><strong>Delivery Address:</strong> {{ selectedOrder.deliveryAddress }}</p>
              <p><strong>Track Number:</strong> {{ selectedOrder.trackNumber }}</p>
              <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
            </div>

            <div v-if="modalAction === 'edit'">
              <form @submit.prevent="submitEdit">
                <div class="mb-3">
                  <label for="date" class="form-label">Date</label>
                  <input v-model="selectedOrder.date" type="date" class="form-control" id="date">
                </div>
                <div class="mb-3">
                  <label for="customerName" class="form-label">Customer Name</label>
                  <input v-model="selectedOrder.customerName" type="text" class="form-control" id="customerName">
                </div>
                <div class="mb-3">
                  <label for="deliveryAddress" class="form-label">Delivery Address</label>
                  <input v-model="selectedOrder.deliveryAddress" type="text" class="form-control" id="deliveryAddress">
                </div>
                <div class="mb-3">
                  <label for="trackNumber" class="form-label">Track Number</label>
                  <input v-model="selectedOrder.trackNumber" type="text" class="form-control" id="trackNumber">
                </div>
                <div class="mb-3">
                  <label for="status" class="form-label">Status</label>
                  <input v-model="selectedOrder.status" type="text" class="form-control" id="status">
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </form>
            </div>

            <div v-if="modalAction === 'delete'">
              <p>Are you sure you want to delete this order from {{ selectedOrder.customerName }}?</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-if="modalAction === 'delete'" type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
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
      orders: [
        { id: 1, date: '2024-09-01', customerName: 'John Doe', deliveryAddress: '123 Main St', trackNumber: 'TRACK123', status: 'Shipped' },
        { id: 2, date: '2024-09-02', customerName: 'Jane Smith', deliveryAddress: '456 Elm St', trackNumber: 'TRACK456', status: 'Processing' }
      ],
      newOrder: {
        date: '',
        customerName: '',
        deliveryAddress: '',
        trackNumber: '',
        status: '',
        details: [{ product: '', quantity: 1, price: 0 }]
      },
      products: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' }
      ],
      selectedOrder: {},
      modalAction: '',
      modalTitle: ''
    };
  },
  methods: {
    showModal(action, order) {
      this.modalAction = action;
      this.selectedOrder = { ...order };
      this.modalTitle = action === 'view' ? 'View Order' : action === 'edit' ? 'Edit Order' : 'Delete Order';
      const modal = new bootstrap.Modal(document.getElementById('orderModal'));
      modal.show();
    },
    addOrder() {
      this.orders.push({
        ...this.newOrder,
        id: this.orders.length + 1
      });
      alert(`Order for ${this.newOrder.customerName} added successfully.`);
      this.newOrder = {
        date: '',
        customerName: '',
        deliveryAddress: '',
        trackNumber: '',
        status: '',
        details: [{ product: '', quantity: 1, price: 0 }]
      };
      const modal = bootstrap.Modal.getInstance(document.getElementById('addOrderModal'));
      modal.hide();
    },
    addNewDetail() {
      this.newOrder.details.push({ product: '', quantity: 1, price: 0 });
    },
    removeDetail(index) {
      this.newOrder.details.splice(index, 1);
    },
    submitEdit() {
      const index = this.orders.findIndex(order => order.id === this.selectedOrder.id);
      if (index !== -1) {
        this.orders.splice(index, 1, this.selectedOrder);
        alert('Order updated successfully.');
        const modal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
        modal.hide();
      }
    },
    confirmDelete() {
      const index = this.orders.findIndex(order => order.id === this.selectedOrder.id);
      if (index !== -1) {
        this.orders.splice(index, 1);
        alert('Order deleted successfully.');
        const modal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
        modal.hide();
      }
    }
  }
};
</script>

<style>
/* Optional: Custom CSS for spacing and alignment */
</style>
