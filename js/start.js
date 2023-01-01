/* 新标签页控制
 */
toMayiwen()
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
  chrome.tabs.query({}, async (tabs) => {
    let index = tabs.findIndex(item => item.url === 'http://mayiwen.com/')
    if (index === -1) {
      chrome.tabs.query(
        {
          currentWindow: true,
          active: true
        },
        function (foundTabs) {
          chrome.tabs.update(foundTabs[0].id, {
            url: 'http://mayiwen.com/'
          })
        }
      );
    } else {
      new Promise(async resolve => {
        tabs.forEach(async (item, i) => {
          if (i === index) {
            await updateAsync(item, activeTrue)
          } else {
            await updateAsync(item, activeFalse)
          }
        });
        await resolve()
      }).then(() => {
        deleteEnd()
      })
    }
  })
}
function deleteEnd() {
  console.log('这是end')
  chrome.tabs.query({}, function (tabs) {
    chrome.tabs.remove(tabs[tabs.length - 1].id)
  })
}
function updateAsync(item, active) {
  return new Promise(resolve => {
    chrome.tabs.update(item.id, active, () => {
      resolve()
    })
  })
}