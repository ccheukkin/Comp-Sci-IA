package qsf.extraction;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.json.simple.*;
import qsf.wrapper.*;
import java.util.LinkedList;

public abstract class Extract{
    public String name;
    public String dataType;
    public String[] options;
    public abstract LinkedList<Content> ExtractFrom(XWPFWordExtractor wordExtract, JSONObject options);
    public abstract Content Modify(Content changeContent, int changeContentInd, JSONObject options);
} 