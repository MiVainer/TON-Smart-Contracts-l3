import "@stdlib/deploy";

fun sum(a: Int, b: Int): Int {
    return a + b;
}

extends mutates fun add(self: Int, b: Int){
    self = self + b;
}

// @name(store_uint)
// native storeUint(s: Builder, value: Int, bits: Int) : Builder;

contract Functions with Deployable {

    num: Int as uint32;
    init() {
        self.num = 5;
    }

    receive(){}

    receive("add") {
        self.num.add(1); // num == 6
    }


    get fun balance(): Int {
        return myBalance();
    }
    
    fun f1() {
        sum(2, 5); // 7
    }


}