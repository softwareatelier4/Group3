package ch.usi.se.group3.emergency_android;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Created by alexandercamenzind on 21/05/2017.
 */

public class FreelancerDataHolder {
    private static JSONArray freelancers;
    private static String userId;
    public static void setFreelancers(JSONArray data){
        freelancers = data;
    }
    public static JSONArray getFreelancers(){
        return freelancers;
    };
}
