<template>
   <v-app>
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Admin Dashboard</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                           <v-text-field
                              
                              name="email"
                              label="Email"
                                v-model="email"
                                :rules="emailRules"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                             
                              name="password"
                              label="Password"
                                v-model="password"
                                :rules="passwordRules" 
                              type="password"
                           ></v-text-field>
                            <p class="error-text">{{error}}</p>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="submit">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
export default {
   name: 'Login',
   props: {
      
   },
   
   beforeMount()
   {
       
        var cook=this.getCookie("username");
        if(cook!=null)
                   {
                     console.log("nonempty")
                       window.location.href = "http://localhost:3000"
                     
                     
                   }

   },
   data: () => ({
   password: '',
   passwordRules: [(v) => !!v || ''],
     email: '',
    emailRules: [(v) => !!v || ''],
     valid: false,
     error:''
   }),
   methods:{
       setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
},
 getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
},
 eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
},
         async submit() {
  console.log('submitted');
  
  if (this.$refs.form.validate()) {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
  
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      const response = await fetch(
        "https://sadhanagarments2013.000webhostapp.com/public/admin/validate",
        {
          method: "POST",
          body: formData
        }
      );

      if (response.ok) {
         console.log(response);
        const responseData = await response.json();
        if (responseData.status === 201) {
          this.$refs.form.reset();
          console.log(responseData.login_data[0].countl);
          var get_countuser = responseData.login_data[0].countl;
          var get_username = responseData.login_data[0].name;
          var get_useremail = responseData.login_data[0].email;

          console.log("count  ", get_countuser);
          console.log(get_username);
          console.log(get_useremail);

          if (parseInt(get_countuser) === 1) {
            console.log("true");
            this.error = " ";
            console.log(get_username);
            this.setCookie("username", get_username, 1);
            console.log("cookie", this.getCookie("username"));
            if (this.getCookie("username") !== " ") {
              window.location.href = "http://localhost:3000";
            }
          } else {
            console.log("False");
            this.error = "Invalid Credentials";
          }
        } else {
          console.log("Error in response data:", responseData);
        }
      } else {
        console.log("Error in response:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

   }
};
</script>

<style>
.error-text{
  color:red;
}
</style>