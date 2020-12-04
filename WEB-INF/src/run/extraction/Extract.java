package run.extraction;

import run.wrapper.Content;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;

// class definition for content extraction class
public abstract class Extract{
    public abstract Content ExtractFrom(XWPFWordExtractor wordExtract);
} 