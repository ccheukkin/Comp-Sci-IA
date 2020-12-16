package qsf.storing;

import qsf.wrapper.*;
import java.util.LinkedList;
import org.json.simple.JSONObject;

public abstract class Storage {
    public int subclassID;
    public String[] options;
    
    public abstract void Store(LinkedList<Packet> packets);
    public abstract LinkedList<Packet> Get(LinkedList<Integer> packetIDs);
    public abstract LinkedList<Packet> QueryPacket(boolean[] type, int[] years, JSONObject options);
    public abstract LinkedList<Question> QueryQuestion(boolean[] type, int[] years, JSONObject options);
}
