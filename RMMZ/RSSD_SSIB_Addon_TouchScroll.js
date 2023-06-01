//=========================================================
// RSSD_SimpleScrollableInfoBoard.js
//=========================================================
/*:
 * @plugindesc ver0.1 - 简易可滚动信息板 - 扩展 - 惯性触摸滑动
 * @author 离影玫 | Rose_shadows
 * @target MV
 * @orderAfter TTK_SwipeMove
 * @orderAfter RSSD_SimpleSrollableInfoBoard
 * @url https://github.com/Roseshadows
 * @help 使用该扩展插件，你可以用手指或鼠标来滑动信息板上的内容。
 * 注意：该插件需要 TTK_SwipeMove.js 作为前置插件。
 * 请将 TTK_SwipeMove.js 放在该插件之上。
 */
var Imported = Imported || {};
var pluginName = 'RSSD_SSIB_Addon_TouchScroll';
Imported[pluginName] = true;
var RSSD = RSSD || {};
RSSD.SSIB_TS = {};

(function() {
    var parameters = PluginManager.parameters(pluginName);
    if(Imported.RSSD_SimpleScrollableInfoBoard && Imported.TTK_SwipeMove) {
        var _Input_update = Input.update;
        Input.update = function() {
            _Input_update.call(this);
            
        }
    } else {
        console.log('插件'+pluginName+'.js 未检测到前置插件。请去看看是缺少插件还是顺序不对!');
    }
})(RSSD.SSIB_TS);
