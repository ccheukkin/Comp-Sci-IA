package qsf.sorting;

import qsf.wrapper.*;
import org.json.simple.JSONObject;

public abstract class Sort {
    public int subclassID;
    public String[] options;
    
    public abstract void Categorize(Packet packet, JSONObject options);
}
