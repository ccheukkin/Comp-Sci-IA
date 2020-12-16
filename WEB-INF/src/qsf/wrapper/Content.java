package qsf.wrapper;

public class Content {
    public int author;
    public String dataType;
    public Object contentObj;
    public int packetID;
    public int questionID;
    
    public Content(int author, String dataType, Object contentObj, int packetID, int questionID){
        this.author = author;
        this.dataType = dataType;
        this.contentObj = contentObj;
        this.packetID = packetID;
        this.questionID = questionID;
    }
}
