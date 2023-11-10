// Pagable Book Menu

var RSSD = RSSD || {};
RSSD.newScene = {};

RSSD.newScene.texts = [
    'aaaaaaaaa',
    'bbbbbbb',
    'ccccccccc',
    'ddddd',
    'eeeeeeeeeee'
]

function Window_NewA() {
    this.initialize.apply(this, arguments);
};

Window_NewA.prototype = Object.create(Window_Base.prototype);
Window_NewA.prototype.constructor = Window_NewA;

Window_NewA.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._texts = '';
    this._curPageNum = 1;
    this.opacity = 0;
    this.refresh();
};

Window_NewA.prototype.refresh = function() {
    if(this._texts) {
        this.contents.clear();
        this.contents.outlineWidth = 0;
        this.drawTextEx('\\c[15]'+this._texts+'\\c[0]', 0, 0);
        var pageText = ''+this._curPageNum;
        this.changeTextColor(this.textColor(15))
        this.contents.fontSize -= 10;
        this.drawText(pageText, 0, this.contentsHeight() - this.contents.fontSize - 10, this.contentsWidth(), 'left');
        this.contents.fontSize += 10;
        this.resetTextColor();
        this.contents.outlineWidth = 4;
    }
};

function Window_NewB() {
    this.initialize.apply(this, arguments);
};

Window_NewB.prototype = Object.create(Window_Base.prototype);
Window_NewB.prototype.constructor = Window_NewB;

Window_NewB.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._texts = '';
    this._curPageNum = 2;
    this.opacity = 0;
    this.refresh();
};

Window_NewB.prototype.refresh = function() {
    this.contents.clear();
    if(this._texts) {
        this.contents.outlineWidth = 0;
        this.drawTextEx('\\c[15]'+this._texts+'\\c[0]', 0, 0);
        this.contents.fontSize -= 10;
        this.changeTextColor(this.textColor(15))
        var pageText = ''+this._curPageNum;
        this.drawText(pageText, 0, this.contentsHeight() - this.contents.fontSize - 10, this.contentsWidth(), 'right');
        this.contents.fontSize += 10;
        this.resetTextColor();
        this.contents.outlineWidth = 4;
    }else{
        this.changeTextColor(this.textColor(15));
        this.contents.outlineWidth = 0;
        this.drawText('- 全书完 -', 0, (this.contentsHeight() - this.contents.fontSize) / 2, this.contentsWidth(), 'center');
        this.contents.outlineWidth = 4;
        this.resetTextColor();
    }
};

function Scene_New() {
    this.initialize.apply(this, arguments);
};

Scene_New.prototype = Object.create(Scene_MenuBase.prototype);
Scene_New.prototype.constructor = Scene_New;

Scene_New.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this.initPageTextsIndex();
};

Scene_New.prototype.initPageTextsIndex = function() {
    this._pageTextsIndex = [0, 1];
};

Scene_New.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    // addChild 图层在 addWindow 之上，包括Sprite，前提是在create或start方法里addChild
    this.createWindows();
};

Scene_New.prototype.createWindows = function(){
    var width = 340;
    var height = 510;
    var x = (SceneManager._screenWidth - width*2)/2;
    var y = (SceneManager._screenHeight - height)/2;
    var margin = 20 / 2;
    this._window1 = new Window_NewA(x-margin, y, width, height);
    this._window2 = new Window_NewB(x+width+margin, y, width, height);
    this.addWindow(this._window1);
    this.addWindow(this._window2);
};

Scene_New.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.refreshPageTexts();
};

Scene_New.prototype.refreshPageTexts = function() {
    var maxIndex = RSSD.newScene.texts.length - 1;
    this._window1._texts = RSSD.newScene.texts[this._pageTextsIndex[0]];
    this._window2._texts = this._pageTextsIndex[1] <= maxIndex ? RSSD.newScene.texts[this._pageTextsIndex[1]] : '';
    this._window1._curPageNum = this._pageTextsIndex[0] + 1;
    this._window2._curPageNum = this._pageTextsIndex[1] + 1;
    this._window1.refresh();
    this._window2.refresh();
};

Scene_New.prototype.update = function() {
    this.checkApplyPop();
    this.updatePageTexts();
    Scene_MenuBase.prototype.update.call(this);
};

Scene_New.prototype.checkApplyPop = function() {
    if(Input.isTriggered('menu') || TouchInput.isCancelled()) {
        this.popScene();
    };
};

Scene_New.prototype.updatePageTexts = function() {
    var i1 = this._pageTextsIndex[0]; 
    var i2 = this._pageTextsIndex[1];
    var maxIndex = RSSD.newScene.texts.length - 1;
    var isD = (maxIndex+1) % 2 !== 1 ? true : false;
    if(this.isToPrevPage()) {
        this._pageTextsIndex[0] = i1 - 2 < 0 ? 0 : i1 - 2;
        this._pageTextsIndex[1] = i2 - 2 < 1 ? 1 : i2 - 2;
        this.refreshPageTexts();
    } else if(this.isToNextPage()) {
        if(isD) {
            this._pageTextsIndex[0] = i1 + 2 > maxIndex - 1 ? maxIndex - 1 : i1 + 2;
            this._pageTextsIndex[1] = i2 + 2 > maxIndex ? maxIndex : i2 + 2;
        }else{
            this._pageTextsIndex[0] = i1 + 2 > maxIndex ? maxIndex : i1 + 2;
            this._pageTextsIndex[1] = i2 + 2 > maxIndex + 1 ? maxIndex + 1 : i2 + 2;
        }
        this.refreshPageTexts();
    }
};

Scene_New.prototype.isToPrevPage = function() {
    return Input.isTriggered('left');
};

Scene_New.prototype.isToNextPage = function() {
    return Input.isTriggered('right');
};

Scene_New.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.createBookBg();
};

Scene_New.prototype.createBookBg = function() {
    this._bookBg = new Sprite();
    this._bookBg.bitmap = ImageManager.loadSystem('PandaMaru_Buch1');
    this._bookBg.anchor.x = 0.5;
    this._bookBg.anchor.y = 0.5;
    this._bookBg.x = SceneManager._screenWidth/2;
    this._bookBg.y = SceneManager._screenHeight/2;
    this._backgroundSprite.addChild(this._bookBg);
};