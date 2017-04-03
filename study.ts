//----------------------------------------
// 変数定義
//----------------------------------------
var num : number = 1;
var str : string = "str";
var bool : boolean = true;

// ANYはどんな型でも入る なるべく使わない
// 型を指定しないで変数定義するとANYになｒｙ
var any : any = "test";

// let : 宣言したスコープ内で有効な変数
let scopeValue : string = "scope";
// const : 定数
const CONST_VALUE : string = "const";

console.log(num, str, bool);
//----------------------------------------
// 配列定義1
//----------------------------------------
var message1: string[];

message1.push("a");
message1.push("b");
message1.push("c");
console.log(message1);
//----------------------------------------
// 配列定義2
//----------------------------------------
var message2: Array<string>;

//----------------------------------------
// オブジェクト型
//----------------------------------------
var address: {
    prefecture:string;
    address:string;
    //プロパティ名に?が付いているとオプションになる
    address2?:string;
}

console.log(address);
//----------------------------------------
// ENUM
//----------------------------------------
enum COLOR {RED, BLUE, YELLOW};
console.log(COLOR.RED);

//----------------------------------------
// タプル(色んな型のデータセット)
//----------------------------------------
let user : [string, number, boolean] = ['taro', 24, true]; 
console.log(user[0], user[1], user[2]);
//----------------------------------------
// タプルのエイリアス
//----------------------------------------
type Name = string;
type Age = number;
type isMale = boolean;

let user2 : [Name, Age, isMale] = ['hanako', 20, false]; 
console.log(user2[0], user2[1], user2[2]);

//----------------------------------------
// 関数(戻り値なし)
//----------------------------------------
function calc1 (num1 : number, num2 : number) : void {
	console.log(num1 + num2);
}
console.log(calc1(1,3));

//----------------------------------------
// 関数(戻り値あり)
//----------------------------------------
function calc2 (num1 : number, num2 : number) : number {
	return num1 + num2;
}
console.log(calc2(1,3));

//----------------------------------------
// 関数(アロー関数)
//----------------------------------------
// 1行処理ならreturnの指定も省略可
var calcArrow = (num1 :number, num2 : number) : number => num1 + num2;

// 複数行処理なら{}を使って記述可
var calcArrow2 = (num1 :number, num2 : number) : number => {
	return num1 + num2;
}
//----------------------------------------
// 関数（省略可能変数)
//----------------------------------------
function calc3 (num1 : number, num2 : number, num3? : number) : number {
	// num3は省略可能 指定しない場合はif文でfalse判定可
	if(num3){	
		return num1 + num2 + num3;
	}else{
		return num1+ num2;
	}
}

console.log(calc3(1,2,3));
console.log(calc3(1,3));
//----------------------------------------
// 関数（可変引数）
//----------------------------------------
function calc4 (...numAry : Array<number>){

	if(numAry){
		let sum = 0;
		for(let i = 0; i<numAry.length; i++){
			sum += numAry[i];
		}
		console.log(sum);
	}
}

calc4(1,2,3,4,5,6);
//----------------------------------------
// 関数(総称型)
//----------------------------------------
function func<T>(arg:T){
	console.log(arg);
}

func<number>(1);
func<string>("test");
func<boolean>(true);
func<any>("any");

//----------------------------------------
// 関数（オーバーロード）
//----------------------------------------
function func2(arg:string) : string;
function func2(arg:number) : number;

// 実装メソッドにany型を指定する
function func2(arg:any) : any{
	return arg;
}

func2(1);
func2("str");

//----------------------------------------
// クラス
//----------------------------------------
class Sample{

	public str : string;
	protected num: number;
	private _bool : boolean;
	// 何も指定しないとpublic
	any : any;

	// コンストラクタ
	constructor(str: string, num: number, bool : boolean){
		this.str = str;
		this.num = num;
		// getter呼び出し
		this.bool = bool;
	}


	// getterとsetterはES5の機能を使うのでコンパイル時に
	// tsc --target es5 [tsファイル名]と指定が必要
	// getter
	get bool(): boolean {
		return this._bool;
	}	

	// setter
	set bool(bool : boolean) {
		this._bool = bool;
	}

	print() : void{
		console.log("print Sample :" + this.toString());
	}

	protected toString() : string {
		return "str = " + this.str + "\n" 
				+ "num = " + this.num + "\n" 
				+ "bool = " + this.bool + "\n";

	}

}

var sample : Sample  = new Sample("taro", 20, true);
sample.print();

//----------------------------------------
// インターフェイス
//----------------------------------------
interface Printable{
	canPrint : boolean;
	printWith(title: string): void;
}

// 実装して変数(メンバ変数だけ定義して値を設定して使うのにはこの方法がよい（reactのstateとか))
var printable:Printable = {
	canPrint: true, 

	printWith(title: string): void{
		console.log("hello");
	}
};


//----------------------------------------
// クラスの継承・インターフェースの実装
//----------------------------------------
class SampleExtended extends Sample implements Printable{

	// インターフェースで定義した変数は全て定義する必要がある
	canPrint: boolean;
	// インターフェイスの変数は全てpublicになるのでアクセス修飾子のレベルを落としてもエラー
	//private canPrint: boolean;

	// static変数
	static staticStr :  string = "staticStr";

	constructor(str: string, num: number, bool: boolean){
		// 親クラスコンストラクタの呼び出し
		super(str, num, bool);
	}

	// オーバーライド
	print(): void{
		this.printWith("SampleExtended");
	}

	printWith(title: string) : void{
		console.log("print " + title + " :" + this.toString());	
	}

	// staticメソッド
	static showStatic(): void{
		console.log(SampleExtended.staticStr);
	}

}
var sampleEx : SampleExtended  = new SampleExtended("taro", 20, true);
sampleEx.print();
SampleExtended.showStatic();
