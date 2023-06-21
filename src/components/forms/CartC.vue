<template lang="">
  <div>
    <div class="container mt-5 mb-5">
      <b-card title="Form Booking" style="max-width: 30rem" class="mb-2">
        <div class="row">
          <div class="col">
            <b-form-group id="name" label="Name">
              <b-form-input
                v-model="formData.name"
                required
                placeholder="Name"
                trim
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col d-flex">
            <b-form-group id="phone" label="Phone">
              <b-form-input
                id="input-1"
                v-model="formData.phone"
                placeholder="No handphone"
                type="tel"
                trim
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mx-2" label="Email">
              <b-form-input
                id="email"
                v-model="formData.email"
                placeholder="Email"
                required
                trim
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col d-flex">
            <b-form-group
              id="merk"
              class="mx-2"
              label="Merk"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="formData.merk"
                placeholder="Merk"
                trim
              ></b-form-input>
            </b-form-group>

            <b-form-group id="platNomor" class="mx-2" label="Plat Nomor">
              <b-form-input
                id="input-1"
                v-model="formData.platNomor"
                placeholder="Plat Nomor"
                trim
              ></b-form-input>
            </b-form-group>

            <b-form-group id="kmTerakhir" class="mx-2" label="Km Terakhir">
              <b-form-input
                id="input-1"
                type="number"
                v-model="formData.kmTerakhir"
                trim
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <b-form-group
              id="catatanKeluhan"
              class="mx-2"
              label="Catatan Keluhan"
              label-for="catatanKeluhan"
            >
              <b-form-textarea
                id="textarea"
                v-model="formData.catatanKeluhan"
                placeholder="Enter something..."
                rows="1"
                max-rows="6"
                size="md"
              ></b-form-textarea>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <!-- <b-form-group id="fieldset-1" class="mx-2" label="Pilih Tanggal">
              <VueDatePicker
                v-model="formData.bookingDate"
                required
                placeholder="Choose Date ..."
                text-input
                :text-input-options="textInputOptions"
              />
            </b-form-group> -->
            <div class="form-group mb-3">
              <label for="editDate">Date:</label>
              <input
                type="date"
                class="form-control"
                id="editEmail"
                v-model="formData.bookingDate"
              />
            </div>
          </div>
        </div>

        <label for="jasaService">List Service</label>
        <select
          id="jasaService"
          v-model="selectedJasaService"
          class="form-select"
          aria-label="Default select example"
          @change="updateTotalPrice"
          required
        >
          <option
            v-for="service in bookings[0].jasaServis"
            :value="service"
            :key="service.nama"
          >
            {{ service.nama }} ( Harga : Rp{{ service.harga }} )
          </option>
        </select>

        <div class="row mt-2">
          <div class="col">
            <b-card
              title="Additional Services"
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-form-group v-slot="{ ariaDescribedby }">
                <div
                  class="form-check"
                  v-for="service in bookings[1].additionalServices"
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
                  <label class="form-check-label" :for="service.additionalName">
                    {{ service.additionalName }} ( Harga :
                    {{ service.additionalPrice }} )
                  </label>
                </div>
              </b-form-group>
            </b-card>
          </div>
        </div>

        <div class="form-group mb-3">
          <label for="totalPrice">Total Price</label>
          Rp.{{ totalPrice }}
        </div>

        <b-button type="submit" @click="addToCart" variant="primary"
          >Create</b-button
        >
      </b-card>
    </div>
    <div class="container-xl">
      <div v-if="cart.length > 0">
        <b-navbar
          class="justify-content-between mb-3"
          toggleable="lg"
          type="dark"
          variant="primary"
        >
          <b-navbar-brand class="text-light px-2">Artikel</b-navbar-brand>
          <div class="">
            <b-collapse id="nav-collapse" is-nav>
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-nav-form>
                  <b-form-input
                    size="sm"
                    class="mr-sm-2"
                    v-model="searchQuery"
                    placeholder="Search..."
                    @input="handleSearch"
                  ></b-form-input>
                </b-nav-form>
              </b-navbar-nav>
            </b-collapse>
          </div>
        </b-navbar>

        <div class="row">
          <div
            id="myMenu"
            class="col mt-2 mb-5"
            v-for="(item, index) in cart"
            :key="index"
          >
            <div class="card" style="width: 34rem" ref="cards">
              <div class="card-body position-relative">
                <p class="card-title d-flex justify-content-between">
                  NO.{{ index + 1 }}
                  <strong>Status : {{ item.status }}</strong>
                </p>
              </div>

              <b-list-group>
                <b-list-group-item>
                  <strong> Merk : </strong> {{ item.merk }}
                </b-list-group-item>
                <b-list-group-item>
                  <strong> Plat No : </strong>
                  {{ item.platNomor }}</b-list-group-item
                >
                <b-list-group-item>
                  <strong> Km Terakhir : </strong>
                  {{ item.kmTerakhir }} Km</b-list-group-item
                >
                <b-list-group-item>
                  <strong> Catatan Keluhan : </strong>
                  {{ item.catatanKeluhan }}</b-list-group-item
                >
                <b-list-group-item>
                  <strong
                    v-if="item.reschedule && isSameRescheduled(item)"
                    class="card-text"
                  >
                    Booking Date :{{ item.bookingDate }}
                  </strong>
                  <strong
                    v-else-if="item.reschedule && !isSameRescheduled(item)"
                  >
                    Booking Date: {{ item.bookingDate }}
                    <br />
                    Reschedule:
                    {{ item.reschedule }}
                  </strong>
                  <p v-else>Booking Date :{{ item.bookingDate }}</p>
                </b-list-group-item>
                <b-list-group-item>
                  <p class="card-text">
                    <strong> Jasa Service : </strong>{{ item.jasaServis.nama }}
                  </p>
                </b-list-group-item>
                <b-list-group-item>
                  <strong><p>List additional :</p></strong>
                  <ul class="" v-for="i in item.additionalServices">
                    <li class="">Additional : {{ i.additionalName }}</li>
                  </ul>
                </b-list-group-item>
              </b-list-group>

              <div class="card-body">
                <div
                  class="d-flex justify-content-between align-items-baseline"
                >
                  <h5 class="card-title card-name">{{ item.name }}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    {{ item.email }}
                  </h6>
                </div>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  {{ item.phone }}
                </h6>
                <p class="card-text mt-3">
                  <strong> Total Service : </strong>Rp.{{ item.totalPrice }}
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
                  data-bs-target="#formModal"
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
        id="formModal"
        aria-labelledby="formModalLabel"
        aria-hidden="true"
        tabindex="-1"
        v-if="showEditModal"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Booking</h5>
            </div>
            <div class="modal-body">
              <form>
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
                  <label for="editEmail">Phone</label>
                  <input
                    type="telp"
                    class="form-control"
                    id="phone"
                    v-model="editingBooking.phone"
                  />
                </div>
                <div class="form-group">
                  <label for="editEmail">Merk</label>
                  <input
                    type="text"
                    class="form-control"
                    id="merk"
                    v-model="editingBooking.merk"
                  />
                </div>
                <div class="form-group">
                  <label for="platNomor">Plat Nomor</label>
                  <input
                    type="text"
                    class="form-control"
                    id="paltNomor"
                    v-model="editingBooking.platNomor"
                  />
                </div>
                <div class="form-group">
                  <label for="editEmail">Km Terakhir</label>
                  <input
                    type="text"
                    class="form-control"
                    id="kmTerakhir"
                    v-model="editingBooking.kmTerakhir"
                  />
                </div>
                <div class="form-group">
                  <label for="catatanKeluhan">Catatan Keluhan:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="catatanKeluhan"
                    v-model="editingBooking.catatanKeluhan"
                  />
                </div>
                <div class="form-group">
                  <label for="editDate">Date:</label>
                  <input
                    type="date"
                    class="form-control"
                    id="editEmail"
                    v-model="editingBooking.reschedule"
                  />
                </div>
                <div class="card m-2" style="width: 18rem">
                  <div class="card-body">
                    <div class="form-group">
                      <h5 class="card-title">Additional Services</h5>
                      <div
                        class="form-check"
                        v-for="service in bookings[1].additionalServices"
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
                          {{ service.additionalName }} ( Harga :
                          {{ service.additionalPrice }})
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <label class="mt-2" for="jasaService">List Service : </label>
                <select
                  id="jasaService"
                  v-model="selectedJasaService"
                  class="form-select"
                  @change="updateTotalPrice"
                  required
                >
                  <option
                    v-for="service in bookings[0].jasaServis"
                    :value="service"
                    :key="service.nama"
                  >
                    {{ service.nama }} ( Harga :{{ service.harga }} )
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
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="backBooking('Booked')"
              >
                Booked
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
</template>

