package test;

import java.util.LinkedList;

public class linkedlisttest {
    public static void main(String[] args){
        // LinkedList<Test> ll = new LinkedList<Test>();
        // ll.add(new Test(0));
        // Test[] array = ll.toArray(new Test[ll.size()]);
        // System.out.println(ll.size());
        // System.out.println(array.length);
        // System.out.println(array[0].testInt);
        // array[0].testInt = 1;
        // System.out.println(array[0].testInt);
        // System.out.println(ll.get(0).testInt);
        // LinkedList<Integer> ll = new LinkedList<Integer>();
        // ll.add(1);
        // ll.add(2);
        
        // LinkedList<Integer> ll2 = (LinkedList<Integer>) ll.clone();
        // ll2.set(0, 4);
        // System.out.println(ll.get(0));
        // System.out.println(ll2.get(0));
        boolean[] array = new boolean[2];
        System.out.println(array[1]);
    }
}

class Test{
    public int testInt;
    public Test(int testInt){
        this.testInt = testInt;
    }
}
