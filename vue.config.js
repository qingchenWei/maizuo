module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      /* /kerwin/ajax/comingList  ====> /ajax/comingList  */
      '/gateway': {
        target: 'https://m.maizuo.com',
        changeOrigin: true
      }
    }

  },
  lintOnSave: false // 关了eslint 检查
}
