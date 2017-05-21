package ch.usi.se.group3.emergency_android;

import android.content.Context;
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
            toggle.setOnCheckedChangeListener(new ClickHandler());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return v;
    }

}

class ClickHandler implements CompoundButton.OnCheckedChangeListener{
    public ClickHandler(String id){

    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked) {
            Log.v("checked","checked");
        } else {
            // The toggle is disabled
            Log.v("checked","not checked");
        }
    }
}
