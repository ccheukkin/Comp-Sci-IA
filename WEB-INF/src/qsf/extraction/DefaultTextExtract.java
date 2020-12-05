package qsf.extraction;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import qsf.wrapper.*;

public class DefaultTextExtract extends Extract{
    public String dataType;
    public String[] options;

    public DefaultTextExtract(){
        this.dataType = "String";
        this.options = new String[]{};
    }

    public Structured[] ExtractFrom(XWPFWordExtractor wordExtract, int[] options){
        
    }
}
