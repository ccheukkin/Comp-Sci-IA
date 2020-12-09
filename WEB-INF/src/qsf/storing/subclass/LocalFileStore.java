package qsf.storing.subclass;

import qsf.storing.Storage;
import qsf.wrapper.*;
import java.util.LinkedList;
import org.json.simple.JSONObject;

public class LocalFileStore extends Storage{
    public LocalFileStore(){
        
    }
    
    public void Store(LinkedList<Packet> packets){

    }
    public LinkedList<Packet> Get(LinkedList<Integer> packetIDs){
        
    }
    public LinkedList<Packet> QueryPacket(boolean[] type, int[] years, JSONObject options){

    }
    public LinkedList<Question> QueryQuestion(boolean[] type, int[] years, JSONObject options){

    }
}
