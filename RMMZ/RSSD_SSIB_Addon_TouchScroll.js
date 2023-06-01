//=========================================================
// RSSD_SSIB_Addon_TouchScroll.js
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
        var _TouchInput_clear = TouchInput.clear;
        TouchInput.clear = function() {
            _TouchInput_clear.call(this);
            this._storeForceY = 0;
            this._boardMoveY = 0;
            this._boardOriginY = 0;
        }
        var _TouchInput_update = TouchInput.update;
        TouchInput.update = function() {
            _TouchInput_update.call(this);
            if(this._boardMoveY > 0) {}
        }
        
        var _TouchInput_onTrigger = TouchInput._onTrigger;
        TouchInput._onTrigger = function(x, y) {
            if (this.isMoved()) return;
            _TouchInput_onTrigger.call(this, x, y);
            this._boardMoveY = this.y;
        };

        var _TouchInput_onMove = TouchInput._onMove;
        TouchInput._onMove = function(x, y) {
            if ($.cancelPlayerMove)
                $.denyMove = true;
            this._lastCameraX = this.x;
            this._lastCameraY = this.y;
            _TouchInput_onMove.call(this, x, y);
        };

        var _TouchInput_onRelease = TouchInput._onRelease;
        TouchInput._onRelease = function(x, y) {
            _TouchInput_onRelease.call(this, x, y);
            if (TTK.SwipeMove) {
                this._cameraAccX = this._forceX;
                this._cameraAccY = this._forceY;
                this._storForceX = this._forceX / 48;
                this._storForceY = this._forceY / 48;
            }
            if ($.denyMove) $.denyMove = false;
        };
    } else {
        console.log('插件'+pluginName+'.js 未检测到前置插件。请去看看是缺少插件还是顺序不对!');
    }
})(RSSD.SSIB_TS);
