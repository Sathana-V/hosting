<template>
  <v-card>
    <v-card-title class="background white--text text-h5 pa-2">
      <div class="ml-3 pl-6">
        <h5 style="text-align: center">ADD Invoice</h5>
      </div>
    </v-card-title>

    <v-container class="pa-6">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="4" sm="12" md="4">
            <h4>Customer Name</h4>
            <v-combobox
              clearable
              v-model="selectedCustomer"
              @input="choseCustomer"
              :rules="customerRules"
              item-text="name"
              item-value="id"
              class="mt-2 pa-0"
              ref="customer_name"
              outlined
              return-object
              :items="availableCustomers"
            ></v-combobox>
          </v-col>
          <v-col cols="12" lg="4" sm="12" md="4">
            <h4>Mobile Number</h4>
            <v-text-field
              outlined
              class="mt-2 pa-0"
              ref="customer_no"
              :rules="customerRules"
              v-model="customer_no"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="6" md="4">
            <h4>Customer Address</h4>
            <v-textarea
              name="input-8-4"
              ref="customer_address"
              outlined
              rows="3"
              aria-required=""
              class="mt-2 pa-0"
              v-model="customer_address"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row class="mb-3">
          <v-col class="" cols="12" lg="6" sm="6" md="6">
            <h4 class="ml-3">Products</h4>
          </v-col>
          <v-col cols="12" lg="6" sm="6" md="6" style="text-align: right">
            <v-btn
              dense
              @click="addItem"
              color="background ml-6  pl-6 pr-6"
              elevation="4"
              class="mr-3"
              large
              dark
              >Add Item</v-btn
            >
          </v-col>
        </v-row>

        <v-data-table
          :hide-default-footer="true"
          loading-text="Loading... Please wait"
          :headers="itemHeaders"
          :items-per-page="productItems.length"
          :items="productItems"
        >
          <template v-slot:item.No="{ index }">
            <h4>{{ index + 1 }}</h4>
          </template>
          <template v-slot:item.productName="{ item, index }">
            <v-autocomplete
              key=""
              ref="productName"
              outlined
              v-model="item.productDetail"
              @input="editInput(item, index)"
              :rules="colorRules"
              :items="productList"
              clearable
              item-text="product_name"
              item-value="product_id"
              return-object
            >
            </v-autocomplete>
          </template>

          <template v-slot:item.size="{ item, index }">
            <v-autocomplete
              key=""
              ref="itemsize"
              outlined
              v-model="item.size"
              @input="choseSize(item, index)"
              :rules="colorRules"
              :items="item.availableSizes"
              clearable
              item-text="text"
              item-value="value"
              return-object
            >
            </v-autocomplete>
          </template>
          <template v-slot:item.amount="{ item }">
            <v-text-field
              class="ma-2"
              solo
              placeholder="10-15"
              v-model="item.amount"
              readonly
            >
            </v-text-field>
          </template>
          <template v-slot:item.piece="{ item, index }">
            <v-text-field
              class="ma-2"
              solo
              placeholder="10-15"
              v-model="item.piece"
              type="number"
              min="1"
              @input="changeQuantity(item, index)"
            >
            </v-text-field>
          </template>
          <template  v-slot:item.action="{ item, index }">
            <v-icon
                          dark
                          @click="
                            deleteItem(
                              index
                            )
                          "
                          color="red"
                         
                          >mdi-delete</v-icon>
          </template>
          <template v-slot:item.price="{ item }">
            <v-text-field
              class="ma-2"
              solo
              placeholder="10-15"
              v-model="item.price"
              readonly
            >
            </v-text-field>
          </template>
        </v-data-table>

        <v-row
          style="text-align: right"
          class="d-flex justify-content-end flex-row-reverse"
        >
          <v-col cols="12" lg="6" sm="6" md="6" class="mt-3">
            <h3>Total Amount : {{ totalPrice }}</h3>
          </v-col>
        </v-row>
      </v-form>
    </v-container>

    <v-card-actions class="d-flex align-lg-content-end flex-column">
      <div>
        <v-btn
          class="white pa-4 black--text"
          dense
          elevation="4"
          large
          @click="closeDialog"
          >Cancel</v-btn
        >
        <v-btn
          dense
          color="background ml-6  pl-6 pr-6"
          elevation="4"
          @click="submit"
          large
          dark
          >Save</v-btn
        >
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
const sorter2 = (sortBy) => (a, b) =>
  a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
