package qsf.extraction;

import qsf.wrapper.*;

public class Change {
    public int changeID;
    public int changeType;  // 0 - add, 1 - delete, 2 - modify
    public Content addContent;
    public Content deleteContent;
    public int contentInd;
    
    public Change(int changeID, Content addContent){
        this.changeID = changeID;
        this.changeType = 0;
        this.addContent = addContent;
    }
    public Change(int changeID, Content deleteContent, int contentInd){
        this.changeID = changeID;
        this.changeType = 1;
        this.deleteContent = deleteContent;
        this.contentInd = contentInd;
    }
    public Change(int changeID, Content addContent, Content deleteContent, int contentInd){
        this.changeID = changeID;
        this.changeType = 2;
        this.addContent = addContent;
        this.deleteContent = deleteContent;
        this.contentInd = contentInd;
    }
}
