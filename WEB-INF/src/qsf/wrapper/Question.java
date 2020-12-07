package qsf.wrapper;

import java.util.LinkedList;

public class Question {
    public LinkedList<Content> contents;
    public int[] categories;
    public int year;
    public int packetID;
    public int questionID;

    public Question(int packetID, int questionID){
        this.contents = new LinkedList<Content>();
        this.packetID = packetID;
        this.questionID = questionID;
    }

    public void setYear(int year){
        this.year = year;
    }
    public void setCategories(int[] categories) {
        this.categories = categories;
    }
    public void InsertContent(Content newContent){
        contents.add(newContent);
    }
}
