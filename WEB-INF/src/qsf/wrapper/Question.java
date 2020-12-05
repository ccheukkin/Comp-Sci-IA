package qsf.wrapper;

public class Question {
    public Content[] contents;
    public String identifier;
    public int[] categories;
    public int year;

    public Question(String identifier, Content[] contents){
        this.identifier = identifier;
        this.contents = contents;
    }
    public Question(String identifier, Content[] contents, int[] categories, int year){
        this.identifier = identifier;
        this.contents = contents;
        this.categories = categories;
        this.year = year;
    }

    public void setYear(int year){
        this.year = year;
    }
    public void setCategories(int[] categories) {
        this.categories = categories;
    }
}
