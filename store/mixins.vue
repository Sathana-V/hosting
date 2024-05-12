<!-- mixins.vue -->
<template></template>

<script>
export default {
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
    size: A4 portrait;
    margin: 0;
  }
  body {
    border: 1px solid black;
    margin: 10px 10px;
    margin-top: 20px;
    padding: 10px;
    width: 64%; /* Half of A5 width */
    height: 69vh; /* A5 height */
    transform: scale(1); /* Scale down to half */
    transform-origin: top right; /* Keep content aligned to top left */
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
  font-size: 12px;
  padding: 8px;
}

p , h2{
padding: 0px;
margin: 3px;
}

.space-bewteen {
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
}
.customer-details {
  background-color: red;
  width: 38%;
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
img {
  width: 200px;
  height: 80px;
}
.last-row {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 99%;
}
.last-row h4, .last-row  p {
  padding: 0px;
  margin: 0px;
  float: right;
}
.address {
  white-space: pre-line;
}
}
</style>
</head>
<body>
  <div class="space-bewteen">
    <img src="https://sadhanagarments2013.in/assets/img/2.jpg" alt="image here"></img>
    <div>
  <p><b>Date :</b> ${this.getCurrentDateTime()}</p>
<p><b>Invoice No:</b> ${orderId}</p>
  </div>
  </div> 
<div class="space-bewteen">
  <div class="heading-title">
   
    
    <h2 style="color: red">Sadhana Garments</h2>
    <p>Erode Krishna Baniyan markets<br>
    Shop no: 78<br>Contact: +91 9994284722</p>
    </div>
  <div class="customer-details">

    <p class="customer-details-title">Deliver To:</p>
<p><b></b>${name}</p>
${mobile !== '0' ? `<p><b></b>${mobile}</p>` : ''}
  
  
  <p class="address">${address}</p>
</div>


</div>

<hr>
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
<hr>

<h4 >Total Amount : Rs. ${totalPrice}</h4>
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
