package qsf.sorting.wrapper;

import qsf.wrapper.Question;

public class Change {
    public int changeID;
    public boolean[] changeType;
    public Question sortQuestion;

    public Change(int changeID, Question sortQuestion, boolean[] changeType){
        this.changeID = changeID;
        this.sortQuestion = sortQuestion;
        this.changeType = changeType;
    }
}
