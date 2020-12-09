package qsf.api;

import qsf.sorting.Sort;
import qsf.wrapper.*;
import qsf.sorting.wrapper.*;
import qsf.storing.Storage;
import java.util.LinkedList;
import org.json.simple.JSONObject;

public class SortingInterface {
    private Sort sortSub;
    private LinkedList<Packet> cachedPackets;
    private LinkedList<Integer> cachedPacketIDs;
    private int changeIDHead;
    private LinkedList<Change> changeList;
    private Storage storeSub;

    public SortingInterface(Sort sortSub, Storage storeSub){
        this.sortSub = sortSub;
        this.cachedPackets = new LinkedList<Packet>();
        this.cachedPacketIDs = new LinkedList<Integer>();
        this.changeIDHead = 0;
        this.changeList = new LinkedList<Change>();
        this.storeSub = storeSub;
    }

    public void BackendSorting(LinkedList<Integer> packetIDs, JSONObject options){
        cachedPacketIDs = packetIDs;
        cachedPackets = storeSub.Get(cachedPacketIDs);
        for (int i = 0; i < cachedPackets.size(); i++){
            sortSub.Categorize(cachedPackets.get(i), options);
        }
        storeSub.Store(cachedPackets);
    }
    public LinkedList<Packet> Get(LinkedList<Integer> packetIDs){
        if (!Cached(packetIDs)){
            ReleaseCache();
            cachedPackets = storeSub.Get(packetIDs);
        }
        cachedPacketIDs = packetIDs;
        return cachedPackets;
    }
    public int Modify(Question sortQuestion, boolean[] newType){
        changeIDHead++;
        Change newChange = new Change(changeIDHead, sortQuestion, newType);
        changeList.add(newChange);
        return changeIDHead;
    }
    public void UndoChange(int changeID){
        for (int i = 0; i < changeList.size(); i++){
            if (changeList.get(i).changeID == changeID){
                changeList.remove(i);
            }
        }
    }
    public void ResetChange(){
        changeIDHead = 0;
        changeList = new LinkedList<Change>();
    }
    private void Commit(Change newChange){
        newChange.sortQuestion.type.type = newChange.changeType;
    }
    public void Complete(){
        for (int i = 0; i < changeList.size(); i++){
            Commit(changeList.get(i));
        }
        storeSub.Store(cachedPackets);
        ReleaseCache();
    }
    private void ReleaseCache(){
        cachedPackets = new LinkedList<Packet>();
        cachedPacketIDs = new LinkedList<Integer>();
        ResetChange();
    }
    private boolean Cached(LinkedList<Integer> inputList){
        if (inputList.size() != cachedPacketIDs.size()) { return false; }
        for (int i = 0; i < inputList.size(); i ++){
            if (inputList.get(i) != cachedPacketIDs.get(i)){
                return false;
            }
        }
        return true;
    }
}
