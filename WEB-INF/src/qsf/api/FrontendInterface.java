package qsf.api;

public class FrontendInterface {
    public ExtractionInterface extract;
    public SortingInterface sort;
    public QueryInterface query;

    public FrontendInterface(){
        this.extract = new ExtractionInterface();
        this.sort = new SortingInterface();
        this.query = new QueryInterface();
    }
}
