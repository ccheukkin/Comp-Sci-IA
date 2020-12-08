package test;

import java.util.LinkedList;

public class linkedlisttest {
    public static void main(String[] args){
        LinkedList<Test> ll = new LinkedList<Test>();
        ll.add(new Test(0));
        Test[] array = ll.toArray(new Test[ll.size()]);
        System.out.println(ll.size());
        System.out.println(array.length);
        System.out.println(array[0].testInt);
        array[0].testInt = 1;
        System.out.println(array[0].testInt);
        System.out.println(ll.get(0).testInt);
    }
}

class Test{
    public int testInt;
    public Test(int testInt){
        this.testInt = testInt;
    }
}
