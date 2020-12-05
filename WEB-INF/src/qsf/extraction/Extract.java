package qsf.extraction;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import qsf.wrapper.*;

public abstract class Extract{
    public String dataType;
    public String[] options;
    public abstract Structured[] ExtractFrom(XWPFWordExtractor wordExtract, int[] options);
} 