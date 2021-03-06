module('webapp - tabs - plugin', {
    setup: function() {
        $("body").append("<div id='container' ></div>");
    },
    teardown : function() {
        $('#container').remove();
    }
});

function getItems() {
    return [
        {
            title: 'tab1',
            content: 'content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1'
        },
        {
            title: 'tab2',
            content: 'content2 content2 content2 content2 content2 content2 content2 content2 content2 ' +
                'content2 content2 content2 content2 content2 content2 content2 content2 content2 ' +
                'content2 content2 content2 content2 content2 content2 content2 content2 content2 ' +
                'content2 content2 content2 content2 content2 content2 content2 content2 content2 ' +
                'content2 content2 content2 content2 content2 content2 content2 content2 content2 '
        },
        {
            title: 'tab3',
            content: 'content3 content3 content3 content3 content3 content3 content3 content3 content3'
        }
    ]
}


test("左右滑动无动画", function(){
    stop()
    var tabs = gmu.Tabs({
        container: '#container',
        active: 1,
        items: getItems(),
        transition:''
    })
    equals(1, tabs._options.active);
    ok($(".ui-tabs-nav li", tabs.$el).eq(1).hasClass("ui-state-active"));
    ok($(".ui-tabs-panel", tabs.$el).eq(1).hasClass("ui-state-active"));

    ua.loadcss(["reset.css","transitions.css", "widget/tabs/tabs.css","widget/tabs/tabs.default.css"], function(){
        ta.touchstart($(".ui-panel")[1], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[1], {
            touches:[{
                clientX: -50,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-panel")[1]);
        equals(2, tabs._options.active, '向右滑动')
        ok($(".ui-tabs-nav li", tabs.$el).eq(2).hasClass("ui-state-active"));
        ok($(".ui-tabs-panel", tabs.$el).eq(2).hasClass("ui-state-active"));

        ta.touchstart($(".ui-panel")[2], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[2], {
            touches:[{
                clientX: -50,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-panel")[2]);
        equals(2, tabs._options.active, '滑到最后一个后，不再响应滑动')
        ok($(".ui-tabs-nav li", tabs.$el).eq(2).hasClass("ui-state-active"));
        ok($(".ui-tabs-panel", tabs.$el).eq(2).hasClass("ui-state-active"));

        ta.touchstart($(".ui-panel")[2], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[2], {
            touches:[{
                clientX: 50,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-panel")[2]);
        equals(1, tabs._options.active, '向左滑动')
        ok($(".ui-tabs-nav li", tabs.$el).eq(1).hasClass("ui-state-active"));
        ok($(".ui-tabs-panel", tabs.$el).eq(1).hasClass("ui-state-active"));

        ta.touchstart($(".ui-panel")[1], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[1], {
            touches:[{
                clientX: -29,      //   x方向滑动的距离小于horizontalDistanceThreshold
                clientY: 0
            }]
        });
        ta.touchend($(".ui-panel")[1]);
        equals(1, tabs._options.active, 'x方向滑动距离偏小，停留在原tab')

        ta.touchstart($(".ui-panel")[1], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[1], {
            touches:[{
                clientX: -50,      //   y滑动的距离大于verticalDistanceThreshold
                clientY: 71
            }]
        });
        ta.touchend($(".ui-panel")[1]);
        equals(1, tabs._options.active, 'y方向滑动距离偏大，停留在原tab')
        ok($(".ui-tabs-nav li", tabs.$el).eq(1).hasClass("ui-state-active"));
        ok($(".ui-tabs-panel", tabs.$el).eq(1).hasClass("ui-state-active"));
        tabs.destroy();
        start();
    })
})

test("左右滑动有动画", function(){
    stop()
    var tabs = gmu.Tabs({
        container: '#container',
        items: getItems()
    })
    ta.touchstart($(".ui-panel")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-panel")[0], {
        touches:[{
            clientX: -50,
            clientY: 0
        }]
    });
    ta.touchend($(".ui-panel")[0]);
    ok($(".ui-panel").eq(0).hasClass('out'), '向右滑动（滑出）')
    ok($(".ui-panel").eq(1).hasClass('in'), '向右滑动（滑入）')

    setTimeout(function(){
        ok(!$(".ui-panel").eq(0).hasClass('out'), '滑动结束')
        ok(!$(".ui-panel").eq(1).hasClass('in'), '滑动结束')
        equals(1, tabs._options.active, '向右滑动')
        ok($(".ui-tabs-nav li", tabs.$el).eq(1).hasClass("ui-state-active"))
        ok($(".ui-tabs-panel", tabs.$el).eq(1).hasClass("ui-state-active"))

        ta.touchstart($(".ui-panel")[1], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove($(".ui-panel")[1], {
            touches:[{
                clientX: 50,
                clientY: 0
            }]
        });
        ta.touchend($(".ui-panel")[1]);
        ok($(".ui-panel").eq(1).hasClass('out'), '向左滑动（滑出）')
        ok($(".ui-panel").eq(0).hasClass('in'), '向左滑动（滑入）')

        setTimeout(function(){
        	ok(!$(".ui-panel").eq(1).hasClass('out'), '滑动结束')
            ok(!$(".ui-panel").eq(0).hasClass('in'), '滑动结束')
            equals(0, tabs._options.active, '向左滑动')
	        ok($(".ui-tabs-nav li", tabs.$el).eq(0).hasClass("ui-state-active"))
	        ok($(".ui-tabs-panel", tabs.$el).eq(0).hasClass("ui-state-active"))

            start()
        }, 1000)
    }, 600)
})

test("disablePlugin=true", function(){
    var tabs = gmu.Tabs({
    	swipe: false,
        container: '#container',
        items: getItems(),
        transition:''
    });
    ta.touchstart($(".ui-panel")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-panel")[0], {
        touches:[{
            clientX: -50,
            clientY: 0
        }]
    });
    ta.touchend($(".ui-panel")[0]);
    equals(tabs._options.active, 0, 'disbale plugin');
})

test("destroy",function(){
    ua.destroyTest(function(w,f){
        w.$('body').highlight();//由于highlight在调用的时候会注册全局事件，以便多次其他实例使用，所以这里先让hightlight把全局事件注册以后再来对比。
        var dl1 = w.dt.domLength(w);
        var el1= w.dt.eventLength();

        var tabs =  w.gmu.Tabs({
            swipe:true,
            items: getItems()
        });
        ta.touchstart(w.$(".ui-panel")[0], {
            touches: [{
                clientX: 0,
                clientY: 0
            }]
        });
        ta.touchmove(w.$(".ui-panel")[0], {
            touches:[{
                clientX: -50,
                clientY: 0
            }]
        });
        ta.touchend(w.$(".ui-panel")[0]);
        tabs.destroy();
        var el2= w.dt.eventLength();
        var ol = w.dt.objLength(tabs);
        var dl2 =w.dt.domLength(w);
        equal(dl1,dl2,"The dom is ok");   //测试结果不是100%可靠，可忽略
        equal(el1,el2,"The event is ok");
        // ok(ol==0,"The tabs is destroy");
        this.finish();
    })
}) ;
//以下用例为非正常情况
test("y上的移动大于x,什么也不做", function(){
    var tabs = gmu.Tabs({
        container: '#container',
        items: getItems()
    })
    ta.touchstart($(".ui-panel")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });
    ta.touchmove($(".ui-panel")[0], {
        touches:[{
            clientX: -20,
            clientY: 50
        }]
    });
    ta.touchend($(".ui-panel")[0]);
    ok(!$(".ui-panel").eq(0).hasClass('out'), '缺少开始点击的动作,什么也不做')
    ok(!$(".ui-panel").eq(1).hasClass('in'), '缺少开始点击的动作,什么也不做')
})
test("没有move,则不滑动", function(){
    var tabs = gmu.Tabs({
        container: '#container',
        items: getItems()
    })
    ta.touchstart($(".ui-panel")[0], {
        touches: [{
            clientX: 0,
            clientY: 0
        }]
    });

    ta.touchend($(".ui-panel")[0]);
    ok(!$(".ui-panel").eq(0).hasClass('out'), '没有move,则不滑动')
    ok(!$(".ui-panel").eq(1).hasClass('in'), '没有move,则不滑动')

})
