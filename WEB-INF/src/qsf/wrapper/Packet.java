package qsf.wrapper;

import java.util.LinkedList;

public class Packet {
    public LinkedList<Question> questions;
    public int packetID;

    public Packet(int packetID){
        questions = new LinkedList<Question>();
        this.packetID = packetID;
    }

    private boolean HasQuestion(int questionID){
        for (int i = 0; i < questions.size(); i++){
            if (questions.get(i).questionID == questionID){
                return true;
            }
        }
        return false;
    }
    private Question GetQuestion(int questionID){
        for (int i = 0; i < questions.size(); i++){
            Question curQuestion = questions.get(i);
            if (curQuestion.questionID == questionID){
                return curQuestion;
            }
        }
        return null;
    }
    public void InsertContent(Content newContent){
        int questionID = newContent.questionID;
        if (!HasQuestion(questionID)){
            questions.add(new Question(packetID, questionID));
        }
        GetQuestion(questionID).InsertContent(newContent);
    }
}
