package qsf.sorting.wrapper;

public class Categories {
    public boolean[] type;
    public int year;
    private static String[] nameList = new String[]{
        "IO",
        "Computer System"
    };

    public Categories(){
        this.type = new boolean[nameList.length];
    }

    public String GetName(int index){
        return nameList[index];
    }
}
