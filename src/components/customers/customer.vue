<template>
  <div class="container my-4">
    <h1>List of Customers</h1>
    <div class="mb-3 d-flex justify-content-end">
      
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCustomerModal">Add Customer</button>
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
            <button class="btn btn-info btn-sm" @click="showModal('view', customer)">
              <i class="fa fa-eye"></i>
            </button>
            <button class="btn btn-warning btn-sm" @click="showModal('edit', customer)">
              <i class="fa fa-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm" @click="showModal('delete', customer.id)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Customer Modal -->
  <div class="modal fade" id="addCustomerModal" tabindex="-1" aria-labelledby="addCustomerModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addCustomerModalLabel">Add New Customer</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addCustomer">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="newCustomer.name" type="text" class="form-control" id="name" required>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input v-model="newCustomer.address" type="text" class="form-control" id="address" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="newCustomer.email" type="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input v-model="newCustomer.phone" type="text" class="form-control" id="phone" required>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary me-2">Add Customer</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


   
    <div class="modal fade" id="customerModal" tabindex="-1" aria-labelledby="customerModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="customerModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Modal content based on action -->
            <div v-if="modalAction === 'view'">
              <p><strong>Name:</strong> {{ selectedCustomer.name }}</p>
              <p><strong>Address:</strong> {{ selectedCustomer.address }}</p>
              <p><strong>Email:</strong> {{ selectedCustomer.email }}</p>
              <p><strong>Phone:</strong> {{ selectedCustomer.phone }}</p>
            </div>

            <div v-if="modalAction === 'edit'">
              <form @submit.prevent="submitEdit">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input v-model="selectedCustomer.name" type="text" class="form-control" id="name">
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">Address</label>
                  <input v-model="selectedCustomer.address" type="text" class="form-control" id="address">
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input v-model="selectedCustomer.email" type="email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">Phone</label>
                  <input v-model="selectedCustomer.phone" type="text" class="form-control" id="phone">
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </form>
            </div>

            <div v-if="modalAction === 'delete'">
              <p>Are you sure you want to delete {{ selectedCustomer.name }}?</p>
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
      customers: [
        { id: 1, name: 'John Doe', address: '123 Main St', email: 'john@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', address: '456 Oak St', email: 'jane@example.com', phone: '098-765-4321' },
      ],
      selectedCustomer: {
        name: '',
        address: '',
        email: '',
        phone: ''
      },
      modalTitle: '',
      modalAction: '',
      newCustomer: {
        name: '',
        address: '',
        email: '',
        phone: ''
      }
    };
  },
  methods: {
    showModal(action, customer) {
      this.selectedCustomer = { ...customer };
      this.modalAction = action;

      if (action === 'view') {
        this.modalTitle = `Details of ${customer.name}`;
      } else if (action === 'edit') {
        this.modalTitle = `Edit ${customer.name}`;
      } else if (action === 'delete') {
        this.modalTitle = `Delete ${customer.name}`;
      }

      const modal = new bootstrap.Modal(document.getElementById('customerModal'));
      modal.show();
    },
    submitEdit() {
      alert(`Modifications saved for ${this.selectedCustomer.name}`);
      const modal = bootstrap.Modal.getInstance(document.getElementById('customerModal'));
      modal.hide();
    },
    confirmDelete() {
      this.customers = this.customers.filter(customer => customer.id !== this.selectedCustomer.id);
      const modal = bootstrap.Modal.getInstance(document.getElementById('customerModal'));
      modal.hide();
    },
    addCustomer() {
      
      alert(`Customer ${this.newCustomer.name} added successfully.`);
      this.customers.push({
        ...this.newCustomer,
        id: this.customers.length + 1 
      });
      const modal = bootstrap.Modal.getInstance(document.getElementById('addCustomerModal'));
      modal.hide();
      this.resetNewCustomer();
    },
    resetNewCustomer() {
      this.newCustomer = {
        name: '',
        address: '',
        email: '',
        phone: ''
      };
    }
  }
};
</script>

<style scoped>
.btn {
  margin-right: 5px;
}
</style>
