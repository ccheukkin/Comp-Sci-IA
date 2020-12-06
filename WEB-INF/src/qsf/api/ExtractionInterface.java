package qsf.api;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.json.simple.JSONObject;
import qsf.wrapper.*;
import qsf.extraction.*;

public class ExtractionInterface {
    public boolean review;
    private Extract[] extractSub;

    public ExtractionInterface(boolean review){
        this.review = review;
        this.extractSub = new Extract[]{new DefaultTextExtract()};
    }

    public Packet[] Upload(XWPFDocument doc){

    }
    private Content[] BackendExtract(){
        for (int i = 0; i < extractSub.length; i++){
            
        }
    }
    private Packet[] Assemble(Content[] contents){

    }
    public void Modify(String author, JSONObject options){

    }
    public void Confirm(){

    }
}
