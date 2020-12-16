package qsf.extraction.wrapper;

import qsf.wrapper.*;
import org.json.simple.JSONObject;

public class Change {
    public int changeID;
    public int changeType;  // 0 - add, 1 - delete, 2 - modify
    public Content targetContent;
    public int contentInd;
    public JSONObject options;
    
    public Change(int changeID, Content addContent){
        this.changeID = changeID;
        this.changeType = 0;
        this.targetContent = addContent;
    }
    public Change(int changeID, Content deleteContent, int contentInd){
        this.changeID = changeID;
        this.changeType = 1;
        this.targetContent = deleteContent;
        this.contentInd = contentInd;
    }
    public Change(int changeID, Content changeContent, JSONObject options){
        this.changeID = changeID;
        this.changeType = 2;
        this.targetContent = changeContent;
        this.options = options;
    }
}
