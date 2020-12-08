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

    public ExtractionInterface(boolean review){
        this.review = review;
        this.extractSub = new Extract[]{new DefaultTextExtract()};
        this.cachedPackets = new ArrayList<Packet>();
        changeIDHead = 0;
    }

    public Packet[] Upload(XWPFDocument doc, JSONArray options){
        XWPFWordExtractor we = new XWPFWordExtractor(doc);
        BackendExtract(we, options);
        if (!review) { Commit(); }
        return cachedPackets.toArray(new Packet[cachedPackets.size()]);
    }
    private LinkedList<Content> BackendExtract(XWPFWordExtractor we, JSONArray options){
        LinkedList<Content> extractedList = new LinkedList<Content>();
        for (int i = 0; i < extractSub.length; i++){
            LinkedList<Content> extracted = extractSub[i].ExtractFrom(we, (JSONObject)options.get(i));
            for (int j = 0; j < extracted.size(); j++){
                AddCommit(extracted.get(j));
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

    public int Delete(int packetID, int questionID, int contentInd){

        return changeIDHead++;
    }
    public void UndoDelete(int changeID){

    }
    private void DeleteCommit(int packetID, int questionID, int contentInd){
        GetPacket(packetID).DeleteContent(questionID, contentInd);
    }

    public int Add(Content newContent){

        return changeIDHead++;
    }
    public void UndoAdd(int changeID){

    }
    private void AddCommit(Content newContent){
        int packetID = newContent.packetID;
        if (!HasPacket(packetID)){
            cachedPackets.add(new Packet(packetID));
        }
        GetPacket(packetID).InsertContent(newContent);
    }

    public int Modify(int packetID, int questionID, int contentInd, JSONObject options){

        return changeIDHead++;
    }
    public void UndoModify(int changeID){

    }
    private void ModifyCommit(int packetID, int questionID, int contentInd, JSONObject options){

    }

    public void ResetChange(){

    }
    public void Commit(){

    }
    private void ReleaseCache(){

    }
}
