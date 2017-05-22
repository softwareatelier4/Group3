package ch.usi.se.group3.emergency_android;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Created by alexandercamenzind on 21/05/2017.
 */

public class FreelancerDataHolder {
    private static JSONArray freelancers;
    private static String userId;
    private static String ip;
    private static double lat;
    private static double lng;
    public static void setFreelancers(JSONArray data){
        freelancers = data;
    }
    public static JSONArray getFreelancers(){
        return freelancers;
    };

    public static String getIp() {
        return ip;
    }

    public static void setIp(String ip) {
        FreelancerDataHolder.ip = ip;
    }

    public static void setLocation(double latitude, double longitude) {
        FreelancerDataHolder.lat = latitude;
        FreelancerDataHolder.lng = longitude;
    }

    public static double getLat(){
        return  FreelancerDataHolder.lat;
    }

    public static double getLng(){
        return  FreelancerDataHolder.lng;
    }
}
