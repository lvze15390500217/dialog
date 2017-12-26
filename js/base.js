window.onload = function() {
    // 获取input框
    var aInput = document.getElementsByTagName('input');
    // 点击input
    aInput[0].onclick = function() {
        var log = new Dialog();
        // 配置参数
        log.init({
            iNow: 3,
            mask: true
        });
    }
}


Dialog.prototype.json = {};
Dialog.prototype.init = function(opt) {
    extend(this.settings, opt);
    // if (this.json[opt.iNow] == undefined) {
    this.json[opt.iNow] = true;
    // }

    if (this.json[opt.iNow]) {
        this.create();
        this.close();
        if (this.settings.mask) {
            this.createMask();
        }
        this.json[opt.iNow] = false;
    }

}
Dialog.prototype.create = function() {
    // 创建弹框
    this.obj = document.createElement('div');
    this.obj.className = 'login';
    this.obj.innerHTML = `<div class='title'><span>${this.settings.title}</span><span class='close'>关闭</span></div>`;
    document.body.appendChild(this.obj);
    this.setData();
};
// 设置弹窗的位置
Dialog.prototype.setData = function() {
    this.obj.style.width = this.settings.width + 'px';
    this.obj.style.height = this.settings.height + 'px';
    this.obj.style.background = this.settings.background;
    this.obj.style.left = (document.documentElement.clientWidth - this.obj.offsetWidth) / 2 + 'px';
    this.obj.style.top = (document.documentElement.clientHeight - this.obj.offsetHeight) / 2 + 'px';

};
// 关闭按钮
Dialog.prototype.close = function() {
    var oClose = this.obj.getElementsByTagName('span')[1];
    var _this = this;
    oClose.onclick = function() {
        if (_this.settings.mask) {
            document.body.removeChild(_this.oMask);
        }
        document.body.removeChild(_this.obj);
        _this.json[_this.settings.iNow] = true;
    }
};
// 遮罩层
Dialog.prototype.createMask = function() {
    var oMask = document.createElement('div');
    oMask.id = 'mask';
    this.oMask = oMask;
    oMask.style.width = document.documentElement.clientWidth + 'px';
    oMask.style.height = document.documentElement.clientHeight + 'px';
    document.body.appendChild(oMask)
}

function extend(obj1, obj2) {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr];
    }
}