package qsf.extraction;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;

import qsf.wrapper.Content;

// class definition for content extraction class
public abstract class Extract{
    public String dataType;
    public String options;
    public abstract Content ExtractFrom(XWPFWordExtractor wordExtract, int[] options);
} 