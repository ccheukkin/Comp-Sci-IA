package qsf.storing;

import qsf.wrapper.*;

public abstract class Storage {
    public abstract void UnsortedStore(Content content);
    public abstract Content GetUnsorted();
    public abstract void SortedStore(String input, int[] categories);
    public abstract Question[] Query(int[] categories, int year, int queryMode);
}
