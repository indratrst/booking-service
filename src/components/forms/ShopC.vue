<template>
  <div>
    <div class="container" style="margin-top: 86px">
      <h2>Add To List</h2>
      <div class="row">
        <div class="col-md-6">
          <form @submit.prevent="">
            <div class="input-group mb-3">
              <label for="name" class="input-group-text">Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-control"
                required
              />
            </div>

            <div class="input-group mb-3">
              <label for="email" class="input-group-text">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-control"
                required
              />
            </div>

            <div class="input-group mb-3">
              <label for="phone" class="input-group-text">Phone</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="form-control"
                required
              />
            </div>
            <div class="input-group mb-3">
              <label for="platNomor" class="input-group-text">Plat Nomor</label>
              <input
                id="platNomor"
                v-model="formData.platNomor"
                type="text"
                class="form-control"
                required
              />
            </div>

            <div class="input-group mb-3">
              <label for="catatanKeluhan" class="input-group-text"
                >Catatan Keluhan</label
              >
              <textarea
                id="catatanKeluhan"
                v-model="formData.catatanKeluhan"
                class="form-control"
              ></textarea>
            </div>

            <!-- <div class="form-group">
              <label for="totalPrice">Total Price</label>
              <input
                id="totalPrice"
                v-model="formData.totalPrice"
                type="number"
                class="form-control"
                required
              />
            </div> -->
            <div
              class="input-group mb-3"
              label="Booking Date"
              label-for="bookingDate"
            >
              <label for="kmTerakhir" class="input-group-text"
                >Booking Date</label
              >

              <input
                id="bookingDate"
                v-model="formData.bookingDate"
                type="date"
                class="form-control"
                required
              />
            </div>

            <div class="input-group mb-3">
              <label for="kmTerakhir" class="input-group-text"
                >KM Terakhir</label
              >
              <input
                id="kmTerakhir"
                v-model="formData.kmTerakhir"
                type="number"
                class="form-control"
                required
              />
            </div>

            <select
              id="jasaService"
              v-model="selectedJasaService"
              class="form-select"
              aria-label="Default select example"
              @change="updateTotalPrice"
              required
            >
              <option selected>Select Jasa Service</option>
              <option
                v-for="service in bookings[1].jasaServis"
                :value="service"
                :key="service.nama"
              >
                <!-- {{ service.nama }} ({{ calculateTotalPrice(service.harga) }}) -->
                {{ service.nama }} {{ service.harga }}
              </option>
            </select>

            <div class="card m-2" style="width: 18rem">
              <div class="card-body">
                <div class="form-group">
                  <h5 class="card-title">Additional Services</h5>
                  <div
                    class="form-check"
                    v-for="service in bookings[2].additionalServices"
                    :key="service.additionalName"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :id="service.additionalName"
                      :value="service"
                      v-model="selectedServices"
                      @change="updateTotalPrice"
                    />
                    <label
                      class="form-check-label"
                      :for="service.additionalName"
                    >
                      {{ service.additionalName }} (Price:
                      {{ service.additionalPrice }})
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group mb-3">
              <label for="totalPrice">Total Price</label>
              <input
                type="number"
                id="totalPrice"
                v-model="totalPrice"
                class="form-control"
                disabled
              />
              Rp.{{ totalPrice }}
            </div>

            <button
              type="submit"
              @click="addToCart"
              class="btn btn-primary mb-3"
            >
              Add to Cart
            </button>
            <!-- <button class="btn btn-secondary" @click="editBooking(booking)">
              Edit
            </button> -->
          </form>
        </div>
      </div>

      <div class="container-xl">
        <div v-if="cart.length > 0">
          <!-- <h4>Cart:</h4> -->
          <!-- <div>
            <b-navbar class="px-5" variant="light">
              <b-navbar-brand class="" href="#">NavBar</b-navbar-brand>

              <div>
                <b-nav>
                  <RouterLink class="nav-link">Login</RouterLink>
                  <RouterLink class="btn btn-outline-dark">Cart</RouterLink>
                </b-nav>
              </div>
            </b-navbar>
          </div> -->
          <div class="row">
            <div class="col" v-for="(item, index) in cart" :key="index">
              <div class="card m-2 shadow-md" style="width: 18rem">
                <div class="card-body">
                  <p class="card-title">NO.{{ index + 1 }}</p>
                  <h5 class="card-title">{{ item.name }}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    {{ item.email }}
                  </h6>
                  <strong>Status : {{ item.status }}</strong>

                  <p class="card-text">
                    <strong> Catatan Keluhan : </strong> <br />
                    {{ item.catatanKeluhan }}
                  </p>
                  <p class="card-text">
                    <strong> Tanggal Booking : </strong> <br />
                    {{ item.bookingDate }}
                  </p>
                  <p class="card-text">
                    <strong> Jasa Service : </strong>{{ item.jasaServis.nama }}
                  </p>
                  <strong><p>List additional :</p></strong>
                  <ul class="" v-for="i in item.additionalServices">
                    <li class="">Additional : {{ i.additionalName }}</li>
                  </ul>
                  <p class="card-text mt-3">
                    <strong> Total Service : </strong>{{ item.totalPrice }}
                  </p>
                  <button
                    class="btn btn-danger m-2"
                    @click="cancelBooking(index)"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-secondary"
                    @click="editBooking(item.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="editModal"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
          tabindex="-1"
          v-if="showEditModal"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit Booking</h5>
                <!-- <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="closeEditModal"
                >
                  <span aria-hidden="true">&times;</span>
                </button> -->
              </div>
              <div class="modal-body">
                <form>
                  <!-- Tambahkan input fields yang sesuai dengan properti-propserti yang ingin diubah -->
                  <div class="form-group">
                    <label for="editName">Name:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="editName"
                      v-model="editingBooking.name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="editEmail">Email:</label>
                    <input
                      type="email"
                      class="form-control"
                      id="editEmail"
                      v-model="editingBooking.email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="editEmail">catatanKeluhan:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="editEmail"
                      v-model="editingBooking.catatanKeluhan"
                    />
                  </div>
                  <div class="form-group">
                    <label for="editDate">Date:</label>
                    <input
                      type="date"
                      class="form-control"
                      id="editEmail"
                      v-model="editingBooking.bookingDate"
                    />
                  </div>
                  <div class="card m-2" style="width: 18rem">
                    <div class="card-body">
                      <div class="form-group">
                        <h5 class="card-title">Additional Services</h5>
                        <div
                          class="form-check"
                          v-for="service in bookings[2].additionalServices"
                          :key="service.additionalName"
                        >
                          <input
                            type="checkbox"
                            class="form-check-input"
                            :id="service.additionalName"
                            :value="service"
                            v-model="selectedServices"
                            @change="updateTotalPrice"
                          />
                          <label
                            class="form-check-label"
                            :for="service.additionalName"
                          >
                            {{ service.additionalName }} (Price:
                            {{ service.additionalPrice }})
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <select
                    id="jasaService"
                    v-model="selectedJasaService"
                    class="form-select"
                    @change="updateTotalPrice"
                    required
                  >
                    <option selected>Select Jasa Service</option>
                    <option
                      v-for="service in bookings[1].jasaServis"
                      :value="service"
                      :key="service.nama"
                    >
                      <!-- {{ service.nama }} ({{ calculateTotalPrice(service.harga) }}) -->
                      {{ service.nama }} {{ service.harga }}
                    </option>
                  </select>

                  <div class="form-group mb-3">
                    <label for="totalPrice">Total Price</label>
                    <input
                      type="number"
                      id="totalPrice"
                      v-model="totalPrice"
                      class="form-control"
                      disabled
                    />
                  </div>

                  <!-- Tambahkan input fields lainnya -->
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeEditModal"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click="saveEdit"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookings: [
        {
          Name: "",
          Email: "",
          Phone: "",
          platNomor: "",
          bookingDate: "",
          merk: "",
          totalPrice: 0,
          kmTerakhir: 0,
          catatanKeluhan: "",
          additionalServices: [],
          jasaServis: [],
          status: "",
        },

        {
          jasaServis: [
            {
              nama: "Ganti Oli",
              jenis: "Servis Rutin",
              harga: 100000,
            },
            {
              nama: "Pembersihan Karburator",
              jenis: "Servis Spesifik",
              harga: 50000,
            },
            {
              nama: "Pengecekan Rem",
              jenis: "Servis Rutin",
              harga: 75000,
            },
          ],
        },

        {
          additionalServices: [
            {
              additionalName: "GPS Tracker",
              additionalPrice: 10,
            },
            {
              additionalName: "Child Fix Seat",
              additionalPrice: 15,
            },
            {
              additionalName: "NoS",
              additionalPrice: 20,
            },
          ],
        },
      ],
      selectedServices: [],
      selectedJasaService: null,
      totalPrice: 0,
      cart: [],
      editingIndex: -1,
      editingBooking: null,
      showEditModal: false,

      formData: {
        name: "",
        email: "",
        phone: "",
        platNomor: "",
        catatanKeluhan: "",
        totalPrice: 0,
        kmTerakhir: 0,
        bookingDate: "",
        additionalService: [],
        jasaServis: "",
        status: "",
      },
    };
  },
  methods: {
    addToCart() {
      const booking = {
        id: this.generateServiceId(),
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        platNomor: this.formData.platNomor,
        catatanKeluhan: this.formData.catatanKeluhan,
        totalPrice: this.formData.totalPrice,
        kmTerakhir: this.formData.kmTerakhir,
        bookingDate: this.formData.bookingDate,
        additionalServices: this.selectedServices,
        jasaServis: this.selectedJasaService,
        totalPrice: this.totalPrice,
        status: "Booked",
      };
      axios
        .post("https://reqres.in/api/users", {
          booking,
        })
        .then((response) => {
          // Successful login
          alert("Create successfully!");
          // this.$router.push("/shop");
        })
        .catch((error) => {
          // Failed login
          this.errorMessage = "Invalid data";
        });

      this.cart.push(booking);

      // this.cart.push({ ...this.formData, status: "Booked" });
      // console.log(booking);
    },
    calculateTotalPrice(basePrice) {
      let totalPrice = basePrice;
      for (const service of this.selectedServices) {
        totalPrice += service.additionalPrice;
      }
      return totalPrice;
    },
    updateTotalPrice() {
      if (this.selectedJasaService) {
        const basePrice = this.selectedJasaService.harga;
        this.totalPrice = this.calculateTotalPrice(basePrice);
      } else {
        this.totalPrice = 0;
      }
    },
    cancelBooking(index) {
      this.cart[index].status = "Cancel";
    },

    editBooking(bookingId) {
      // const booking = this.cart.find((booking) => booking.id === bookingId);
      // console.log(booking);
      // if (booking) {
      //   const newName = prompt("Masukkan nama :");
      //   const newType = prompt("Masukkan  email:");
      //   if (newName && newType) {
      //     booking.name = newName;
      //     booking.email = newType;
      //   }
      // }
      const bookingIndex = this.cart.findIndex(
        (booking) => booking.id === bookingId
      );
      if (bookingIndex !== -1) {
        this.editingIndex = bookingIndex;
        this.editingBooking = { ...this.cart[bookingIndex] };
        this.selectedServices = this.editingBooking.additionalServices;
        this.selectedJasaService = this.editingBooking.jasaServis;
        this.totalPrice = this.editingBooking.totalPrice;
        this.showEditModal = true;
      }
    },

    closeEditModal() {
      this.showEditModal = false;
    },
    saveEdit() {
      if (this.editingIndex >= 0) {
        this.cart[this.editingIndex] = this.editingBooking;
        this.cart[this.editingIndex].additionalServices = this.selectedServices;
        this.cart[this.editingIndex].jasaServis = this.selectedJasaService;
        this.cart[this.editingIndex].totalPrice = this.totalPrice;
        this.showEditModal = false;
      }
      axios
        .put(`https://reqres.in/api/users/${this.editingIndex}`, {})
        .then((response) => {
          // Successful login
          alert("Edit successfully!");
          // this.$router.push("/shop");
        })
        .catch((error) => {
          // Failed login
          this.errorMessage = "Invalid data";
        });
    },
    generateServiceId() {
      return Math.floor(Math.random() * 1000);
    },
  },
};
</script>
