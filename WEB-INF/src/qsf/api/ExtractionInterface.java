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

    public ExtractionInterface(boolean review){
        this.review = review;
        this.extractSub = new Extract[]{new DefaultTextExtract()};
        this.cachedPackets = new ArrayList<Packet>();
    }

    public Packet[] Upload(XWPFDocument doc, JSONArray options){
        XWPFWordExtractor we = new XWPFWordExtractor(doc);
        Assemble(BackendExtract(we, options));
        if (!review) { Confirm(); }
        return Response();
    }
    private LinkedList<Content> BackendExtract(XWPFWordExtractor we, JSONArray options){
        LinkedList<Content> extractedList = new LinkedList<Content>();
        for (int i = 0; i < extractSub.length; i++){
            LinkedList<Content> extracted = extractSub[i].ExtractFrom(we, (JSONObject)options.get(i));
            for (int j = 0; j < extracted.size(); j++){
                extractedList.add(extracted.get(j));
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
    private void Assemble(LinkedList<Content> contents){
        for (int i = 0; i < contents.size(); i++){
            Content newContent = contents.get(i);
            int packetID = newContent.packetID;
            if (!HasPacket(packetID)){
                cachedPackets.add(new Packet(packetID));
            }
            GetPacket(packetID).InsertContent(newContent);
        }
    }
    private Packet[] Response(){
        return cachedPackets.toArray(new Packet[cachedPackets.size()]);
    }
    public void Modify(String author, JSONObject options){

    }
    public void Confirm(){

    }
}
