console.log('这是content打印的内容')
document.onkeydown=function(e){    //对整个页面监听  
    var keyNum=window.event ? e.keyCode :e.which;       //获取被按下的键值  
    if(chrome && chrome.runtime && e.target && e.target.nodeName !== 'INPUT'){
        chrome.runtime.sendMessage({type: 'key', key: e.key}, function(response){
            console.log('这是content 返回的')
            console.log(response)
        });
    }
}