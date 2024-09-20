<template>
  <div class="container my-4">
    <div class="d-flex justify-content-end mb-3">
      <!-- Bouton pour afficher le formulaire d'ajout -->
      <button
        v-if="!showEditForm && !showOrderDetails && !showAddForm"
        class="btn btn-primary me-2"
        @click="toggleAddForm"
      >
        Add Order
      </button>
    </div>

    <!-- Formulaire d'ajout -->
    <div v-if="showAddForm" class="mb-5">
      <h2>Add New Order</h2>
      <div class="d-flex justify-content-end mb-3">
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button type="button" class="btn btn-secondary" @click="toggleAddForm">
          Return to OrderList
        </button>
      </div>

      <form @submit.prevent="addOrder">
        <!-- Contenu du formulaire d'ajout -->
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="date" class="form-label">Date</label>
            <input
              v-model="newOrder.date"
              type="date"
              class="form-control"
              id="date"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="customer" class="form-label">Customer Name</label>
            <input
              v-model="newOrder.customerName"
              type="text"
              class="form-control"
              id="customer"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="address" class="form-label">Delivery Address</label>
            <input
              v-model="newOrder.deliveryAddress"
              type="text"
              class="form-control"
              id="address"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="trackNumber" class="form-label">Track Number</label>
            <input
              v-model="newOrder.trackNumber"
              type="text"
              class="form-control"
              id="trackNumber"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="status" class="form-label">Status</label>
            <select
              v-model="newOrder.status"
              class="form-select"
              id="status"
              required
            >
              <option disabled value="">Select Status</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <!-- Section des détails de commande -->
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
                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.name"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                </td>
                <td>
                  <input
                    v-model.number="detail.quantity"
                    type="number"
                    class="form-control"
                    min="1"
                  />
                </td>
                <td>
                  <input
                    v-model.number="detail.price"
                    type="number"
                    class="form-control"
                    min="0"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="removeDetail(index)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" class="btn btn-success" @click="addNewDetail">
            Add New Detail
          </button>
        </div>
      </form>
    </div>

    <!-- Formulaire d'édition -->
    <div v-if="showEditForm" class="mb-5">
      <h2>Edit Order</h2>
      <div class="d-flex justify-content-end mb-3">
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button type="button" class="btn btn-secondary" @click="cancelEdit">
          Return to OrderList
        </button>
      </div>

      <form @submit.prevent="submitEdit">
        <!-- Champs de formulaire d'édition -->
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="editDate" class="form-label">Date</label>
            <input
              v-model="selectedOrder.date"
              type="date"
              class="form-control"
              id="editDate"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="editCustomer" class="form-label">Customer Name</label>
            <input
              v-model="selectedOrder.customerName"
              type="text"
              class="form-control"
              id="editCustomer"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="editAddress" class="form-label">Delivery Address</label>
            <input
              v-model="selectedOrder.deliveryAddress"
              type="text"
              class="form-control"
              id="editAddress"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="editTrackNumber" class="form-label">Track Number</label>
            <input
              v-model="selectedOrder.trackNumber"
              type="text"
              class="form-control"
              id="editTrackNumber"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="editStatus" class="form-label">Status</label>
            <select
              v-model="selectedOrder.status"
              class="form-select"
              id="editStatus"
              required
            >
              <option disabled value="">Select Status</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <!-- Section des détails de commande pour l'édition -->
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
              <tr v-for="(detail, index) in selectedOrder.details" :key="index">
                <td>
                  <select v-model="detail.product" class="form-select">
                    <option disabled value="">Select Product</option>
                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.name"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                </td>
                <td>
                  <input
                    v-model.number="detail.quantity"
                    type="number"
                    class="form-control"
                    min="1"
                  />
                </td>
                <td>
                  <input
                    v-model.number="detail.price"
                    type="number"
                    class="form-control"
                    min="0"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="removeDetailFromEdit(index)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            class="btn btn-success"
            @click="addNewDetailToEdit"
          >
            Add New Detail
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des commandes (masquée si en mode ajout ou édition) -->
    <div v-if="!showAddForm && !showEditForm && !showOrderDetails">
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
              <button
                class="btn btn-info btn-sm me-2"
                @click="viewOrderDetails(order)"
              >
                <i class="fas fa-eye"></i>
                <!-- Icône "View" -->
              </button>
              <button
                class="btn btn-warning btn-sm me-2"
                @click="editOrder(order)"
              >
                <i class="fas fa-edit"></i>
                <!-- Icône "Edit" -->
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="deleteOrder(order.id)"
              >
                <i class="fas fa-trash"></i>
                <!-- Icône "Delete" -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Détails de la commande (masquée si en mode ajout ou édition) -->
    <div v-if="showOrderDetails">
      <h2>Order Details</h2>
      <p><strong>Date:</strong> {{ selectedOrder.date }}</p>
      <p><strong>Customer Name:</strong> {{ selectedOrder.customerName }}</p>
      <p>
        <strong>Delivery Address:</strong> {{ selectedOrder.deliveryAddress }}
      </p>
      <p><strong>Track Number:</strong> {{ selectedOrder.trackNumber }}</p>
      <p><strong>Status:</strong> {{ selectedOrder.status }}</p>

      <h5>Order Items</h5>
      <ul>
        <li v-for="(detail, index) in selectedOrder.details" :key="index">
          {{ detail.product }} - Quantity: {{ detail.quantity }} - Price:
          {{ detail.price }}
        </li>
      </ul>

      <button class="btn btn-secondary" @click="hideOrderDetails">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAddForm: false,
      showEditForm: false,
      showOrderDetails: false,
      orders: [
        {
          id: 1,
          date: "2024-09-01",
          customerName: "John Doe",
          deliveryAddress: "123 Main St",
          trackNumber: "TRACK123",
          status: "Shipped",
          details: [{ product: "Product 1", quantity: 2, price: 100 }],
        },
        {
          id: 2,
          date: "2024-09-02",
          customerName: "Jane Smith",
          deliveryAddress: "456 Elm St",
          trackNumber: "TRACK456",
          status: "Processing",
          details: [{ product: "Product 2", quantity: 1, price: 50 }],
        },
      ],
      products: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ],
      newOrder: {
        date: "",
        customerName: "",
        deliveryAddress: "",
        trackNumber: "",
        status: "",
        details: [{ product: "", quantity: 1, price: 0 }],
      },
      selectedOrder: null,
    };
  },
  methods: {
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
      this.showEditForm = false;
      this.showOrderDetails = false;
      this.newOrder = {
        date: "",
        customerName: "",
        deliveryAddress: "",
        trackNumber: "",
        status: "",
        details: [{ product: "", quantity: 1, price: 0 }],
      };
    },
    addOrder() {
      const newId = Date.now();
      this.orders.push({ ...this.newOrder, id: newId });
      this.showAddForm = false;
    },
    viewOrderDetails(order) {
      this.selectedOrder = { ...order };
      this.showOrderDetails = true;
      this.showEditForm = false;
      this.showAddForm = false;
    },
    hideOrderDetails() {
      this.showOrderDetails = false;
    },
    editOrder(order) {
      this.selectedOrder = { ...order };
      this.showEditForm = true;
      this.showOrderDetails = false;
      this.showAddForm = false;
    },
    submitEdit() {
      const index = this.orders.findIndex(
        (order) => order.id === this.selectedOrder.id
      );
      if (index !== -1) {
        this.orders.splice(index, 1, this.selectedOrder);
        this.showEditForm = false;
      }
    },
    cancelEdit() {
      this.showEditForm = false;
    },
    deleteOrder(orderId) {
      const order = this.orders.find((order) => order.id === orderId);
      if (
        confirm(
          `Are you sure you want to delete the order for ${order.customerName}?`
        )
      ) {
        this.orders = this.orders.filter((order) => order.id !== orderId);
        alert(`Order for ${order.customerName} has been deleted.`);
      }
    },
    addNewDetail() {
      this.newOrder.details.push({ product: "", quantity: 1, price: 0 });
    },
    removeDetail(index) {
      this.newOrder.details.splice(index, 1);
    },
    addNewDetailToEdit() {
      this.selectedOrder.details.push({ product: "", quantity: 1, price: 0 });
    },
    removeDetailFromEdit(index) {
      this.selectedOrder.details.splice(index, 1);
    },
  },
};
</script>
