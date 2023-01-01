

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
function toUrl(url) {
  chrome.tabs.create({ url }, () => { });
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

/* background.js */
function test() {
  alert("test");
}
const hello = 'hello'
console.log('这是你好')
console.log('这是一个很好的想法')
let currentTab = null;
async function init(data) {
}


/** 按键绑定 */
function key(key) {
  console.log(key)
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('这是background.js打印的内容')
  if (request && request.type === 'key') {
    if ('q' === request.key.toLowerCase()) { this.closeOther() }
    if ('w' === request.key.toLowerCase()) { this.toCloseLeft() }
    if ('r' === request.key.toLowerCase()) { this.toCloseRight() }
    if ('a' === request.key.toLowerCase()) { this.toMayiwen() }
    if ('s' === request.key.toLowerCase()) { this.toLeft() }
    if ('f' === request.key.toLowerCase()) { this.toRight() }
    if ('b' === request.key.toLowerCase()) { toUrl('https://www.baidu.com/') }
    if ('v' === request.key.toLowerCase()) { toUrl('https://www.douyin.com/') }
    if ('g' === request.key.toLowerCase()) { toUrl('https://www.github.com/') }
  }
  console.log(request)
  console.log(sender)
  console.log(sendResponse)
});



