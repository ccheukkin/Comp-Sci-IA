package qsf.api;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import qsf.wrapper.*;
import qsf.extraction.Extract;
import qsf.extraction.wrapper.Change;
import qsf.storing.*;
import java.util.LinkedList;

public class ExtractionInterface {
    private Extract[] extractSub;
    private LinkedList<Packet> cachedPackets;
    private LinkedList<Integer> cachedPacketIDs;
    private int changeIDHead;
    private LinkedList<Change> changeList;
    private Storage storeSub;

    public ExtractionInterface(Extract[] extractSub, Storage storeSub){
        this.extractSub = extractSub;
        this.cachedPackets = new LinkedList<Packet>();
        this.cachedPacketIDs = new LinkedList<Integer>();
        this.changeIDHead = 0;
        this.changeList = new LinkedList<Change>();
        this.storeSub = storeSub;
    }

    public LinkedList<Integer> Upload(XWPFDocument doc, JSONArray options){
        XWPFWordExtractor we = new XWPFWordExtractor(doc);
        BackendExtract(we, options);
        storeSub.Store(cachedPackets);
        return Response();
    }
    private LinkedList<Content> BackendExtract(XWPFWordExtractor we, JSONArray options){
        LinkedList<Content> extractedList = new LinkedList<Content>();
        for (int i = 0; i < extractSub.length; i++){
            LinkedList<Content> extracted = extractSub[i].ExtractFrom(we, (JSONObject)options.get(i));
            for (int j = 0; j < extracted.size(); j++){
                InsertContent(extracted.get(j));
            }
        }
        return extractedList;
    }
    private boolean HasPacket(int packetID){
        for (int i = 0; i < cachedPacketIDs.size(); i++){
            if (cachedPacketIDs.get(i) == packetID){
                return true;
            }
        }
        return false;
    }
    private Packet GetPacket(int packetID){
        for (int i = 0; i < cachedPackets.size(); i++){
            Packet curPacket = cachedPackets.get(i);
            if (curPacket.packetID == packetID){
                return curPacket;
            }
        }
        return null;
    }
    private Extract GetExtractSub(int author){
        for (int i = 0; i < extractSub.length; i++){
            if (extractSub[i].GetID() == author){
                return extractSub[i];
            }
        }
        return null;
    }
    private void InsertContent(Content newContent){
        int packetID = newContent.packetID;
        if (!HasPacket(packetID)){
            cachedPackets.add(new Packet(packetID));
            cachedPacketIDs.add(packetID);
        }
        GetPacket(packetID).InsertContent(newContent);
    }
    public LinkedList<Packet> Get(LinkedList<Integer> packetIDs){
        if (!Cached(packetIDs)){
            ReleaseCache();
            cachedPackets = storeSub.Get(packetIDs);
        }
        cachedPacketIDs = packetIDs;
        return cachedPackets;
    }
    public int Delete(Content delContent, int contentInd){
        changeIDHead++;
        Change newChange = new Change(changeIDHead, delContent, contentInd);
        changeList.add(newChange);
        return changeIDHead;
    }
    public int Add(Content newContent){
        changeIDHead++;
        Change newChange = new Change(changeIDHead, newContent);
        changeList.add(newChange);
        return changeIDHead;
    }
    public int Modify(Content changeContent, JSONObject options){
        changeIDHead++;
        Change newChange = new Change(changeIDHead, changeContent, options);
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
        switch(newChange.changeType){
            case 0:
                CommitAdd(newChange);
                break;
            case 1:
                CommitDelete(newChange);
                break;
            case 2:
                CommitModify(newChange);
                break;
        }
    }
    private void CommitAdd(Change newChange){
        InsertContent(newChange.targetContent);
    }
    private void CommitDelete(Change newChange){
        Content deleteContent = newChange.targetContent;
        int packetID = deleteContent.packetID;
        int questionID = deleteContent.questionID;
        int contentInd = newChange.contentInd;
        GetPacket(packetID).DeleteContent(questionID, contentInd);
    }
    private void CommitModify(Change newChange){
        Content changeContent = newChange.targetContent;
        JSONObject options = newChange.options;
        GetExtractSub(changeContent.author).Modify(changeContent, options);
    }
    private LinkedList<Integer> Response(){
        return (LinkedList<Integer>) cachedPacketIDs.clone();
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
