# finance

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### 正式打包
```
yarn build:prod
```

### 测试打包
```
yarn build:test
```

### 同时打包
```
yarn build:all
```

### 一些配置
```
VUE_APP_API_URL      请求接口域名
@/assets/iconfont    字体图标
@/assets/images      静态图片
@/assets/scss        通用样式
@/components         通用组件
@/plugins/element    element-ui组件
@/utils/request      封装的axios
@/utils/validate     element消息弹窗二次封装
@/api/               接口管理
@/store/             vuex仓库
state.tokenName      令牌名，本地cookie最好使用同一字段
...注意看注释
```