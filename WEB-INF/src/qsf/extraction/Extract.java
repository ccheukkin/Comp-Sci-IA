package qsf.extraction;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.json.simple.*;
import qsf.wrapper.*;

public abstract class Extract{
    public String dataType;
    public String[] options;
    public abstract Content[] ExtractFrom(XWPFWordExtractor wordExtract, JSONObject options);
} 