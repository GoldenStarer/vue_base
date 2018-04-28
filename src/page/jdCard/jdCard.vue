<template>
  <div class="container">
    <img class="bg" src="static/img/bg.jpg"/>
		<div id="picContainer" class="picContainer">
			<div v-for="(item,i) in list" :key="i" class="picDiv" @click="getCoupon({uuid}, item.url, item.coupon, item.record)">  
				<img class="pic" :src="item.record == 1?'static/img/has.png':'static/img/get.png'">
				<div :class="item.record == 1?'title2':'title1'">{{item.title}}</div>
				<div class="txt">{{item.txt}}</div>
			</div>
    </div>
	</div>
</template>

<script>
import { getJDData } from "src/service/getData";
export default {
  data() {
    return {
      list: null,
      uuid: null,
      imgBaseUrl
    };
  },
  mounted() {
    let ret = this.$route.query.ret;
    let coupon = this.$route.query.coupon;
    let uuid = this.$route.query.uuid;
    let retmsg = this.$route.query.retmsg;
    let flag = this.$route.query.flag
    if (coupon) {
      if (ret == 0) {
        alert("领取成功");
      } else if (ret == 3) {
        alert("操作频繁");
      } else if (ret == 4) {
        alert("已经领取");
      } else if (ret == 6) {
        alert("已经领完");
      } else if (ret == 7) {
        alert("您已经领取");
      } else if (ret == 10) {
        alert("已过发放时间");
      } else if (ret == 11) {
        alert("未到发放时间");
      } else if (ret == 147) {
        alert("非常抱歉，未抢到");
      } else {
        alert("操作非法");
      }
      addRecord(uuid, flag, coupon, ret, retmsg);
    } else {
      this.initData();
    }
  },
  components: {},
  computed: {},
  methods: {
    async addRecord(uuid, flag, coupon, ret, msg) {
      await addJDRecord(uuid, flag, coupon, ret, msg);
      this.initData();
    },
    //初始化信息
    async initData() {
      let uuid = this.$route.query.uuid;
      let flag = this.$route.query.flag
        ? this.$route.query.flag
        : "JDCoupon_Card";
      this.uuid = uuid;
      console.log("uuid", uuid);
      if (!uuid) {
        alert("非法访问");
        return;
      }
      let arr = await getJDData(uuid, flag);
      arr = [
        {
          coupon: "BA_szov0t",
          desc: "京东5元券",
          url:
            "http://wq.jd.com/activeapi/opensendcouponapi?biz=zabxzs&cert=TGpPrNYt%2FWqwVrKOy4RGqSoLjfZwvvsMdlglje0XWZsnEn39X370uz2GCMF7a%2F2PXFeyXWCHP6IThswT%2BXRkcg%3D%3D&returl=https%3A%2F%2Fcdn-qcloud.zhongan.com%2Fa00000%2Fh5-jdCard%2Findex.html%3Ffrom%3Dza",
          record: 1
        },
        {
          coupon: "BA_smhozt",
          desc: "京东10元券",
          url:
            "http://wq.jd.com/activeapi/opensendcouponapi?biz=zabxzs&cert=qmggpdbA2qpNUGol5K2N%2FGo4BttO2uikowU0LJ4HjwaWuYoFD2ln23nmq56EIWC4TMHRsfm3AfF1iIn1Kqjdlg%3D%3D&returl=https%3A%2F%2Fcdn-qcloud.zhongan.com%2Fa00000%2Fh5-jdCard%2Findex.html%3Ffrom%3Dza",
          record: 1
        },
        {
          coupon: "BA_spz60p",
          desc: "京东15元券",
          url:
            "http://wq.jd.com/activeapi/opensendcouponapi?biz=zabxzs&cert=ynfdz5SnhUJOoCq%2FAf9%2FvVIUGQ01ykyrO4QDhHEgYwQ5dNnpYbcH08Mgkou9%2B2E9xOLPh6zQvpFYJ5%2FDBECcRw%3D%3D&returl=https%3A%2F%2Fcdn-qcloud.zhongan.com%2Fa00000%2Fh5-jdCard%2Findex.html%3Ffrom%3Dza",
          record: 0
        },
        {
          coupon: "BA_zsmhpb",
          desc: "京东20元券",
          url:
            "http://wq.jd.com/activeapi/opensendcouponapi?biz=zabxzs&cert=0XnMh2ZD%2Fd3tRRPFCFQFHyja%2BNMBEAK%2BCCEjWenQ0RU%2BtHWmwaEMJmkuUkX0BAVjS64seBlqzlbxnVAiTS8GJw%3D%3D&returl=https%3A%2F%2Fcdn-qcloud.zhongan.com%2Fa00000%2Fh5-jdCard%2Findex.html%3Ffrom%3Dza",
          record: 1
        }
      ];
      console.log(arr);
      this.list = sortData(arr);
    },
    getCoupon(uuid, newUrl, coupon, record) {
      if (record != 1) {
        //location.href = location.origin + location.pathname + '?uuid=' + uuid + '&coupon=' + $(this).attr("coupon")+'&ret=0'
        //return;
        var url =
          newUrl + encodeURIComponent("&uuid=" + uuid + "&coupon=" + coupon);
        console.log(url);
        return;
        location.href = url;
        return;
      }
      location.href = "https://wq.jd.com/wxportal/index_v6?ptag=17036.100.1";
    }
  }
};

