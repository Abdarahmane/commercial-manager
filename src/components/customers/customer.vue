<template>
  <div class="container my-4">
    <h1>List of Customers</h1>
    <div class="mb-3 d-flex justify-content-end">
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addCustomerModal"
      >
        Add Customer
      </button>
    </div>

    <table class="table table-striped col-12">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.address }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>
            <button
              class="btn btn-info btn-sm"
              @click="showModal('view', customer)"
            >
              <i class="fa fa-eye"></i>
            </button>
            <button
              class="btn btn-warning btn-sm"
              @click="showModal('edit', customer)"
            >
              <i class="fa fa-pencil"></i>
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="confirmDelete(customer)"
            >
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Customer Modal -->
    <div
      class="modal fade"
      id="addCustomerModal"
      tabindex="-1"
      aria-labelledby="addCustomerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCustomerModalLabel">
              Add New Customer
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addCustomer">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  v-model="newCustomer.name"
                  type="text"
                  class="form-control"
                  id="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input
                  v-model="newCustomer.address"
                  type="text"
                  class="form-control"
                  id="address"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  v-model="newCustomer.email"
                  type="email"
                  class="form-control"
                  id="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input
                  v-model="newCustomer.phone"
                  type="text"
                  class="form-control"
                  id="phone"
                  required
                />
              </div>
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary me-2">
                  Add Customer
                </button>
                <button
                  type="button"
                  class="btn btn-secondary ms-auto"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Modal -->
    <div
      class="modal fade"
      id="customerModal"
      tabindex="-1"
      aria-labelledby="customerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="customerModalLabel">
              {{ modalTitle }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div v-if="modalAction === 'view'" class="p-3">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                v-model="selectedCustomer.name"
                type="text"
                class="form-control"
                id="name"
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <input
                v-model="selectedCustomer.address"
                type="text"
                class="form-control"
                id="address"
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                v-model="selectedCustomer.email"
                type="email"
                class="form-control"
                id="email"
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input
                v-model="selectedCustomer.phone"
                type="text"
                class="form-control"
                id="phone"
                disabled
              />
            </div>
            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>

          <div v-if="modalAction === 'edit'" class="px-4">
            <form @submit.prevent="submitEdit">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  v-model="selectedCustomer.name"
                  type="text"
                  class="form-control"
                  id="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input
                  v-model="selectedCustomer.address"
                  type="text"
                  class="form-control"
                  id="address"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  v-model="selectedCustomer.email"
                  type="email"
                  class="form-control"
                  id="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input
                  v-model="selectedCustomer.phone"
                  type="text"
                  class="form-control"
                  id="phone"
                  required
                />
              </div>

              <div class="d-flex justify-content-between mb-4">
                <button type="submit" class="btn btn-primary me-2">
                  Save Changes
                </button>
                <button
                  type="button"
                  class="btn btn-secondary ms-auto"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
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
      customers: [
        {
          id: 1,
          name: "John Doe",
          address: "123 Main St",
          email: "john@example.com",
          phone: "123-456-7890",
        },
        {
          id: 2,
          name: "Jane Smith",
          address: "456 Oak St",
          email: "jane@example.com",
          phone: "098-765-4321",
        },
      ],
      selectedCustomer: {},
      modalTitle: "",
      modalAction: "",
      newCustomer: { name: "", address: "", email: "", phone: "" },
    };
  },
  methods: {
    showModal(action, customer) {
      this.selectedCustomer = { ...customer };
      this.modalAction = action;
      this.modalTitle = this.generateModalTitle(action, customer);
      const modal = new bootstrap.Modal(
        document.getElementById("customerModal")
      );
      modal.show();
    },
    generateModalTitle(action, customer) {
      if (action === "view") return `Details of ${customer.name}`;
      if (action === "edit") return `Edit ${customer.name}`;
      return `Delete ${customer.name}`;
    },
    submitEdit() {
      alert(`Modifications saved for ${this.selectedCustomer.name}`);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("customerModal")
      );
      modal.hide();
    },
    confirmDelete(customer) {
      const confirmation = window.confirm(
        `Are you sure you want to delete ${customer.name}?`
      );
      if (confirmation) {
        this.customers = this.customers.filter(
          (c) => c.id !== customer.id
        );
        alert(`${customer.name} has been deleted.`);
      }
    },
    addCustomer() {
      this.customers.push({
        ...this.newCustomer,
        id: this.customers.length + 1,
      });
      alert(`Customer ${this.newCustomer.name} added successfully.`);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("addCustomerModal")
      );
      modal.hide();
      this.resetNewCustomer();
    },
    resetNewCustomer() {
      this.newCustomer = { name: "", address: "", email: "", phone: "" };
    },
  },
};
</script>

<style scoped>
.btn {
  margin-right: 5px;
}
</style>
