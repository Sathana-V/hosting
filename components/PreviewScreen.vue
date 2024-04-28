<template>
  <v-card>
    <v-container id="print">
      <v-row class="pa-6 d-flex justify-space-between">
        <div class="image-container">
          <v-img
            class="image-content"
            :src="require('@/assets/sadhana_logo.png')"
          >
          </v-img>
        </div>
        <div>
          <p>
            Date :
            <br />
            Invoice N0:
          </p>
        </div>
      </v-row>
    </v-container>
    <v-card-actions class="d-flex align-lg-content-end flex-column">
      <div>
        <v-btn
          class="white pa-4 black--text"
          dense
          elevation="4"
          large
          @click="closePrintDialog"
          >Cancel</v-btn
        >
        <v-btn
          dense
          color="background ml-6  pl-6 pr-6"
          elevation="4"
          @click="printScreen"
          large
          dark
          >Save</v-btn
        >
      </div>
    </v-card-actions>
  </v-card>
</template>
  
  <script>
export default {
  emits: ["closePrintDialog"],
  name: "PreviewAndPrintInvoice",
  props: ["customerPurchaseDetail"],
  mounted() {},

  computed: {
    fontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "3em";
        default:
          return "5em";
      }
    },

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
  },
  methods: {
    printScreen() {
      const prtHtml = document.getElementById("print").innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = "";
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style'),
      ]) {
        stylesHtml += node.outerHTML;
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

    ${stylesHtml}
  </head>
  <body>
    <img src="https://sadhanagarments2013.in/assets/img/2.jpg">
    ${prtHtml}
  </body>
</html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
  },
};
</script>
  
  <style scoped>
.image-container {
  width: 200px;

  position: relative;
}

.image-content {
  width: 100%;
  height: 100%;
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
  