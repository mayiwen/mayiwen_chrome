/* 点击插件图标弹出的页面
 */
const activeTrue = {
  active: true,
  highlighted: true,
  selected: true
}
const activeFalse = {
  active: false,
  highlighted: false,
  selected: false
}
/** 去我的首页 */
function toMayiwen() {
  chrome.tabs.query({}, function (tabs) {
    let index = tabs.findIndex(item => item.url === 'http://mayiwen.com/')
    if (index === -1) {
      chrome.tabs.create({ url: "http://mayiwen.com/" }, () => { });
    } else {
      tabs.forEach((item, i) => {
        if (i === index) {
          chrome.tabs.update(item.id, activeTrue)
        } else {
          chrome.tabs.update(item.id, activeFalse)
        }
      });
    }
  })
}


/** 去左边的标签 */
function toLeft() {
  chrome.tabs.query({}, function (tabs) {
    let activeIndex = tabs.findIndex(item => item.active)
    if (activeIndex > 0) {
      chrome.tabs.update(tabs[activeIndex].id, activeFalse)
      chrome.tabs.update(tabs[activeIndex - 1].id, activeTrue)
    }
  })
}
/** 去右边的标签 */
function toRight() {
  chrome.tabs.query({}, function (tabs) {
    console.log(tabs)
    let activeIndex = tabs.findIndex(item => item.active)
    console.log(activeIndex)
    if (activeIndex < tabs.length - 1) {
      chrome.tabs.update(tabs[activeIndex].id, activeFalse)
      chrome.tabs.update(tabs[activeIndex + 1].id, activeTrue)
    }
  })
}
/** 关闭其他标签 */
function closeOther() {
  chrome.tabs.query({}, function (tabs) {
    let tabsNotActive = tabs.filter(item => !item.active).map(item => item.id)
    chrome.tabs.remove(tabsNotActive)
  })
}
/** 关闭左侧标签 */
function toCloseLeft() {
  chrome.tabs.query({}, function (tabs) {
    let indexActive = tabs.findIndex(item => item.active)
    console.log(indexActive)
    let tabsNotActive = tabs.filter((item, index) => !item.active && (index < indexActive)).map(item => item.id)
    chrome.tabs.remove(tabsNotActive)
  })
}
/** 关闭右侧标签 */
function toCloseRight() {
  chrome.tabs.query({}, function (tabs) {
    let indexActive = tabs.findIndex(item => item.active)
    console.log(indexActive)
    let tabsNotActive = tabs.filter((item, index) => !item.active && (index > indexActive)).map(item => item.id)
    chrome.tabs.remove(tabsNotActive)
  })
}
/** 按键绑定 */
function key(key) {
  console.log(key)
  if (key.code === 'KeyQ') closeOther();
  if (key.code === 'KeyA') toMayiwen();
  if (key.code === 'KeyW') toCloseLeft();
  if (key.code === 'KeyR') toCloseRight();
  if (key.code === 'KeyS') toLeft();
  if (key.code === 'KeyF') toRight();
  if (key.code === 'KeyB') toUrl('https://www.baidu.com/')
  if (key.code === 'KeyV') toUrl('https://www.douyin.com/')
  if (key.code === 'KeyG') toUrl('https://www.github.com/')
  
}
/** 按键绑定 */
function getBackgroundPage() {
  console.log(chrome.extension)
  chrome.runtime.sendMessage({greeting: 'getNames'},function(response){
  console.log('这是返回的')
  });
}

function toUrl(url) {
  chrome.tabs.create({ url }, () => { });
}
document.querySelector('#toPage').onclick = toMayiwen;
document.querySelector('#toClose').onclick = closeOther;
document.querySelector('#toLeft').onclick = toLeft;
document.querySelector('#toRight').onclick = toRight;
document.querySelector('#toCloseLeft').onclick = toCloseLeft;
document.querySelector('#toCloseRight').onclick = toCloseRight;
document.querySelector('#toExtensions').onclick = () => { toUrl('chrome://extensions/') };
document.querySelector('#toBaidu').onclick = () => { toUrl('https://www.baidu.com/') };
document.querySelector('#toDouyin').onclick = () => { toUrl('https://www.douyin.com/') };
document.querySelector('#clearData').onclick = () => { toUrl('chrome://settings/clearBrowserData') };
document.querySelector('#toGithub').onclick = () => { toUrl('https://www.github.com/') };
document.querySelector('body').onkeyup = key;
document.querySelector('#getBackgroundPage').onclick = getBackgroundPage;