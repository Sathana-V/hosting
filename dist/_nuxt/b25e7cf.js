(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{491:function(t,e,n){var content=n(492);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("fafb42b2",content,!0,{sourceMap:!1})},492:function(t,e,n){var o=n(21)((function(i){return i[1]}));o.push([t.i,".v-main{display:flex;flex:1 0 auto;max-width:100%;transition:.2s cubic-bezier(.4,0,.2,1)}.v-main:not([data-booted=true]){transition:none!important}.v-main__wrap{flex:1 1 auto;max-width:100%;position:relative}@-moz-document url-prefix(){@media print{.v-main{display:block}}}",""]),o.locals={},t.exports=o},528:function(t,e,n){"use strict";n(491);var o=n(140).a.extend({name:"v-main",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,e=t.bar,n=t.top,o=t.right,footer=t.footer,r=t.insetFooter,c=t.bottom,l=t.left;return{paddingTop:"".concat(n+e,"px"),paddingRight:"".concat(o,"px"),paddingBottom:"".concat(footer+r+c,"px"),paddingLeft:"".concat(l,"px")}}},render:function(t){var data={staticClass:"v-main",style:this.styles,ref:"main"};return t(this.tag,data,[t("div",{staticClass:"v-main__wrap"},this.$slots.default)])}}),r=n(7);e.a=o.extend({name:"v-main",created:function(){Object(r.d)("v-content","v-main",this)},render:function(t){var e=o.options.render.call(this,t);return e.data.staticClass+=" v-content",e.children[0].data.staticClass+=" v-content__wrap",t(e.tag,e.data,e.children)}})},564:function(t,e,n){"use strict";var o=n(28),r=n(98),c=n(52),l=n(57),d=n(115);o&&(d(Array.prototype,"lastItem",{configurable:!0,get:function(){var t=c(this),e=l(t);return 0===e?void 0:t[e-1]},set:function(t){var e=c(this),n=l(e);return e[0===n?0:n-1]=t}}),r("lastItem"))},596:function(t,e,n){var content=n(677);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("dfae885a",content,!0,{sourceMap:!1})},676:function(t,e,n){"use strict";n(596)},677:function(t,e,n){var o=n(21)((function(i){return i[1]}));o.push([t.i,'.v-application a{color:#fff;-webkit-text-decoration:none;text-decoration:none}.default{background-color:"#A52A2A";color:"#A52A2A"}.datatable .v-input__slot{width:100%}.v-slide-group__prev{margin-right:10px;min-width:10px}.v-slide-group__next{margin-left:10px;min-width:10px}.v-slide-group__next .v-icon.v-icon,.v-slide-group__prev .v-icon.v-icon{background-color:#d3d3d3;border-radius:20px;color:#fff;font-size:35px}h3{margin-left:6%}.v-application .ma-9{color:#fff;font-size:30px;margin:36px!important;text-align:center}',""]),o.locals={},t.exports=o},692:function(t,e,n){"use strict";n.r(e);var o=n(208),r=n(242),c=n(576),l=n(469),d=n(563),m=n(528),f=n(686),v=n(685),h=n(455),_=n(205),x=n(577),w=n(465),y=n(55),C=n(137),k=(n(27),n(219),n(32)),O=n(2),j=(n(84),{layout:"dashboard",beforeMount:function(){null==this.getCookie("username")&&(console.log("empty"),window.location.href="https://sadhanagarments-admin.netlify.app/loginform")},mounted:function(){this.details()},data:function(t){var e;return e={dialog:!1,editDialog:!1,delete_confirmation:!1,delete_item:null},Object(O.a)(e,"delete_confirmation",!1),Object(O.a)(e,"delete_item",null),Object(O.a)(e,"search",""),Object(O.a)(e,"productCount",""),Object(O.a)(e,"icon",""),Object(O.a)(e,"timeout",2e3),Object(O.a)(e,"success_message",""),Object(O.a)(e,"currentTime",""),Object(O.a)(e,"success",!1),Object(O.a)(e,"edit",null),Object(O.a)(e,"headers",[{text:"SI.No",value:"model_id"},{text:"Model Name",value:"model_name"},{text:"Action",value:"Action"}]),Object(O.a)(e,"models",[]),e},methods:{setCookie:function(t,e,n){var o="";if(n){var r=new Date;r.setTime(r.getTime()+24*n*60*60*1e3),o="; expires="+r.toUTCString()}document.cookie=t+"="+(e||"")+o+"; path=/"},getCookie:function(t){for(var e=t+"=",n=document.cookie.split(";"),i=0;i<n.length;i++){for(var o=n[i];" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(e))return o.substring(e.length,o.length)}return null},eraseCookie:function(t){document.cookie=t+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"},editDialogClose:function(t){this.dialog=!1,"success"==t?(console.log("p succeess"),this.success=!0,this.success_message="Circular Updated successfully"):"failed"==t&&(console.log("p fail"),this.success=!0,this.success_message="Something went wrong can't Update"),this.details(),console.log(this.dialog)},closeDialog:function(t){this.dialog=!1,"success"==t?(console.log("p succeess"),this.success=!0,this.success_message="Circular Added Successfully"):"failed"==t&&(console.log("p fail"),this.success=!0,this.success_message="Something went wrong circular not added"),console.log(this.dialog),this.details()},deleteConfirm:function(t){this.delete_confirmation=!0,this.delete_item=t},deleteNow:function(){var t=this;return Object(k.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.delete_item,t.delete_confirmation=!1,e.next=4,t.$axios.post("models/update/"+n.model_id,{operation:"Delete"});case 4:o=e.sent,console.log(o),o.status&&201===o.data.status?(t.success=!0,t.success_message="Deleted Successfully",t.details()):(t.success=!0,t.success_message="Something Went wrong try again",t.details());case 7:case"end":return e.stop()}}),e)})))()},publishNow:function(t){var e=this;return Object(k.a)(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.put("Circular/"+t.id,{operation:"Publish"});case 2:(o=n.sent).status&&201===o.data.status?(e.success=!0,e.success_message="Published Successfully",e.details()):(e.success=!0,e.success_message="Something Went wrong try again",e.details());case 4:case"end":return n.stop()}}),n)})))()},editItem:function(t){this.edit=t,this.editDialog=!0,this.currentTime=new Date},details:function(){var t=this;return Object(k.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/models").then((function(e){console.log("guyioui",e),t.models=e.data.Model_Data})).catch((function(t){console.log(t)}));case 2:return e.next=4,t.$axios.get("/product/count");case 4:n=e.sent,console.log(n.data.ProductCount[0]),t.productCount=n.data.ProductCount[0];case 7:case"end":return e.stop()}}),e)})))()}},components:{AddModel:n(602).default}}),A=(n(676),n(64)),component=Object(A.a)(j,(function(){var t=this,e=t._self._c;return e(m.a,{staticClass:"highlight ma-2 mt-4"},[e("div",{staticClass:"datatable mt-4"},[e(x.a,[e(c.a,{staticClass:"ml-8"},[e(d.a,{attrs:{lg:"12",sm:"12",md:"12",xs:"12"}},[e(x.a,[e(d.a,{attrs:{lg:"4",sm:"12",md:"12",xs:"12"}},[e("h3",[t._v("Total Products")]),t._v(" "),e(o.a,{staticClass:"ma-9",attrs:{color:"primary avatar",size:"100"}},[t._v(t._s(t.productCount))])],1),t._v(" "),e(d.a,{attrs:{lg:"8",sm:"12",md:"12",xs:"12"}},[e(f.a,{staticClass:"ma-7",attrs:{"loading-text":"Loading... Please wait",headers:t.headers,items:t.models,search:t.search},scopedSlots:t._u([{key:"top",fn:function(){return[e(y.a,{attrs:{flat:""}},[e(C.a,[t._v("Models")]),t._v(" "),e(h.a,{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t._v(" "),e(w.a),t._v(" "),e(v.a,{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(n){var o=n.on,c=n.attrs;return[e(r.a,t._g(t._b({attrs:{color:"warning",dark:""}},"v-btn",c,!1),o),[t._v("\n         Add\n       ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),e("AddModel",{attrs:{currentIns:t.currentTime},on:{clicked:t.editDialogClose}})],1)],1)]},proxy:!0},{key:"item.Action",fn:function(n){var o=n.item;return["active"==o.model_status?e(_.a,{attrs:{color:"red"},on:{click:function(e){return t.deleteConfirm(o)}}},[t._v("mdi-delete")]):t._e(),t._v(" "),"Deleted"==o.model_status?e("p",[t._v("unactive")]):t._e()]}}])})],1)],1)],1)],1)],1)],1),t._v(" "),e(v.a,{attrs:{width:"400"},model:{value:t.delete_confirmation,callback:function(e){t.delete_confirmation=e},expression:"delete_confirmation"}},[e(c.a,[e(l.c,{staticClass:"text-subheading-1 background white--text",attrs:{dark:""}},[t._v("\n       Are you sure do you need to delete ?\n       ")]),t._v(" "),e(h.a),t._v(" "),e(l.a,[e(r.a,{attrs:{color:"green",text:""},on:{click:t.deleteNow}},[t._v("\n           Yes\n         ")]),t._v(" "),e(w.a),t._v(" "),e(r.a,{attrs:{color:"primary",text:""},on:{click:function(e){t.delete_confirmation=!1}}},[t._v("\n          No\n         ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{AddModel:n(602).default})}}]);