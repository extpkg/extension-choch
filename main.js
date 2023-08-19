// CHOCH EXT extension

// Global resources
let created = false
let tab = null
let window = null
let webview = null

// Extension clicked
ext.runtime.onExtensionClick.addListener(async () => {
  try {

    // Check if window already exists
    if (created && window !== null) {
      await ext.windows.restore(window.id)
      await ext.windows.focus(window.id)
      return
    }

    // Create tab
    tab = await ext.tabs.create({
      icon: 'icon-128.png',
      text: 'CHOCH',
      muted: false,
      mutable: true,
      closable: true,
    })

    // Create window
    window = await ext.windows.create({
      title: 'CHOCH',
      icon: 'icon-128.png',
      titleBarStyle: 'default',
      fullscreenable: true,
      vibrancy: false,
      frame: true,
    })

    // Create webview
    webview = await ext.webviews.create()
    const size = await ext.windows.getContentSize(window.id)
    await ext.webviews.loadFile(webview.id, 'index.html')
    await ext.webviews.attach(webview.id, window.id)
    await ext.webviews.setBounds(webview.id, { x: 0, y: 0, width: size.width, height: size.height })
    await ext.webviews.setAutoResize(webview.id, { width: true, height: true })

    // Mark window as created
    created = true

  } catch (error) {

    // Print error
    console.error('ext.runtime.onExtensionClick', JSON.stringify(error))

  }
})

// Tab was removed by another extension
ext.tabs.onRemoved.addListener(async (event) => {
  try {

    // Remove objects
    if (event.id === tab?.id) {
      if (window !== null) await ext.windows?.remove(window.id)
      if (webview !== null) await ext.webviews?.remove(webview.id)
      tab = window = webview = null
    }

  } catch (error) {

    // Print error
    console.error('ext.tabs.onRemoved', JSON.stringify(error))

  }
})

// Tab was clicked
ext.tabs.onClicked.addListener(async (event) => {
  try {

    // Restore & Focus window
    if (event.id === tab?.id && window !== null) {
      await ext.windows.restore(window.id)
      await ext.windows.focus(window.id)
    }

  } catch (error) {

    // Print error
    console.error('ext.tabs.onClicked', JSON.stringify(error))

  }
})

// Tab was closed
ext.tabs.onClickedClose.addListener(async (event) => {
  try {

    // Remove objects
    if (event.id === tab?.id) {
      if (tab !== null) await ext.tabs?.remove(tab.id)
      if (window !== null) await ext.windows?.remove(window.id)
      if (webview !== null) await ext.webviews?.remove(webview.id)
      tab = window = webview = null
    }

  } catch (error) {

    // Print error
    console.error('ext.tabs.onClickedClose', JSON.stringify(error))

  }
})

// Tab was muted
ext.tabs.onClickedMute.addListener(async (event) => {
  try {

    // Update audio
    if (event.id === tab?.id && tab !== null && webview !== null) {
      const muted = await ext.webviews.isAudioMuted(webview.id)
      await ext.webviews.setAudioMuted(webview.id, !muted)
      await ext.tabs?.update(tab.id, { muted: !muted })
    }

  } catch (error) {

    // Print error
    console.error('ext.tabs.onClickedMute', JSON.stringify(error))

  }
})

// Window was removed by another extension
ext.windows.onRemoved.addListener(async (event) => {
  try {

    // Remove objects
    if (event.id === window?.id) {
      if (tab !== null) await ext.tabs?.remove(tab.id)
      if (webview !== null) await ext.webviews?.remove(webview.id)
      tab = window = webview = null
    }

  } catch (error) {

    // Print error
    console.error('ext.windows.onRemoved', JSON.stringify(error))

  }
})

// Window was closed
ext.windows.onClosed.addListener(async (event) => {
  try {

    // Remove objects
    if (event.id === window?.id) {
      if (tab !== null) await ext.tabs?.remove(tab.id)
      if (webview !== null) await ext.webviews?.remove(webview.id)
      tab = window = webview = null
    }

  } catch (error) {

    // Print error
    console.error('ext.windows.onClosed', JSON.stringify(error))

  }
})
