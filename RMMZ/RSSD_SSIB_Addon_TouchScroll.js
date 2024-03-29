//=========================================================
// RSSD_SSIB_Addon_TouchScroll.js
//=========================================================
/*:
 * @plugindesc ver0.1 - 简易可滚动信息板 - 扩展 - 惯性触摸滑动
 * @author 离影玫 | Rose_shadows
 * @target MZ MV
 * @orderAfter TTK_SwipeMove
 * @orderAfter RSSD_SimpleScrollableInfoBoard
 * @url https://github.com/Roseshadows
 * @help 使用该扩展插件，你可以用手指或鼠标来滑动信息板上的内容。
 * 注意：该插件需要 TTK_SwipeMove.js 作为前置插件。
 * 请将 TTK_SwipeMove.js 放在该插件之上。
 * 
 * @param Speed
 * @text 滚动速度
 * @desc 文本的滚动速度。默认是1。
 * @default 1
 * 
 * @param Inertia
 * @text 惯性
 * @desc 松开手指之后信息继续滑动时的惯性。是一个0到1间的小数或分数，数字越小，惯性越大。若不想使用惯性，请写 1。
 * @default 1/48
 */
var Imported = Imported || {};
var pluginName = 'RSSD_SSIB_Addon_TouchScroll';
Imported[pluginName] = true;
var RSSD = RSSD || {};
RSSD.SSIB_TS = {};

(function($) {
    var parameters = PluginManager.parameters(pluginName);
    $.speed = +parameters['Speed'] || 1;
    $.inertia = parseFloat(parameters['Inertia']) || 1/48;
    if(Imported.RSSD_SimpleScrollableInfoBoard && Imported.TTK_SwipeMove) {
        $.vId = RSSD.SimpleScrollableInfoBoard.switchId;
	    
        var _TouchInput_clear = TouchInput.clear;
        TouchInput.clear = function() {
            _TouchInput_clear.call(this);
            this._boardMoveY = 0;
            this._boardLastY = 0;
            this._storBoardForceY = 0;
        }
        
        var _TouchInput_update = TouchInput.update;
        TouchInput.update = function() {
            _TouchInput_update.call(this);
            if(this._boardMoveY > 0) {
                if (this._boardMoveY > 0 && $gameMap && SceneManager._scene._scrollTextWindow.isOpenAndActive()) {
                    SceneManager._scene._scrollTextWindow.origin.y -= this._boardMoveY;
                    this._boardMoveY = (this._boardMoveY - this._storBoardForceY < 0) ? (0) : (this._boardMoveY - this._storBoardForceY);
		}
		if (this._boardMoveY < 0 && $gameMap && SceneManager._scene._scrollTextWindow.isOpenAndActive()) {
                    SceneManager._scene._scrollTextWindow.origin.y -= this._boardMoveY;
                    this._boardMoveY = (this._boardMoveY - this._storBoardForceY > 0) ? (0) : (this._boardMoveY - this._storBoardForceY);
		}
            }
        }
        
        var _TouchInput_onTrigger = TouchInput._onTrigger;
        TouchInput._onTrigger = function(x, y) {
            if (this.isMoved()) return;
            _TouchInput_onTrigger.call(this, x, y);
            if ($gameMap && SceneManager._scene._scrollTextWindow.isOpenAndActive()) {
                this._boardLastY = this.y;
            }
        };

        var _TouchInput_onMove = TouchInput._onMove;
        TouchInput._onMove = function(x, y) {
            this._boardLastY = this.y;
            _TouchInput_onMove.call(this, x, y);
        };

        var _TouchInput_onRelease = TouchInput._onRelease;
        TouchInput._onRelease = function(x, y) {
            _TouchInput_onRelease.call(this, x, y);
            this._boardMoveY = this._forceY;
            this._storBoardForceY = this._forceY * $.inertia;
        };
        
        var _Window_ScrollText_update = Window_ScrollText.prototype.update;
        Window_ScrollText.prototype.update = function() {
            _Window_ScrollText_update.call(this);
            if($.vId && $gameVariables.value($.vId)) {
                if (this.isTouched() && TouchInput.isMoved()) {
                    var newY = (TouchInput._boardLastY - TouchInput.y) * $.speed;
                    if (newY) this.origin.y -= newY;
                }
                if (this.isTouched() && (TouchInput.isMoved() || TouchInput._boardMoveY)) {
	            if(!this.canScrollDown()) {
			var visibleArea = this.windowHeight() - 2 * this.padding;
		        this.origin.y = this.contents.height - visibleArea;
                        TouchInput._boardMoveY = 0;
                        TouchInput._storBoardForceY = 0;
		    } else if(!this.canScrollUp()){
		        this.origin.y = 0;
			TouchInput._boardMoveY = 0;
                        TouchInput._storBoardForceY = 0;
		    }
	        }
            }
        };
	
        Window_ScrollText.prototype.isTouched = function() {
            return (TouchInput.x - (this.x + this.padding)) > 0 && (TouchInput.y - (this.y + this.padding)) > 0
                && (TouchInput.x - (this.x + this.windowWidth() - this.padding)) < 0 && (TouchInput.y - (this.y + this.windowHeight() - this.padding)) < 0;
	};
    } else {
        console.log('插件'+pluginName+'.js 未检测到前置插件。请去看看是缺少插件还是顺序不对!');
    }
})(RSSD.SSIB_TS);
