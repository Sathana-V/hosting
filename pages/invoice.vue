<template>
  <v-content class="highlight ma-2 mt-4">
    <div class="datatable mt-4">
      <v-card>
        <v-row>
          <v-col lg="4" sm="4" md="4" cols="12">
            <v-text-field
              class="ml-4 pa-4"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="products"
          :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Invoices</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" persistent max-width="1200px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="warning" dark v-bind="attrs" v-on="on">
                    Add Invoice
                  </v-btn>
                </template>

                <AddInvoice @clicked="closeDialog" />
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:item.OrderId> #INVOICE{{ item.order_id }} </template>

          <template v-slot:item.Action="{ item }">
            <v-icon color="primary" @click="editItem(item)">mdi-pencil</v-icon>

            <v-icon color="green" @click="printItem(item)">mdi-printer</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <v-dialog v-model="editDialog" persistent max-width="1200px">
      <EditInvoice :editItem="edit" @clicked="editDialogClose" />
    </v-dialog>

    <v-snackbar v-model="success" :timeout="timeout">
      {{ success_message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="success = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="delete_confirmation" width="400">
      <v-card>
        <v-card-title class="text-subheading-1 background white--text" dark>
          Are you sure do you need to delete ?
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="green" text @click="deleteNow"> Yes </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="delete_confirmation = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
 import Mixins from "@/store/mixins.vue";

export default {
  mixins: [Mixins],
  layout: "dashboard",
  beforeMount() {
    var cook = this.getCookie("username");
    if (cook == null) {
      console.log("empty");
      window.location.href = "https://sadhanagarments-admin.netlify.app/loginform";
    }
  },
  mounted() {
    this.details();
  },

  data: (vm) => ({
    dialog: false,
    editDialog: false,
    delete_confirmation: false,
    delete_item: null,
    search: "",
    icon: "",
    timeout: 2000,
    success_message: "",
    currentTime: "",
    colorsList: [],
    success: false,
    edit: null,

    headers: [
      { text: "OrderId", value: "order_id", width: 100 },
      { text: "Customer Name", value: "name", width: 200 },
      { text: "Mobile", value: "mobile", width: 100 },
      { text: "Address", value: "address", width: 300 },
      { text: "Prices", value: "total_price", width: 50 },
      { text: "Created On", value: "created_date", width: 160 },
      { text: "Edited On", value: "edited_date", width: 160 },
      { text: "Action", value: "Action", sortable: false },
    ],
    products: [],
  }),

  methods: {
    getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    printItem(item) {
     
      console.log(item);
      var content = "";
      for (let i = 0; i < item.items.length; i++) {
        content += `<tr>
        <td>${i + 1}</td>
        <td>${item.items[i].product_name}</td>
        <td>${item.items[i].ordered_size}</td>
        <td>${item.items[i].order_quantity}</td>
        <td>${item.items[i].order_price}</td>
        <td>${item.items[i].order_amount}</td>
        </tr>`;
      }
      this.printContentsIntoPrinter(
        content,
        item.name,
        item.mobile,
        item.address,
        item.created_date,
        item.order_id,
        item.total_price
      );
    },
    // functions for displaying snackbars when edited
    editDialogClose(status) {
      this.editDialog = false;
      if (status == "success") {
        this.success = true;
        this.success_message = "product Updated successfully";
      } else if (status == "failed") {
        this.success = true;
        this.success_message = "Something went wrong can't Update";
      }
      this.details();
    },
    // functions for displaying snackbars when added
    closeDialog(status) {
      this.dialog = false;
      if (status == "success") {
        this.success = true;
        this.success_message = "product Added Successfully";
      } else if (status == "failed") {
        this.success = true;
        this.success_message = "Something went wrong product not added";
      }
      this.details();
    },
    //invoking dialog box for ensuring deletion
    deleteConfirm(item) {
      this.delete_confirmation = true;
      this.delete_item = item;
    },
    //fucntion for deleting record from table(ui)
    async deleteNow() {
      var e = this.delete_item;
      this.delete_confirmation = false;
      const response = await this.$axios.post("product/update/" + e.product_id, {
        operation: "Delete",
      });

      if (response.status && response.data.status === 201) {
        this.success = true;
        this.success_message = "Deleted Successfully";
        this.details();
      } else {
        this.success = true;
        this.success_message = "Something Went wrong try again";
        this.details();
      }
    },
    //fucntion for Publishing record
    async publishNow(e) {
      const response = await this.$axios.post("product/update/" + e.product_id, {
        operation: "Publish",
      });
      console.log(response);
      if (response.status && response.data.status === 201) {
        this.success = true;
        this.success_message = "Published Successfully";
        this.details();
      } else {
        this.success = true;
        this.success_message = "Something Went wrong try again";
        this.details();
      }
    },
    async unpublishNow(e) {
      const response = await this.$axios.post("product/update/" + e.product_id, {
        operation: "unPublish",
      });
      console.log(response);
      if (response.status && response.data.status === 201) {
        this.success = true;
        this.success_message = "Published Successfully";
        this.details();
      } else {
        this.success = true;
        this.success_message = "Something Went wrong try again";
        this.details();
      }
    },
    // set edit dialog box to true
    editItem(item) {
      console.log("edit", item);
      this.edit = item;
      this.editDialog = true;
      this.currentTime = new Date();
    },
    getColor(item) {
      const testJSON = JSON.parse(JSON.stringify(item));
      console.log(testJSON);
      return testJSON;
    },
    // function to fetch records from database
    async details() {
      await this.$axios
        .get("/getOrders")
        .then((res) => {
          this.products = res.data.order_details.reverse();
          console.log(this.products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
