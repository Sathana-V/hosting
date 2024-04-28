<template>
  <v-card>
    <v-card-title class="background white--text text-h5 pa-2">
      <div class="ml-3 pl-6">
        <h5 style="text-align: center">Edit Invoice</h5>
      </div>
    </v-card-title>

    <v-container class="pa-6">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="4" sm="12" md="4">
            <h4>Customer Name</h4>
            <v-text-field
              outlined
              class="mt-2 pa-0"
              ref="customer_name"
              :rules="customerRules"
              v-model="customer_name"
            ></v-text-field>
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
        <v-btn
          dense
          color="background ml-6  pl-6 pr-6"
          elevation="4"
          @click="printScreen"
          large
          dark
          >Print</v-btn
        >
      </div>
    </v-card-actions>
  </v-card>
</template>
  
  <script>
const sorter2 = (sortBy) => (a, b) =>
  a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;

export default {
  emits: ["closeDialog"],
  props: ["editItem"],
  name: "EditInvoice",

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
    ],
    toggle: false,
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
    editItem(old, newn) {
      this.setDetails();
    },
   
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    //Filtering models based on Category
    category(val) {
      if (this.category == "Teaching") {
        this.categoryFilter = "no";
      } else if (this.category == "Non Teaching") {
        this.categoryFilter = "yes";
      } else if (this.category == "All") {
        this.categoryFilter = "All";
      }
    },
  },

 
  methods: {
    setDetails() {
      this.customer_name = this.editItem.name;
      this.customer_no = this.editItem.mobile;
      this.customer_address = this.editItem.address;
      this.tableShow = true;
      var listItems = [];
      this.totalPrice = this.editItem.total_price;
      for (var i = 0; i < this.editItem.items.length; i++) {
        listItems.push({
          productName:this.editItem.items[i]['product_name'],
          size:{
            text: this.editItem.items[i]['ordered_size'],
            value: this.editItem.items[i]['ordered_size'],
          },
          productDetail:this.editItem.items[i],
          availableSizes: 
          this.editItem.items[i].available_size.map((size) => ({
            text: size,
            value: size,
          })),
          piece:this.editItem.items[i]['order_quantity'],
          price: this.editItem.items[i]['order_price'],
          amount:this.editItem.items[i]['order_amount'],
        });
      }
      console.log(listItems);
     this.productItems = listItems;

      this.valid = true;

      this.dialog = false;
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
      console.log(item);
      if (item.size != null) {
        if (item.productDetail != {}) {
          console.log(item.size.value);
          console.log(item.productDetail.sizetype);
          if (item.productDetail.sizetype == "cm") {
            console.log("inside");
            this.productItems[index]["price"] = item.productDetail.price.find(
              (value) => {
                return value["'label'"] == item.size.value;
              }
            )["'pricePerPiece'"];
          } else {
            this.productItems[index]["price"] = item.productDetail.price.find(
              (value) => {
                return value["'label'"] == item.size.value;
              }
            )["'price'"];
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
        total +=parseInt( this.productItems[i].amount);
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

      // Open the print window
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );

      WinPrint.document.write(`<!DOCTYPE html>
  <html>
  <head>
  <style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    font-size: 12px;
    padding: 8px;
  }
  
  p {
  padding: 0px;
  margin: 3px;
  }
  .space-bewteen {
     display: flex;
     justify-content: space-between;
  }
  .customer-details-title {
  font-weight: 700;
  }
  .total-amount {
  text-align: right;
  padding-right: 20px;
  
  }
  </style>
  </head>
  <body>
  <div class="space-bewteen">
  <h2 style="color: red">Sadhana Garments</h2>
  <div>
  <p>Date : ${this.dateFormatted}</p>
  <p>Invoice No: #INVOICE1 </p>
  </div>
  </div>
  
  <div class="customer-details">
  <p><b>Name: </b>${this.customer_name}</p>
  <p><b>Mobile Number: </b>${this.customer_no}</p>
    <p class="customer-details-title">Billing Address:</p>
    
    <p>${this.customer_address}</p>
  </div>
  <br>
  <table>
    <tr>
      <th>SI.NO</th>
      <th>Product Name</th>
      <th>Size</th>
      <th>Price</th>
       <th>Piece</th>
  
         <th>Amount</th>
    </tr>
    ${content}
   
  </table>
  <h4 class="total-amount">Total Amount : Rs. ${this.totalPrice}</h4>
  <p>Erode Krishna Baniyan market<br>
  Shop no: 78
  </body>
  </html>
  
  `);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
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
      const response2 = await this.$axios
        .get(`/Product`)
        .then((res) => {
          var i = 0;
          console.log(res.data);
          for (i; i < res.data.Product_Data.length; i++) {
            this.productList.push(res.data.Product_Data[i]);
          }
          this.setDetails();
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

      this.productItems = [];

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
            order_id: this.editItem.order_id,
            customer_id: this.editItem.customer_id,
            created_date: this.editItem.created_date,
          total_price: this.totalPrice,
          customer_name: this.customer_name,
          customer_address: this.customer_address,
          customer_mobile: this.customer_no,
          items: items,
        };
        console.log(data2);
        await this.$axios

          .post("orders/edit", data2)
          .then((res) => {
            console.log(res);
            if (res.data.error) {
              console.log(res.data.messages);
              this.closeDialog("failed");
            } else {
              console.log(res.data.messages);
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
  