import Mixins from "@/store/mixins.vue";
export default {
  emits: ["closeDialog"],
  name: "AddInvoice",
  mixins: [Mixins],
  data: (vm) => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    showPreviewAndPrint: false,
    icon: "mdi-checkbox-blank-outline",
    menu1: false,
    tableShow: false,
    customerPurchaseDetail: {},
    availableCustomers: [],
    selectedCustomer: null,
    itemHeaders: [
      { text: "No", value: "No", sortable: false, width: 5 },
      {
        text: "Product Name",
        value: "productName",
        sortable: false,
        width: 35,
      },
      { text: "Size", value: "size", sortable: false, width: 10 },
      { text: "Piece", value: "piece", sortable: false, width: 10 },
      { text: "Price", value: "price", sortable: false, width: 10 },
      { text: "Amount", value: "amount", sortable: false, width: 20 },
      { text: "Actions", value: "action", sortable: false, width: 20 },
    ],
    toggle: false,
    orderId: -1,
    modal: false,
    model: true,
    valid: false,
    success_message: false,
    success: false,
    menu2: false,
    sizeChart: [],
    cmChart: [],
    dialog: false,
    hidden: false,
    today: new Date().toJSON().slice(0, 10),

    colorRules: [(v) => !!v || "Required"],
    categoryFilter: null,

    customer_no: "",
    customer_name: "",
    customer_address: "",
    price: "",

    customerRules: [(v) => !!v || "Required"],

    productItems: [],

    totalPrice: 0,

    priceTag: [],
  }),
  mounted() {
    this.Details();
    this.valid = false;
  },

  created: function () {
    this.valid = false;
  },

  computed: {
    fontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "3em";
        default:
          return "5em";
      }
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    // for responsive image width
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 150;
        case "sm":
          return 150;
        case "md":
          return 150;
        case "lg":
          return 200;
        case "xl":
          return 150;
      }
    },
    filecount() {
      return this.preview_list.length;
    },
    // for responsive dialog width
    editport() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 250;
        case "sm":
          return 350;
        case "md":
          return 450;
        case "lg":
          return 800;
        case "xl":
          return 550;
      }
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    //Filtering models based on Category
   
  },

  methods: {
    choseCustomer() {
      console.log(
        this.selectedCustomer,
        this.selectedCustomer != null &&
          typeof this.selectedCustomer == "object"
      );
      if (
        this.selectedCustomer != null &&
        typeof this.selectedCustomer == "object"
      ) {
        this.customer_name = this.selectedCustomer.name;
        this.customer_address = this.selectedCustomer.address;
        this.customer_no = this.selectedCustomer.mobile;
      } else if (this.selectedCustomer != null) {
        this.customer_name = this.selectedCustomer;
        this.customer_address = "";
        this.customer_no = "";
      } else {
        this.customer_address = "";
        this.customer_no = "";
      }
    },
    showPrintDialog() {
      this.customerPurchaseDetail = {
        customer_name: this.customer_name,
        customer_address: this.customer_address,
        customer_no: this.customer_no,
        products: this.productItems,
      };
      this.showPreviewAndPrint = true;
    },
    closePrintDialog() {
      this.showPreviewAndPrint = false;
    },
    changeQuantity(item, index) {
      this.productItems[index].amount =
        parseInt(item.piece) * parseInt(item.price);

      console.log("change q", parseInt(item.piece) * parseInt(item.price));

      console.log(this.productItems[index]);
      this.calculateTotalAmount();
    },
    choseSize(item, index) {
      var priceItem;
      var validPrices = [];
      console.log(item);
      if (item.size != null) {
        if (item.productDetail != {}) {
          console.log(item.size.value);
          console.log(item.productDetail.sizetype);
          if (item.productDetail.sizetype == "cm") {
            validPrices = ["80", "70", "75", "90"];
          } else {
            validPrices = ["S", "L", "M"];
          }
          if (item.size.value == "All Size") {
            var priceToAdd = "0";
            var currentPrice = {
              "'price'": 0,
            };
            if (item.productDetail.price.length == 1) {
              currentPrice = item.productDetail.price[0];
            } else {
              for (
                var priceIndex = 0;
                priceIndex < item.productDetail.price.length;
                priceIndex++
              ) {
                if (
                  validPrices.includes(
                    item.productDetail.price[priceIndex]["'label'"]
                  )
                ) {
                  currentPrice = item.productDetail.price[priceIndex];

                  break;
                }
              }
            }

            if (
              currentPrice["'pricePerPiece'"] != "0" &&
              currentPrice["'pricePerPiece'"] != null &&
              currentPrice["'pricePerPiece'"] != undefined
            ) {
              priceToAdd = currentPrice["'pricePerPiece'"];
            } else {
              priceToAdd = currentPrice["'price'"];
            }
            this.productItems[index]["price"] = priceToAdd;
          } else {
            console.log("inside");
            priceItem = this.productItems[index]["price"] =
              item.productDetail.price.find((value) => {
                return value["'label'"] == item.size.value;
              });
            if (
              priceItem["'pricePerPiece'"] != "0" &&
              priceItem["'pricePerPiece'"] != null &&
              priceItem["'pricePerPiece'"] != undefined
            ) {
              this.productItems[index]["price"] = priceItem["'pricePerPiece'"];
            } else {
              this.productItems[index]["price"] = priceItem["'price'"];
            }
          }

          this.productItems[index].piece = 1;
          this.productItems[index].amount =
            parseInt(item.piece) * parseInt(item.price);
          console.log(this.productItems[index]);
        }
      }
      this.calculateTotalAmount();
    },
    calculateTotalAmount() {
      var total = 0;
      for (let i = 0; i < this.productItems.length; i++) {
        total += this.productItems[i].amount;
      }
      this.totalPrice = total;
    },
    printScreen() {
      var content = "";
      for (let i = 0; i < this.productItems.length; i++) {
        content += `<tr>
        <td>${i + 1}</td>
        <td>${this.productItems[i].productName}</td>
        <td>${this.productItems[i].size["value"]}</td>
        <td>${this.productItems[i].piece}</td>
         <td>${this.productItems[i].price}</td>
        <td>${this.productItems[i].amount}</td>
        </tr>`;
      }
      this.printContentsIntoPrinter(
        content,
        this.customer_name,
        this.customer_no,
        this.customer_address,
        this.dateFormatted,
        this.orderId,
        this.totalPrice
      );
    },
    editInput(item, index) {
      if (item.productDetail != {} && item.productDetail != null) {
        console.log(item.productDetail);
        this.productItems[index].productName = item.productDetail.product_name;
        this.productItems[index]["availableSizes"] =
          item.productDetail.available_size.map((size) => ({
            text: size,
            value: size,
          }));
        this.productItems[index]["availableSizes"].push({
          text: "All Size",
          value: "All Size",
        });
        this.productItems[index].size = {
          label: 0,
          value: 0,
        };
        this.productItems[index].price = 0;
        this.productItems[index].piece = 0;
        this.productItems[index].amount = 0;
        console.log(this.productItems[index]);
      }
      this.calculateTotalAmount();
    },
    deleteItem(index) {
      let newList = [];
      for(var i = 0 ; i< this.productItems.length; i++) {
        if(i!=index) {
          newList.push(this.productItems[i]);
        } 
      }
      this.productItems = newList;
      this.calculateTotalAmount();
    },
    addItem() {
      this.productItems.push({
        productName: "",
        size: 0,
        productDetail: {},
        availableSizes: [],
        piece: 1,
        price: 0,
        amount: 0,
      });
    },

    //function to close add dialog box
    closeDialog(status) {
      this.reset();
      this.valid = false;
      this.$emit("clicked", status);
    },
    //function for fetching model details
    async Details() {
      this.productList = [];
      this.availableCustomers = [];
      const response2 = await this.$axios
        .get(`/Product`)
        .then((res) => {
          var i = 0;
          console.log(res.data);
          for (i; i < res.data.Product_Data.length; i++) {
            this.productList.push(res.data.Product_Data[i]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      await this.$axios
        .get(`/Customers`)
        .then((res) => {
          var i = 0;
          console.log(res.data);
          for (i; i < res.data.Customer_Details.length; i++) {
            this.availableCustomers.push(res.data.Customer_Details[i]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    //form is reseted when user clicks cancel button
    reset() {
      console.log("callled");
      this.date = this.today;
      this.customer_name = "";
      this.customer_no = "";
      this.customer_address = "";
      this.tableShow = false;
      this.selectedCustomer = null;
      this.productItems = [];
      this.orderId = -1;
      this.valid = true;

      this.dialog = false;
    },

    //invokes when submit button is clicked
    async submit() {
      this.$refs.form.validate();
      console.log(this.$refs.form.validate());

      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("total_price", this.totalPrice);
        data.append("customer_name", this.customer_name);
        data.append("customer_address", this.customer_address);
        data.append("customer_mobile", this.customer_no);
        let items = [];
        for (var index = 0; index < this.productItems.length; index++) {
          console.log({
            product_id: this.productItems[index].productDetail.product_id,
            quantity: this.productItems[index].piece,
            amount: this.productItems[index].amount,
            price: this.productItems[index].price,
            size: this.productItems[index].size["value"],
          });
          items.push({
            product_id: this.productItems[index].productDetail.product_id,
            quantity: this.productItems[index].piece,
            amount: this.productItems[index].amount,
            price: this.productItems[index].price,
            size: this.productItems[index].size["value"],
          });
        }
        data.append("items", items);
        for (var pair of data.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        let data2 = {
          total_price: this.totalPrice,
          customer_name: this.customer_name,
          customer_address: this.customer_address,
          customer_mobile: this.customer_no,
          items: items,
        };
        console.log(data2);
        await this.$axios

          .post("orders/add", data2)
          .then((res) => {
            console.log(res);
            if (res.data.error) {
              console.log(res.data.messages);
              this.closeDialog("failed");
            } else {
              this.orderId = res.data.order_id;
              console.log(res.data.messages, this.orderId);
              this.printScreen();
              this.closeDialog("success");
            }
          })

          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
@media print {
  img {
    display: block; /* Ensure the image is displayed */
    max-width: 100%; /* Ensure the image doesn't overflow its container */
  }
  .example-screen {
    display: none;
  }
  .print-spacebetween {
    display: flex;
    justify-content: space-between;
  }
}
.theme--light.v-data-table {
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid darkgray;
}
tr {
  margin-bottom: -10%;
  padding-bottom: -10%;
}
.v-dialog--custom {
  overflow: unset;
}
.v-application .text-h5 {
  font-size: 1.5rem !important;
  font-weight: 400;
  font-size: 40px;
  text-align: center;
  line-height: 4rem;
  letter-spacing: normal !important;
  font-family: "Roboto", sans-serif !important;
}
.v-application .background {
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
}
</style>
