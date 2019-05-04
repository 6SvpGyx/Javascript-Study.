<template>
	<div id="index">
		<div class="index-top">
			<div class="my-money">
				<h3 class="money-title">我的资产</h3>
				<div class="money-num">{{indexInfo.Balance}}</div>
				<div class="income">
					<span class="total-income">累计收入
						<span class="income-class">{{indexInfo.TotalReward}}  元</span>
					</span>
					<span class="today-income">今日收入
						<span class="income-class">{{indexInfo.TodayReward}}  元</span>
					</span>
				</div>
				<a
				href="javascript:;"
				class="put-money"
				@click="goPutMoney"
				>
					<div class="put-ico iconfont icon-tixian1"></div>
					<span class="put-text">提现</span>
				</a>
			</div>
			<a
			@click="goDemo"
			class="make-money play-money"
			>
				<div class="title">试玩赚钱</div>
				<div class="sub-title">下载应用领奖励</div>
				<div class="play-money-jpg"></div>
			</a>
			<a
			class="make-money apprentice-money"
			@click="goApprentice"
			>
				<div class="title">收徒赚钱</div>
				<div class="sub-title">收徒可得 30 元</div>
				<div class="apprentice-money-jpg"></div>
			</a>
		</div>
		<div class="index-bottom">
			<a
			@click="goMy"
			 href="javascript:;"
			 class="index-bottom-list"
			 >
				<div class="more-info">
					<div class="info-title">
						<div class="title">个人中心</div>
						<div class="sub-title">安全与信息绑定</div>
					</div>
					<div class="iconfont icon-gerenzhongxin-xuanzhong"></div>
				</div>
			</a>
			<a href="https://static.meiqia.com/dist/standalone.html?_=t&eid=127973" class="index-bottom-list">
				<div class="more-info">
					<div class="info-title">
						<div class="title">联系客服</div>
						<div class="sub-title">有问题请联系我</div>
					</div>
					<div class="iconfont icon-kefu"></div>
				</div>
			</a>
		</div>

		<DowndAssiatantMask v-if="this.$store.state.downloadMaskIsShow"></DowndAssiatantMask>
		<openAssistantTip v-show="this.$store.state.openAssistantTip"></openAssistantTip>
	</div>
</template>

<script>
//打开助手
import openAssistantTip from "../../components/openAssiatanTip/openAssiatanTip.vue";
//遮罩层
import DowndAssiatantMask from "../../components/mask/mask.vue";

export default {
  components: { DowndAssiatantMask, openAssistantTip },
  data() {
    return {
      indexInfo: {
				Balance:0.00,
				TodayReward:0.00,
				TotalReward:0.00,
				isInside:0,//默认未打开
			},
			
    };
  },
  async created() {
	  //判断浏览器
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
      this.$router.push({ name: "Start" });
    } else {
      let { data } = await this.$api.getIndexInfo()
		this.indexInfo = data.Payload;
		this.isInside = data.Payload.IsInside
    }
  },
  methods: {
		//提现
		goPutMoney(){
			//不在应用内,IsInside=1,用户已经下载过助手
			if ( this.$store.state.inside ){
				this.$router.push({name:'My'})
			}else {
				if ( this.isInside == 1 ){
					this.tipShow()
				}else {
					this.$router.push({name:'My'})
				}
			}
		},
		//试玩赚钱页面
		goDemo(){
			//不在应用内,IsInside=1,用户已经下载过助手
			if ( this.$store.state.inside ){
				this.$router.push({name:'Demo'})
			}else {
				if ( this.isInside == 1 ){
					this.tipShow()
				}else {
					this.$router.push({name:'LitTaskList'})
				}
			}
		},
		//收徒赚钱
		goApprentice(){
			//不在应用内,IsInside=1,用户已经下载过助手
			if ( this.$store.state.inside ){
				this.$router.push({name:'Apprentice'})
			}else {
				if ( this.isInside == 1 ){
					this.tipShow()
				}else {
					this.$router.push({name:'Apprentice'})
				}
			}
		},
		//个人中心
		goMy(){
			//不在应用内,IsInside=1,用户已经下载过助手
			if ( this.$store.state.inside ){
				this.$router.push({name:'My'})
			}else {
				if ( this.isInside == 1 ){
					this.tipShow()
				}else {
					this.$router.push({name:'My'})
				}
			}
		},
		//是否打开助手
		isOpenAssiatant(){
		},
    //下载助手
    async downloadAssiatant() {
      this.$router.push({ name: "DownloadAssistant" });
		},
		//打开助手弹窗显示
		tipShow(){
			this.$store.state.downloadMaskIsShow = true;
				this.$store.state.openAssistantTip = true;
		}
  }
};
//获取首页信息
</script>