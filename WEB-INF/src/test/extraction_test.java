package test;

import java.io.FileInputStream;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

public class extraction_test{
    public static void main(String[] args)throws Exception {
        XWPFDocument docx = new XWPFDocument(new FileInputStream("WEB-INF/classes/test/resources/paper.docx"));
      
        XWPFWordExtractor we = new XWPFWordExtractor(docx);
        System.out.println(we.getText());
        we.close();
    }
}

// run in web-inf

// javac -cp "lib/poi/*:lib/poi/lib/*:lib/poi/ooxml-lib/*" src/test/extraction_test.java -d classes
// java -cp "classes:lib/poi/*:lib/poi/lib/*:lib/poi/ooxml-lib/*" test.extraction_test




