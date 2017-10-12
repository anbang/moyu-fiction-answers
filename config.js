seajs.config({
    'alias': {
        "juicer": "../module/juicer/dist/juicer"
    },
    'map': [
        [/^(.*\.(?:css|js))(.*)$/i, '$1?t=2016111701']
    ]
});
(function () {
    var dev = true, //上线时,修改为 false  dev === true
        scripts = document.scripts,
        script = scripts[scripts.length - 1],
        boot = script.getAttribute('data-init'),
        dir = script.getAttribute('src');

    dir = dir.slice(0, dir.lastIndexOf('/') + 1);
    //dev
    if (dev) {
        if (location.href.indexOf('debug') === -1) {
            seajs.config({
                'map': [
                    [/^(.*\.(?:css|js))(.*)$/i, '$1?t=' + (+new Date())]
                ]
            });
        }
        dir = dir + 'src/';
    } else {
        dir = dir + 'dist/';
    }

    /*
     * 上面获取路径脚本需要立刻执行
     * 将加载脚本放到domReady后执行,避免ie浏览器终止操作错误
     */
    $(function () {
        if (boot) {
            seajs.use(dir + boot);
        }


    });
})();