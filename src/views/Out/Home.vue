<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<div class="logo"><img :src="moyunLogo2" @click="$router.push('/')"/></div>
			<div class="header-right">
				<div class="header-right-l">

				</div>
				<div class="header-right-r">
					<!-- <img :src="adminAvatar"/> -->
					<span class="company-name">{{companyName}}</span>
					<el-dropdown trigger="click">
						<span class="el-dropdown-link">{{adminName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
						<el-dropdown-menu slot="dropdown" style="padding: 0;">
							<el-dropdown-item @click.native="out" style="padding: 0 25px; text-align: center">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
		</el-col>
		<el-col :span="24" class="main">
			<aside class="menu-expanded">
				<!--导航菜单-->
				<el-menu :default-active="defaultActive" class="el-menu-vertical-demo" unique-opened router background-color="#0B1549" text-color="#ccc" active-text-color="#3F65FF">
					<template v-for="(item,index) in routers" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.meta.hidden" style="padding-left:62px!important">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section class="content-container scroll-y-style">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
    import { mapState } from 'vuex'
	export default {
		data() {
			return {
				routers: []		//路由数组
			}
		},
		methods: {
			// 退出登录
			out() {
				this.$store.dispatch('logOut')
			},
		},
		computed: {
			...mapState(['platformName', 'companyName', 'adminName', 'adminAvatar', 'moyunLogo2']),
			defaultActive() {
				if(this.$route.meta.hidden) {
					return this.$route.meta.defaultActive
				} else {
					return this.$route.path
				}
			}
		},
		created() {
			this.$router.options.routes.map(item => {
				if(!item.hidden && item.meta.type == 'out') {
					this.routers.push(item)
				}
			})
		}
	}

</script>

<style scoped lang="scss">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 80px;
			line-height: 80px;
			background: #fff;
			//color:#fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.logo {
				width: 240px;
				box-sizing: border-box;
				height:80px;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					width: 165px;
					height: 40px;
					cursor: pointer;
				}
			}
			.logo-collapse-width{
				width:60px
			}
			.header-right {
				padding-right: 35px;
				padding-left: 35px;
				box-sizing: border-box;
				width: calc(100% - 240px);
				display: flex;
				justify-content: space-between;
				align-items: center;
				.header-right-l {
					display: flex;
					align-items: center;
				}
				.header-right-r {
					.company-name {
						font-size: 16px;
						color: #333;
						margin-right: 20px;
					}
					img {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						margin-right: 20px;
						margin-top: -6px;
						background-color: #333;
					}
					/deep/ .el-dropdown {
						color: #333;
						font-size: 16px;
						cursor: pointer;
					}
				}
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 80px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 240px;
				width: 240px;
				.el-menu{
					height: 100%;
					border-right: none;
					//padding-top: 20px;
					/deep/ .el-submenu__icon-arrow {
						font-size: 20px;
						margin-top: -10px;
						//color: #fff;
					}
					/deep/ .el-submenu__title {
						font-size: 16px;
						font-weight: bold;
						padding-left: 35px !important;
						i {
							color: #fff;
						}
						i:first-child {
							font-size: 20px;
							//color: #fff;
							margin-top: -3px;
							margin-right: 5px;
							font-weight: normal;
						}
					}
					/deep/ .el-menu-item {
						font-size: 16px;
						font-weight: bold;
						padding-left: 35px !important;
						i {
							color: #fff;
						}
						i:first-child {
							font-size: 20px;
							//color: #fff;
							margin-top: -3px;
							font-weight: normal;
							margin-right: 5px;
						}
					}
					/deep/ .el-menu-item.is-active {
						i:first-child {
							color: $color;
						}
					}
					/deep/ .el-submenu .el-menu-item {
						font-size: 15px;
						font-weight: bold;
					}
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 240px;
				width: 240px;
			}
			.content-container {
				background: #F7F7F7;
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
				}
				.content-wrapper {
					// background-color: #fff;
					box-sizing: border-box;
					// border-radius: 5px;
					// padding: 40px 30px;
					margin-top: 20px;
				}
			}
		}
	}
	/deep/ .el-dropdown-menu__item {
		padding: 0 20px !important;
	}
	.wuye-name {
		font-size: 20px;
		font-weight: bold;
		padding-left: 20px;
	}
	.menu-icon {
		font-size: 24px !important;
		line-height: 23px;
	}
</style>