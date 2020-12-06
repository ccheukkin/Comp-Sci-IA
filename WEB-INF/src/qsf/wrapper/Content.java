package qsf.wrapper;

public class Content {
    public String author;
    public String dataType;
    public Object contentObj;
    public int globalAddress;
    public int localAddress;
    
    public Content(String author, String dataType, Object contentObj, int globalAddress, int localAddress){
        this.author = author;
        this.dataType = dataType;
        this.contentObj = contentObj;
        this.globalAddress = globalAddress;
        this.localAddress = localAddress;
    }
}
