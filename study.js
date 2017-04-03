var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//----------------------------------------
// 変数定義
//----------------------------------------
var num = 1;
var str = "str";
var bool = true;
// ANYはどんな型でも入る なるべく使わない
// 型を指定しないで変数定義するとANYになｒｙ
var any = "test";
// let : 宣言したスコープ内で有効な変数
var scopeValue = "scope";
// const : 定数
var CONST_VALUE = "const";
console.log(num, str, bool);
//----------------------------------------
// 配列定義1
//----------------------------------------
var message1;
message1.push("a");
message1.push("b");
message1.push("c");
console.log(message1);
//----------------------------------------
// 配列定義2
//----------------------------------------
var message2;
//----------------------------------------
// オブジェクト型
//----------------------------------------
var address;
console.log(address);
//----------------------------------------
// ENUM
//----------------------------------------
var COLOR;
(function (COLOR) {
    COLOR[COLOR["RED"] = 0] = "RED";
    COLOR[COLOR["BLUE"] = 1] = "BLUE";
    COLOR[COLOR["YELLOW"] = 2] = "YELLOW";
})(COLOR || (COLOR = {}));
;
console.log(COLOR.RED);
//----------------------------------------
// タプル(色んな型のデータセット)
//----------------------------------------
var user = ['taro', 24, true];
console.log(user[0], user[1], user[2]);
var user2 = ['hanako', 20, false];
console.log(user2[0], user2[1], user2[2]);
//----------------------------------------
// 関数(戻り値なし)
//----------------------------------------
function calc1(num1, num2) {
    console.log(num1 + num2);
}
console.log(calc1(1, 3));
//----------------------------------------
// 関数(戻り値あり)
//----------------------------------------
function calc2(num1, num2) {
    return num1 + num2;
}
console.log(calc2(1, 3));
//----------------------------------------
// 関数(アロー関数)
//----------------------------------------
// 1行処理ならreturnの指定も省略可
var calcArrow = function (num1, num2) { return num1 + num2; };
// 複数行処理なら{}を使って記述可
var calcArrow2 = function (num1, num2) {
    return num1 + num2;
};
//----------------------------------------
// 関数（省略可能変数)
//----------------------------------------
function calc3(num1, num2, num3) {
    // num3は省略可能 指定しない場合はif文でfalse判定可
    if (num3) {
        return num1 + num2 + num3;
    }
    else {
        return num1 + num2;
    }
}
console.log(calc3(1, 2, 3));
console.log(calc3(1, 3));
//----------------------------------------
// 関数（可変引数）
//----------------------------------------
function calc4() {
    var numAry = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numAry[_i] = arguments[_i];
    }
    if (numAry) {
        var sum = 0;
        for (var i = 0; i < numAry.length; i++) {
            sum += numAry[i];
        }
        console.log(sum);
    }
}
calc4(1, 2, 3, 4, 5, 6);
//----------------------------------------
// 関数(総称型)
//----------------------------------------
function func(arg) {
    console.log(arg);
}
func(1);
func("test");
func(true);
func("any");
// 実装メソッドにany型を指定する
function func2(arg) {
    return arg;
}
func2(1);
func2("str");
//----------------------------------------
// クラス
//----------------------------------------
var Sample = (function () {
    // コンストラクタ
    function Sample(str, num, bool) {
        this.str = str;
        this.num = num;
        // getter呼び出し
        this.bool = bool;
    }
    Object.defineProperty(Sample.prototype, "bool", {
        // getterとsetterはES5の機能を使うのでコンパイル時に
        // tsc --target es5 [tsファイル名]と指定が必要
        // getter
        get: function () {
            return this._bool;
        },
        // setter
        set: function (bool) {
            this._bool = bool;
        },
        enumerable: true,
        configurable: true
    });
    Sample.prototype.print = function () {
        console.log("print Sample :" + this.toString());
    };
    Sample.prototype.toString = function () {
        return "str = " + this.str + "\n"
            + "num = " + this.num + "\n"
            + "bool = " + this.bool + "\n";
    };
    return Sample;
}());
var sample = new Sample("taro", 20, true);
sample.print();
// 実装して変数(メンバ変数だけ定義して値を設定して使うのにはこの方法がよい（reactのstateとか))
var printable = {
    canPrint: true,
    printWith: function (title) {
        console.log("hello");
    }
};
//----------------------------------------
// クラスの継承・インターフェースの実装
//----------------------------------------
var SampleExtended = (function (_super) {
    __extends(SampleExtended, _super);
    function SampleExtended(str, num, bool) {
        // 親クラスコンストラクタの呼び出し
        return _super.call(this, str, num, bool) || this;
    }
    // オーバーライド
    SampleExtended.prototype.print = function () {
        this.printWith("SampleExtended");
    };
    SampleExtended.prototype.printWith = function (title) {
        console.log("print " + title + " :" + this.toString());
    };
    // staticメソッド
    SampleExtended.showStatic = function () {
        console.log(SampleExtended.staticStr);
    };
    return SampleExtended;
}(Sample));
// インターフェイスの変数は全てpublicになるのでアクセス修飾子のレベルを落としてもエラー
//private canPrint: boolean;
// static変数
SampleExtended.staticStr = "staticStr";
var sampleEx = new SampleExtended("taro", 20, true);
sampleEx.print();
SampleExtended.showStatic();
