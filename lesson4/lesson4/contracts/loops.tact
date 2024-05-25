import "@stdlib/deploy";

contract Loops with Deployable {
    init() {
        
    }

    receive("loop1") { //цикл repeat (повторять оределённое количество раз тело цикла)
        let sum: Int = 0;
        let i: Int = 0;
        repeat(10) {
            i += 1;
            sum += i;
        }
        dump(sum);
    }
    
    receive("loop2") { //цикл while (повторять тело цикла до выполнения определённого условия i<10)
        let sum: Int = 0;
        let i: Int = 0;
        while(i<10) {
            i += 1;
            sum += i;
        }
        dump(sum);
    }

    receive("loop3") { //цикл while (повторять тело цикла до выполнения определённого условия i<10)
        let sum: Int = 0;
        let i: Int = 0;
       do {
            i += 1;
            sum += i;
        } until (i >= 10);
        dump(sum);
    }
    
}
