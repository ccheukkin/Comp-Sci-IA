package qsf.api;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import qsf.wrapper.*;
import qsf.extraction.*;
import java.util.LinkedList;
import java.util.ArrayList;

public class ExtractionInterface {
    public boolean review;
    private Extract[] extractSub;
    private ArrayList<Packet> cachedPackets;
    private int changeIDHead;
    private LinkedList<Change> changeList;

    public ExtractionInterface(boolean review){
        this.review = review;
        this.extractSub = new Extract[]{new DefaultTextExtract()};
        this.cachedPackets = new ArrayList<Packet>();
        this.changeIDHead = 0;
        this.changeList = new LinkedList<Change>();
    }

    public Packet[] Upload(XWPFDocument doc, JSONArray options){
        XWPFWordExtractor we = new XWPFWordExtractor(doc);
        BackendExtract(we, options);
        if (!review) { Complete(); }
        return cachedPackets.toArray(new Packet[cachedPackets.size()]);
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
        for (int i = 0; i < cachedPackets.size(); i++){
            if (cachedPackets.get(i).packetID == packetID){
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
    private Extract GetExtractSub(String name){
        for (int i = 0; i < extractSub.length; i++){
            if (extractSub[i].name == name){
                return extractSub[i];
            }
        }
        return null;
    }
    private void InsertContent(Content newContent){
        int packetID = newContent.packetID;
        if (!HasPacket(packetID)){
            cachedPackets.add(new Packet(packetID));
        }
        GetPacket(packetID).InsertContent(newContent);
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

    public int Modify(Content changeContent, int changeContentInd, JSONObject options){
        changeIDHead++;
        Content newContent = GetExtractSub(changeContent.author).Modify(changeContent, changeContentInd, options);
        Change newChange = new Change(changeIDHead, newContent, changeContent, changeContentInd);
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
                CommitDelete(newChange);
                CommitAdd(newChange);
                break;
        }
    }
    private void CommitAdd(Change newChange){
        InsertContent(newChange.addContent);
    }
    private void CommitDelete(Change newChange){
        Content deleteContent = newChange.deleteContent;
        int packetID = deleteContent.packetID;
        int questionID = deleteContent.questionID;
        int contentInd = newChange.contentInd;
        GetPacket(packetID).DeleteContent(questionID, contentInd);
    }
    public void Complete(){
        for (int i = 0; i < changeList.size(); i++){
            Commit(changeList.get(i));
        }
        ReleaseCache();
    }
    private void ReleaseCache(){
        cachedPackets = new ArrayList<Packet>();
        ResetChange();
    }
}
