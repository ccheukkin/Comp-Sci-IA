package qsf.wrapper;

import java.util.LinkedList;
import qsf.sorting.wrapper.Categories;

public class Question {
    public LinkedList<Content> contents;
    public Categories type;
    public int packetID;
    public int questionID;

    public Question(int packetID, int questionID){
        this.contents = new LinkedList<Content>();
        this.packetID = packetID;
        this.questionID = questionID;
        this.type = new Categories();
    }

    public void InsertContent(Content newContent){
        contents.add(newContent);
    }
    public void DeleteContent(int contentInd){
        contents.remove(contentInd);
    }
}
