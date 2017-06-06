export default ({baseClass, store, packageInfo}) => {
  let win = null
  // add item to toolbar
  store.dispatch('toolbar/addItem', {
    name: 'debug',
    desc: 'debug webview',
    key: 'videPluginDebugWebviewItem',
    icon: 'data:image/png;base64,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',
    func: 'videPluginDebugWebview:click'
  })
  // return execute class
  return class videPluginDebugWebview extends baseClass {
    click () {
      if (win) {
        try {
          win.focus()
        } catch (e) {
          win = null
        }
      }
      if (!win) {
        window.nw.Window.open('/node_modules/vide-plugin-debug-webview/source/index.html', {width: 800, height: 700}, function (a) {
          win = a
          win.on('close', function () {
            win = null
          })
        })
      }
    }
    $clean () {
      store.dispatch('toolbar/deleteItem', 'videPluginDebugWebviewItem')
    }
  }
}
