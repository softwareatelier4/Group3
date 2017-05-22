package ch.usi.se.group3.emergency_android;

import android.content.Context;
import android.os.Handler;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CompoundButton;
import android.widget.TextView;
import android.widget.ToggleButton;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by alexandercamenzind on 21/05/2017.
 */

public class FreelancerListViewAdapter extends ArrayAdapter<Integer> {
    Context context;
    freelancer_list fl;
    LayoutInflater mInflater;
    public FreelancerListViewAdapter(@NonNull Context context, @LayoutRes int resource, @NonNull Integer[] lengthArray, freelancer_list fl) {
        super(context,resource,lengthArray);
        Log.v("here","here123");
        this.context=context;
        this.fl =fl;
        mInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }
    public View getView(int position, View view, ViewGroup parent){
        View v=null;
        try {
            v = mInflater.inflate(R.layout.freelancer_item,parent,false);
            JSONObject o = FreelancerDataHolder.getFreelancers().getJSONObject(position);
            TextView textView = (TextView) v.findViewById(R.id.firstLine);
            textView.setText(o.getString("job"));

            TextView textView2 = (TextView) v.findViewById(R.id.secondLine);
            textView2.setText(o.getString("firstName"));
            ToggleButton toggle = (ToggleButton) v.findViewById(R.id.toggleButton);
            toggle.setOnCheckedChangeListener(new ClickHandler(o.getString("_id"),this.fl));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return v;
    }

}

class ClickHandler implements CompoundButton.OnCheckedChangeListener{
    String id;
    freelancer_list fl;
    Handler h;
    public ClickHandler(String id, freelancer_list fl){
        this.id = id;
        this.fl = fl;
        h = new Handler();
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        RequestQueue queue = Volley.newRequestQueue(fl);

        //send available signal
        String url="http://" + FreelancerDataHolder.getIp() + ":4000/freelancer/setAvailable/"+this.id;
        if (isChecked) {
            Log.v("checked","checked"+this.id);
            url+="?available=true";

        } else {//send not available signal
            // The toggle is disabled
            Log.v("checked","not checked");
            url+="?available=false";
        }

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.v("success","success");
                        h.postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                Log.v("d","asfd");
                                fl.sendNotification("hribpiubuasdf","aslkfjdn");
                            }
                        },10000);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.v("no success","no success");
            }
        });
        queue.add(stringRequest);
    }
}
