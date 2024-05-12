<!-- mixins.vue -->
<template></template>

<script>
import qrImage from '@/assets/qr.png';
export default {
  data() {
    return {
      qrImageUrl: qrImage // Assign the imported image to a variable
    };
  },
  methods: {
      getCurrentDateTime () {
      const now = new Date();
      const date = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight (0 hours)
      const formattedTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
     return date + ' ' + formattedTime;
    },
    async printContentsIntoPrinter(content,  name, mobile, address, d, orderId, totalPrice) {
      var dateTime = this.getCurrentDateTime().split(' ');
      // Open the print window
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=1200,height=1200,toolbar=0,scrollbars=0,status=0"
      );

      WinPrint.document.write(`<!DOCTYPE html>
<html>
<head>
  <title></title>
<style>
@media print {
  @page {
    size: auto;
    margin: 0;
  }
  body {
    margin: 0;
    padding: 0;
    width: 99%;
    background-color: red;
    border: 1px solid black;
  }
  hr {
    border: 1px solid black;
  }
  /* Hide page numbers and time */
  @page :first {
    /* Hide page numbers and time only on the first page */
    @bottom-right {
      content: ""; /* Empty content removes page numbers and time */
    }
  }

  @page {
    @bottom-right {
      content: none; /* Hide page numbers and time on all pages */
    }
  }

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid black;
  text-align: left;
  font-size: 14px;
  font-weight: 800;
  padding: 8px;
}

p , h2{
padding: 0px;
margin: 3px;
font-size: 18px;
  font-weight: 900;
}

.space-bewteen {
   display: flex;
   align-items: center;
   justify-content: center;
   text-align: center;
}
.customer-details {
  background-color: red;
  width: 38%;
}
.customer-details-title {
  font-size: 26px;
 
font-weight: 900;
}
.total-amount {
text-align: right;
padding-right: 20px;

}
.heading-title {
  display: flex;
  font-size: 14px;
  font-weight: 800;
  flex-direction: column;
  align-items: left;
}
.border {
  border: 1px solid black;
}
.date {
  padding-left: 20px;
  text-align: left;
}
img {
  width: 150px;
  height: 80px;
}

.last-row {
  float: right;
  padding-bottom: 50px;
}
.customer-div {
  display: flex;
  justify-content: space-between;
}
.last-row {
  padding: 0px;
  width: 100%;
  margin: 0px;
  margin-top: 8px;
  margin-bottom: 10px;
  float: right;
  padding-right: 30px;
  text-align: right;
}
.address {
  white-space: pre-line;
}
h4 {
  padding: 0;
  margin: 0;
  margin-left: 2px;
  float: left;
   font-size: 18px;
   font-weight: 800;
}
.image-container-new{
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.qrImage {
  display: flex;
  align-items: center;
  text-align: center;
  margin-left: 36%;
}
img {
  width: 100px;
  height: 100px;
}
}
</style>
</head>
<body>
  <div class="space-bewteen">
    <h4 class="customer-details-title">Sadhana Garments</h4>
   
  </div> 

  <div class="heading-title space-bewteen">
   
    
    
   <p>Erode Krishna Baniyan markets<br>
   Shop no: 78<br>Contact: +91 9994284722</p>
   </div>
  
  
<hr>

<div class="customer-div">
<div class="customer-details">

<p >Deliver To:</p>
<p><b></b>${name}</p>
${mobile !== '0' ? `<p><b></b>${mobile}</p>` : ''}


<p class="address">${address}</p>
</div>
<div>
  <p><b>Invoice No:</b> ${orderId}</p>
<p><b>Date :</b> ${dateTime[0]}</p>
<p style="padding-left: 50px;"><b> ${dateTime[1]}  ${dateTime[2]}</b></p>

  </div>
</div>
<hr>
<table>
  <tr>
    <th>SI.<br>NO</th>
    <th>Product Name</th>
    <th>Size</th>
    <th>Price</th>
     <th>Piece</th>

       <th>Amount</th>
  </tr>
  ${content}
</table>

 

<h4 class="last-row">Total Amount : Rs. ${totalPrice}</h4>
<br>
<hr>
<div class="image-container-new">
  <p>THANKS FOR COMING...</p>
  <p>SCAN QR TO VISIT OUR WEBSITE</p>
  <img class="qrImage" src="${this.qrImageUrl}" />
  <p>https://sadhanagarments2013.in</p>
  
  </div>

</body>
</html>

`);

      WinPrint.document.close();
      WinPrint.focus();
      await new Promise(r => setTimeout(r, 2000));
      WinPrint.print();
      WinPrint.close();
    },
  },
};
</script>

<style></style>
