package run.wrapper;

public class Content {
    public String dataType;
    public Object contentObj;
    public int globalID;
    public int localID;
    public Content(String dataType, Object contentObj, int globalID, int localID){
        this.dataType = dataType;
        this.contentObj = contentObj;
        this.globalID = globalID;
        this.localID = localID;
    }
}
