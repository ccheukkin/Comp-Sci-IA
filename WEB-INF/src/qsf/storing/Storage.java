package qsf.storing;

import qsf.wrapper.*;
import java.util.ArrayList;

public abstract class Storage {
    public abstract void Store(ArrayList<Packet> packets);
    public abstract Question[] Query(int[] categories, int year, int queryMode);
}
