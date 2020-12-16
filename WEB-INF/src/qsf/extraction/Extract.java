package qsf.extraction;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.json.simple.*;
import qsf.wrapper.*;
import java.util.LinkedList;

public abstract class Extract{
    private int subclassID;
    private String dataType;
    public String[] extractOptions;
    public String[] modifyOptions;
    
    public abstract LinkedList<Content> ExtractFrom(XWPFWordExtractor wordExtract, JSONObject options);
    public abstract void Modify(Content changeContent, JSONObject options);
    public int GetID(){
        return subclassID;
    }
} 