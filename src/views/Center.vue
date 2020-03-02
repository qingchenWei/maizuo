<template>
  <div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-index-bar>
      <van-index-anchor index="A"/>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="B"/>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>
<script>
import vue from 'vue'
import { Button, IndexBar, IndexAnchor } from 'vant'
vue.use(Button)
vue.use(IndexBar)
vue.use(IndexAnchor)

export default {}
</script>
