package run.extraction;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;

// class definition for content extraction class
public abstract class Extract{
    public abstract void ExtractFrom(XWPFWordExtractor wordExtract);
    protected abstract void UnsortedStore();
} 