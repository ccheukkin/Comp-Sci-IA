package qsf.api;

import qsf.wrapper.*;
import qsf.storing.Storage;
import java.util.LinkedList;
import org.json.simple.JSONObject;

public class QueryInterface {
    private Storage storeSub;

    public QueryInterface(Storage storeSub){
        this.storeSub = storeSub;
    }

    public LinkedList<Packet> QueryPacket(boolean[] type, int[] years, JSONObject options){
        return storeSub.QueryPacket(type, years, options);
    }
    public LinkedList<Question> QueryQuestion(boolean[] type, int[] years, JSONObject options){
        return storeSub.QueryQuestion(type, years, options);
    }
}
