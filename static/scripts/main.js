//按钮声明
let newchat = document.getElementById("Newchat");
let sendbt = document.getElementById("Sbt");
let ctb = document.getElementById("ctb");
let dlbt = document.getElementById("dlbt");
let chatbt = document.getElementsByClassName("chatbt");

//其他组件声明
let ifbox = document.getElementById("ifbox");
let chatlistbox = document.getElementById("Chatlist");
let netstatus = document.getElementById("netcheck");
let netbox = document.getElementById("netbox");
let inputs = document.getElementById("input");


//数值变量声明
let Amessages = 'test'; // AI消息暂存体,由后端对接,补全ai才能完全实现
let Umessages = ''; // 用户消息暂存体
let chatlist = []; // 聊天记录列表


//函数
function checkNetworkStatus() {//检查网络状态函数
    if (navigator.onLine) {
        netstatus.innerHTML = "✅服务已就绪";
        netbox.style.backgroundColor = "rgb(180, 231, 201)"; // 设置绿色背景
    } else {
        netstatus.innerHTML = "‼️服务已断开";
        netbox.style.backgroundColor = "rgb(237, 147, 147)"; // 设置红色背景
    }
}

function savechat(){// 保存所有聊天记录(覆盖式)函数
    //暂未实现,由后端对接才能完全实现
}

function loadchats() {// 加载聊天记录函数
    //暂未实现,由后端对接才能完全实现
}

function loadchatlisthistory() {// 加载聊天记录列表函数
    //暂未实现,由后端对接才能完全实现
}

//监听事件
window.addEventListener('load', function () {//网络状态监听
    checkNetworkStatus(); // 页面加载时检查网络状态
    loadchatlisthistory(); // 加载聊天记录列表
    setInterval(checkNetworkStatus, 5000); // 每5秒检查一次网络状态
});

sendbt.addEventListener("click", function () {//发送信息按钮监听
    let Umessages = document.getElementById("input").value;//获取用户输入的消息
    // 检查是否有输入内容
    if (Umessages) {
        ifbox.innerHTML += `<div class="UMContain"><div class="U-Message" id="UM">${Umessages}</div></div>`;// 添加用户消息到聊天框
        ifbox.scrollTop = ifbox.scrollHeight; // 滚动到最新消息
        inputs.value = ""; // 清空输入框
        ifbox.innerHTML += `<div class="AMContain"><div class="A-Message" id="AM">${Amessages}</div></div>`;// 添加思考中的消息
        ifbox.scrollTop = ifbox.scrollHeight; // 滚动到最新消息
        savechat(); // 储存聊天记录
    } else {
        alert("请输入消息！");
    }
    savechat(); // 储存最新聊天记录
})

inputs.addEventListener("keydown", function (event) {// 监听输入框的按键事件
    if (event.key === "Enter") {
        event.preventDefault(); // 阻止默认的换行行为
        sendbt.click(); // 触发发送按钮的点击事件
        sendbt.focus(); // 聚焦到发送按钮上
    }
});


newchat.addEventListener("click", function () {//新建聊天按钮监听
    for (let i = 0; i < chatbt.length; i++) {
        chatbt[i].style.backgroundColor = "rgb(144, 180, 219)";
    }
    savechat(); // 储存当前聊天记录
    ifbox.innerHTML = ""; // 清空聊天框
    chatlistbox.insertAdjacentHTML('afterbegin', `<li class="chatlistthing"><button class="chatbt">${Amessages}</button><button class="delchatbt">🗑︎</button></li>`);
    // 获取刚刚插入的按钮并添加 "show" 类
    const button = chatlistbox.querySelector('.chatbt');
    setTimeout(() => button.classList.add('show'), 10); // 延迟触发动画
    // 去掉多余的分号
    button.style.backgroundColor = "rgb(53,121,246)"; 
    button.style.color = "white"; 
    ifbox.scrollTop = ifbox.scrollHeight; // 滚动到最新消息
    inputs.value = ""; // 清空输入框
})

chatlistbox.addEventListener("click", function (event) {//切换聊天按钮监听
    
    if(event.target.tagName === 'BUTTON') {
        // 移除所有聊天按钮的 "turn" 类
        for (let i = 0; i < chatbt.length; i++) {
            chatbt[i].classList.remove("turn");
            chatbt[i].style.backgroundColor = "rgb(144, 180, 219)";// 恢复默认背景颜色
        }
        // 给当前点击的按钮添加 "turn" 类
        if (event.target.classList.contains('chatbt')) {
            event.target.classList.add("turn");
            event.target.style.backgroundColor = "rgb(53,121,246)"; // 设置按钮背景颜色
        }
        savechat(); // 储存当前的聊天记录
        ifbox.innerHTML = ""; // 清空聊天框
        loadchats();// 加载点击的聊天记录
        ifbox.scrollTop = ifbox.scrollHeight; // 滚动到最新消息
        inputs.value = ""; // 清空输入框
    }
})

chatlistbox.addEventListener("click", function (event) {//删除按钮监听
    if (event.target.classList.contains('delchatbt')) {
        // 删除聊天记录
        const chatItem = event.target.closest('.chatlistthing');
        if (chatItem) {
            setTimeout(() => chatItem.classList.add('off'), 10); // 延迟触发动画
            chatItem.addEventListener('transitionend', () => {
                chatItem.remove(); // 动画结束后删除聊天历史列表记录
                document.getElementById("ifbox").innerHTML = ""; // 清空聊天框
            }, { once: true });
        }
    }
})

