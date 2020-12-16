package qsf.extraction.subclass;

import qsf.extraction.Extract;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import qsf.wrapper.*;
import java.util.LinkedList;
import org.json.simple.JSONObject;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexExtract extends Extract{
    private int subclassID;
    private String dataType;
    public String[] extractOptions;
    public String[] modifyOptions;

    public RegexExtract(){
        this.subclassID = 0;
        this.dataType = "String";
        this.extractOptions = new String[]{};
        this.modifyOptions = new String[]{"newText"};
    }

    public LinkedList<Content> ExtractFrom(XWPFWordExtractor wordExtract, JSONObject options){
        String docText = wordExtract.getText();
        Pattern pattern = Pattern.compile("");
        Matcher matcher = pattern.matcher(docText);
        LinkedList<Content> extracted = new LinkedList<Content>();
        while (matcher.find()){
            
            String questionText;
            int packetID;
            int questionID;
            Content newContent = new Content(subclassID, dataType, questionText, packetID, questionID);
            extracted.add(newContent);
        }
    }
    public void Modify(Content changeContent, JSONObject options){
        String newText = (String)options.get("newText");
        changeContent.contentObj = newText;
    }
}
