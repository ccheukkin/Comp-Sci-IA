package qsf.wrapper;

public class Content {
    public String author;
    public String dataType;
    public Object contentObj;
    public int packetID;
    public int questionID;
    
    public Content(String author, String dataType, Object contentObj, int packetID, int questionID, int ContentID){
        this.author = author;
        this.dataType = dataType;
        this.contentObj = contentObj;
        this.packetID = packetID;
        this.questionID = questionID;
    }
}
