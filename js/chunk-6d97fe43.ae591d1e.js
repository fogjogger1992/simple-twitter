(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d97fe43"],{"29a2":function(t,e,r){"use strict";r("c8a4")},"8f7b":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"pa-3",staticStyle:{"border-bottom":"thin solid rgba(0, 0, 0, 0.12)"},attrs:{flat:"",tile:""}},[r("v-row",{staticClass:"pa-0",staticStyle:{"flex-wrap":"nowrap"},attrs:{"no-gutters":""}},[r("v-col",{staticClass:"flex-grow-1"},[r("router-link",{attrs:{to:{name:"user",params:{id:t.tweet.User.id}}}},[r("v-avatar",{staticClass:"mt-1"},[r("v-img",{attrs:{src:t._f("emptyImage")(t.tweet.User.avatar),alt:t.tweet.User.name}})],1)],1)],1),r("v-col",{staticClass:"flex-shrink-1",attrs:{cols:"11"}},[r("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"tweet",params:{id:t.tweet.id}}}},[r("v-row",{staticClass:"pa-2",attrs:{"no-gutters":"",align:"center"}},[r("p",{staticClass:"subtitle-2 font-weight-bold mr-1 my-0 pa-0"},[t._v(" "+t._s(t.tweet.User.name)+" ")]),r("p",{staticClass:"subtitle-2 grey--text font-weight-regular my-0 pa-0"},[t._v(" @"+t._s(t.tweet.User.account)+" ")]),r("p",{staticClass:"subtitle-2 font-weight-regular grey--text pa-0 my-0 ml-1"},[t._v(" ‧ "+t._s(t._f("fromNow")(t.tweet.createdAt))+" ")])]),r("v-row",{staticClass:"font-weight-normal px-2",attrs:{"no-gutters":"",align:"center"}},[r("v-col",{staticClass:"ma-0 pa-0",attrs:{cols:"12"}},[r("p",{staticClass:"body-2 black--text font-weight-normal text-justify my-0"},[t._v(" "+t._s(t.tweet.description)+" ")])])],1)],1),r("v-row",{staticClass:"font-weight-normal pa-2",attrs:{"no-gutters":"",align:"center"}},[r("v-col",{staticClass:"d-flex justify-space-between mr-5",attrs:{cols:"1"}},[r("div",{staticClass:"d-flex align-center cursor-pointer",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.replyTweet.apply(null,arguments)}}},[r("v-icon",{staticStyle:{"font-size":"18px"},attrs:{color:"grey"}},[t._v("far fa-comment")]),r("p",{staticClass:"subtitle-2 font-weight-normal grey--text pa-0 my-0 ml-2"},[t._v(" "+t._s(t.tweet.replyCounts)+" ")])],1)]),r("v-col",{staticClass:"d-flex justify-space-between ml-5",attrs:{cols:"1"}},[r("div",{staticClass:"d-flex align-center",class:t.cursorStyle},[t.tweet.isLiked?r("v-icon",{staticStyle:{"font-size":"18px"},attrs:{disabled:t.currentUser.id===t.tweet.User.id,color:"red"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.deleteLike(t.tweet.id)}}},[t._v("fas fa-heart")]):r("v-icon",{staticStyle:{"font-size":"18px"},attrs:{disabled:t.currentUser.id===t.tweet.User.id,color:"grey"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.addLike(t.tweet.id)}}},[t._v("far fa-heart")]),r("p",{staticClass:"subtitle-2 grey--text pa-0 my-0 ml-2"},[t._v(" "+t._s(t.tweet.likeCounts)+" ")])],1)])],1)],1)],1)],1)},s=[],n=r("1da1"),i=r("5530"),c=(r("96cf"),r("2708")),o=r("2f62"),l=r("4cce"),u=r("2fa3"),w={name:"TweetCard",props:{initialTweet:{type:Object,required:!0}},mixins:[c["b"],c["a"]],data:function(){return{tweet:Object(i["a"])({},this.initialTweet)}},computed:Object(i["a"])({cursorStyle:function(){return this.currentUser.id===this.tweet.User.id?"cursor-normal":"cursor-pointer"}},Object(o["d"])(["currentUser"])),methods:Object(i["a"])(Object(i["a"])({replyTweet:function(){this.setTweet(this.tweet),this.setTweetReplyDialogOpen(!0)}},Object(o["c"])({setTweet:"tweets/setTweet",setTweetReplyDialogOpen:"tweets/setTweetReplyDialogOpen"})),{},{addLike:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(r.prev=0,e.tweet.User.id!==e.currentUser.id){r.next=5;break}return u["a"].fire({icon:"error",title:"無法將自己的推文加入LIKE"}),e.isLoading=!1,r.abrupt("return");case 5:return r.next=7,l["a"].addLike({tweetId:t});case 7:if(a=r.sent,s=a.data,"success"===s.status){r.next=11;break}throw new Error(s.message);case 11:e.tweet=Object(i["a"])(Object(i["a"])({},e.tweet),{},{isLiked:!0,likeCounts:e.tweet.likeCounts+1}),r.next=18;break;case 14:r.prev=14,r.t0=r["catch"](0),console.log("error",r.t0),u["a"].fire({icon:"error",title:"無法將推文加入LIKE，請稍後再試"});case 18:case"end":return r.stop()}}),r,null,[[0,14]])})))()},deleteLike:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,l["a"].deleteLike({tweetId:t});case 3:if(a=r.sent,s=a.data,"success"===s.status){r.next=7;break}throw new Error(s.message);case 7:e.tweet=Object(i["a"])(Object(i["a"])({},e.tweet),{},{isLiked:!1,likeCounts:e.tweet.likeCounts-1}),e.$emit("after-delete-like",t),r.next=15;break;case 11:r.prev=11,r.t0=r["catch"](0),console.log("error",r.t0),u["a"].fire({icon:"error",title:"無法將推文移除LIKE，請稍後再試"});case 15:case"end":return r.stop()}}),r,null,[[0,11]])})))()}})},d=w,f=(r("29a2"),r("2877")),p=r("6544"),m=r.n(p),v=r("8212"),b=r("b0af"),g=r("62ad"),h=r("132d"),k=r("adda"),x=r("0fd9"),y=Object(f["a"])(d,a,s,!1,null,null,null);e["a"]=y.exports;m()(y,{VAvatar:v["a"],VCard:b["a"],VCol:g["a"],VIcon:h["a"],VImg:k["a"],VRow:x["a"]})},b2d0:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{staticClass:"ma-0 pa-0"},t._l(t.tweets,(function(t){return r("TweetCard",{key:t.id,attrs:{"initial-tweet":t}})})),1)},s=[],n=r("1da1"),i=r("5530"),c=(r("96cf"),r("8f7b")),o=r("2f62"),l=r("4cce"),u=r("2fa3"),w={name:"UserTweets",components:{TweetCard:c["a"]},data:function(){return{tweets:[]}},computed:Object(i["a"])({},Object(o["d"])(["currentUser"])),created:function(){var t=this.$route.params.id;this.fetchTweets(t)},beforeRouteUpdate:function(t,e,r){var a=t.params.id;this.fetchTweets(a),r()},methods:{fetchTweets:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,l["a"].getUserTweets({userId:t});case 3:if(a=r.sent,s=a.data,"error"!==s.status){r.next=7;break}throw new Error(s.message);case 7:e.tweets=s,r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),u["a"].fire({icon:"error",title:"無法取得使用者推文，請稍後再試"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()}}},d=w,f=r("2877"),p=r("6544"),m=r.n(p),v=r("a523"),b=Object(f["a"])(d,a,s,!1,null,null,null);e["default"]=b.exports;m()(b,{VContainer:v["a"]})},c8a4:function(t,e,r){}}]);
//# sourceMappingURL=chunk-6d97fe43.ae591d1e.js.map