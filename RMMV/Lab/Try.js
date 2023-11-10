// 对话立绘参考写法

var __Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
    __Scene_Map_initialize.call(this);
    this._foregrounds = [];
};

var __SceneMap_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    __SceneMap_start.call(this);
    this.addForegrounds();
    this.refreshForegAnim();
};

Scene_Map.prototype.addForegrounds = function() {
    this.createForeground('josei_20_a-1','img/pictures/', -250, SceneManager._screenHeight+400,0, 1, 0.6, 0.6);
};

Scene_Map.prototype.createForeground = function(filename, src, x, y, ax, ay, sx, sy) {
    var sp = new Sprite();
    sp.bitmap = ImageManager.loadBitmap(src, filename); 
    sp.anchor.x = ax;
    sp.anchor.y = ay;
    sp.x = x;   // 设置 x 时 bitmap 还未完全加载出来，所以取不到 bitmap.width 的值。
    sp.y = y;
    sp.scale.x = sx;
    sp.scale.y = sy;
    this.addChild(sp);
    this._foregrounds.push(sp);
};

Scene_Map.prototype.refreshForegAnim = function() {
    this._easing = false;
    this._foregroundAnimCount = -1;
    this._foregOldX = this._foregrounds[0].x;
};

var __Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    this.updateForegroundEasing();
    __Scene_Map_update.call(this);
};

Scene_Map.prototype.updateForegroundEasing = function() {
    if(this._easing === true) {
        if(this._foregroundAnimCount === -1) this._foregroundAnimCount = 0;
        if(this._foregroundAnimCount >= 0) {
            if(this._foregroundAnimCount < 20) {
                this._foregrounds[0].x = this.easeOut('easeOutCubic' ,this._foregroundAnimCount/60, this._foregOldX, 200, 0.3);
                this._foregroundAnimCount++;
            }else{
                this.refreshForegAnim();
            }
        }
    }else{
        this.refreshForegAnim();
    }
};

Scene_Map.prototype.easeOutQuad = function(t, b, c, d){
    return -c * (t /= d) * (t - 2) + b;
};

Scene_Map.prototype.easeOutCubic = function(t, b, c, d){
    return c * ((t = t / d - 1) * t * t + 1) + b;
};

Scene_Map.prototype.easeOut = function(type, t, b, c, d) {
    switch(type) {
        case 'easeOutQuad':
            return -c * (t /= d) * (t - 2) + b;
        case 'easeOutCubic':
            return c * ((t = t / d - 1) * t * t + 1) + b;
    }
};

var __Window_Message_newLineX = Window_Message.prototype.newLineX;
Window_Message.prototype.newLineX = function() {
    var padding = 280;
    return $gameMessage.faceName() === '' ? 0 + padding : Window_Base._faceWidth + 20 + padding;
};