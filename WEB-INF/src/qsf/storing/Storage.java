package qsf.storing;

import qsf.wrapper.*;
import java.util.LinkedList;

public abstract class Storage {
    public abstract void Store(LinkedList<Packet> packets);
    public abstract LinkedList<Packet> Get(LinkedList<Integer> packetIDs);
    public abstract Question[] Query(int[] categories, int year, int queryMode);
}
