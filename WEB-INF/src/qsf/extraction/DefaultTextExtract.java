package qsf.extraction;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import qsf.wrapper.*;

public class DefaultTextExtract extends Extract{
    public String name;
    public String dataType;
    public String[] options;

    public DefaultTextExtract(){
        this.name = "Question Text Extractor";
        this.dataType = "String";
        this.options = new String[]{};
    }

    public Content[] ExtractFrom(XWPFWordExtractor wordExtract, int[] options){
        
    }
}
