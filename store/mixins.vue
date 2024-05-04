<!-- mixins.vue -->
<template></template>

<script>
export default {
  methods: {
    getCurrentDateTime() {
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
    printContentsIntoPrinter(content,  name, mobile, address, d, orderId, totalPrice) {
     
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
    size: A5 landscape;
    margin: 0;
  }
  body {
    margin: 20px;
    padding: 0;
    // width: 105mm; /* Half of A5 width */
    // height: 148mm; /* A5 height */
    transform: scale(0.5); /* Scale down to half */
    transform-origin: top right; /* Keep content aligned to top left */
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
  border: 1px solid #dddddd;
  text-align: left;
  font-size: 12px;
  padding: 8px;
}

p , h2{
padding: 0px;
margin: 3px;
}
// body {
//   width: 50%;
// }
.space-bewteen {
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
}
.customer-details-title {
font-weight: 700;
}
.total-amount {
text-align: right;
padding-right: 20px;

}
.heading-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.border {
  border: 1px solid black;
}
.date {
  padding-left: 20px;
  text-align: left;
}
.last-row {
  margin-top: 20px;
  width: 99%;
  display: flex;
  justify-content: space-between;
}
.last-row h4, .last-row  p {
  padding: 0px;
  margin: 0px;
}
.address {
  white-space: pre-line;
}
}
</style>
</head>
<body>
  <div class="heading-title">
 
  <p>INVOICE </p>
  </div> 
<div class="space-bewteen">
  <div class="heading-title">
    <h2 style="color: red">Sadhana Garments</h2>
    
    <p>Erode Krishna Baniyan market<br>
    Shop no: 78<br>Contact: +91 9994284722</p>
    </div>
  <div class="customer-details">

    <p class="customer-details-title">Deliver To:</p>
<p><b></b>${name}</p>
<p><b></b>${mobile}</p>
  
  
  <p class="address">${address}</p>
</div>


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
<div class="last-row">
  
<div>
  <p><b>Date :</b> ${this.getCurrentDateTime()}</p>
<p><b>Invoice No:</b> INVOICE0${orderId}</p>
  </div>
<h4 >Total Amount : Rs. ${totalPrice}</h4>
  </div>

</body>
</html>

`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
  },
};
</script>

<style></style>
