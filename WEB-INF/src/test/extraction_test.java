package test;

import java.io.FileInputStream;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

public class extraction_test{
    public static void main(String[] args)throws Exception {
        XWPFDocument docx = new XWPFDocument(new FileInputStream("WEB-INF/src/test/resources/paper.docx"));
      
        XWPFWordExtractor we = new XWPFWordExtractor(docx);
        System.out.println(we.getText());
        we.close();
    }
}