package qsf.api;

import qsf.extraction.Extract;
import qsf.extraction.subclass.*;
import qsf.sorting.Sort;
import qsf.sorting.subclass.*;
import qsf.storing.Storage;
import qsf.storing.subclass.*;

public class FrontendInterface {
    public ExtractionInterface extract;
    public SortingInterface sort;
    public QueryInterface query;
    public Extract[] extractSub;
    public Sort sortSub;
    public Storage storeSub;
    public boolean extractionReview;
    public boolean sortingReview;
    public boolean instaExtractionReview;
    public boolean instaSortingReview;

    public FrontendInterface(){
        this.extractionReview = true;
        this.sortingReview = true;
        this.instaExtractionReview = true;
        this.instaSortingReview = true;
        this.extractSub = new Extract[]{new DefaultTextExtract()};
        this.sortSub = new KeywordSort();
        this.storeSub = new LocalFileStore();
        
        this.extract = new ExtractionInterface(extractSub, storeSub);
        this.sort = new SortingInterface();
        this.query = new QueryInterface();
    }
}
