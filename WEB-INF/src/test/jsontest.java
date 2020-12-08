package test;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.json.simple.JSONObject;

public class jsontest {
    public static void main(String[] args) throws ParseException {
        JSONParser parser = new JSONParser();
        String str = "{\"packetID\":1,\"questionID\":2,\"contentInd\":3}";
        JSONObject json = (JSONObject) parser.parse(str);
        int cast = ((Long)json.get("packetID")).intValue();
        System.out.println(cast);
    }
}