function sortData(arr) {
  if (!arr) {
    alert("数据异常");
    return;
  } else {
    if (!arr.length || arr.length != 4) {
      alert("网络异常");
    }
  }
  for (var j = 0; j < arr.length; j++) {
    if (arr[j].desc === "京东5元券") {
      arr[j].title = "5元抵用券";
      arr[j].txt = "满105可使用，全场券不限品类";
    } else if (arr[j].desc === "京东10元券") {
      arr[j].title = "10元抵用券";
      arr[j].txt = "满199可使用，全场券不限品类";
    } else if (arr[j].desc === "京东15元券") {
      arr[j].title = "15元抵用券";
      arr[j].txt = "满299可使用，全场券不限品类";
    } else if (arr[j].desc === "京东20元券") {
      arr[j].title = "20元抵用券";
      arr[j].txt = "满399可使用，全场券不限品类";
    }
  }
  return arr;
}

function setCookie(key, value, minutes) {
  // 设置过期原则
  if (!value) {
    localStorage.removeItem(key);
  } else {
    var Days = minutes || 24 * 60 * 7; // 默认保留7天
    var exp = new Date();
    localStorage[key] = JSON.stringify({
      value,
      expires: exp.getTime() + Days * 60 * 1000
    });
  }
}

function getCookie(name) {
  try {
    if (!localStorage[name]) {
      return null;
    }
    var o = JSON.parse(localStorage[name]);
    if (!o || o.expires < Date.now()) {
      return null;
    } else {
      return o.value;
    }
  } catch (e) {
    // 兼容其他localstorage
    console.log(e);
    return localStorage[name];
  } finally {
  }
}
</script>
  
<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
}
.left {
  position: absolute;
  left: 1rem;
  top: 1.4rem;
  min-width: 5rem;
  z-index: 999;
}
.right {
  position: absolute;
  right: 1rem;
  top: 1.4rem;
  min-width: 4.2rem;
  z-index: 999;
}

.bg {
  display: block;
  width: 100%;
}

.container .picContainer {
  position: absolute;
  top: 16%;
  left: 5%;
  width: 89.0667%;
}

.container .picContainer .picDiv {
  position: relative;
  width: 100%;
  height: 12%;
}

.container .picContainer .picDiv .title1 {
  position: absolute;
  width: 100%;
  left: 8%;
  top: 19%;
  font-size: 1.4rem;
  color: #dea93c;
}

.container .picContainer .picDiv .title2 {
  position: absolute;
  width: 100%;
  left: 8%;
  top: 19%;
  font-size: 1.4rem;
  color: #d13d2e;
  opacity: 0.8;
}

.container .picContainer .picDiv .txt {
  position: absolute;
  left: 8%;
  bottom: 20%;
  font-size: 0.7rem;
  color: #000;
  opacity: 0.4;
}

.container .pic {
  width: 100%;
}
</style>