<script setup>
import { ref } from "vue";

const date = ref();
const textInputOptions = ref({
  format: "MM.dd.yyyy",
});
document.addEventListener("DOMContentLoaded", function () {
  const bsOffcanvas = new Offcanvas("#offcanvasNav");
});
</script>

<script>
import axios from "axios";

export default {
  computed: {
    isRescheduled() {
      return this.editingBooking.reschedule !== null;
    },
    // nameState() {
    //   return this.formData.name.length > 2 ? true : false;
    // },
    filteredItems() {
      if (this.searchQuery) {
        return this.items.filter((item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return this.items;
      }
    },
  },
  data() {
    return {
      searchQuery: "",
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
      bookings: [
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
      reschedule: "",
      filteredItems: [],

      formData: {
        name: "",
        email: "",
        phone: "",
        merk: "",
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
  mounted() {
    this.filteredItems = this.cart;
  },
  methods: {
    addToCart() {
      const booking = {
        id: this.generateServiceId(),
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        merk: this.formData.merk,
        platNomor: this.formData.platNomor,
        catatanKeluhan: this.formData.catatanKeluhan,
        totalPrice: this.formData.totalPrice,
        kmTerakhir: this.formData.kmTerakhir,
        bookingDate: this.formData.bookingDate,
        reschedule: null,
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
    backBooking(status) {
      if (this.editingIndex >= 0) {
        this.cart[this.editingIndex].status = status;
      }
    },

    editBooking(bookingId) {
      const bookingIndex = this.cart.findIndex(
        (booking) => booking.id === bookingId
      );
      if (bookingIndex !== -1) {
        this.editingIndex = bookingIndex;
        this.editingBooking = { ...this.cart[bookingIndex] };
        this.selectedServices = this.editingBooking.additionalServices;
        this.selectedJasaService = this.editingBooking.jasaServis;
        this.totalPrice = this.editingBooking.totalPrice;
        this.reschedule = this.editingBooking.reschedule;

        this.showEditModal = true;
      }
    },

    closeEditModal() {
      this.showEditModal = false;
    },
    saveEdit() {
      if (this.editingIndex >= 0) {
        const editedBooking = {
          ...this.cart[this.editingIndex],
          name: this.editingBooking.name,
          email: this.editingBooking.email,
          phone: this.editingBooking.phone,
          merk: this.editingBooking.merk,
          platNomor: this.editingBooking.platNomor,
          kmTerakhir: this.editingBooking.kmTerakhir,
          catatanKeluhan: this.editingBooking.catatanKeluhan,
          additionalServices: this.selectedServices,
          jasaServis: this.selectedJasaService,
          totalPrice: this.totalPrice,
          reschedule: this.editingBooking.reschedule,
        };
        if (this.backBookingClicked) {
          editedBooking.status = "Booked"; // Update the status to "Booked"
        }

        this.cart[this.editingIndex] = editedBooking;
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
    isSameRescheduled(item) {
      // console.log(this.bookingDate, this.reschedule);
      return item.reschedule && item.bookingDate === item.reschedule;
    },
    handleSearch() {
      let filter = this.searchQuery.toUpperCase();
      let cards = this.$refs.cards;

      cards.forEach(function (card) {
        let title = card.querySelector(".card-name").innerHTML.toUpperCase();

        if (title.indexOf(filter) > -1) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });

      this.filteredItems = this.cart.filter(function (item) {
        let title = item.name.toUpperCase();
        return title.indexOf(filter) > -1;
      });
    },
  },
};
</script>
<style lang=""></style>
