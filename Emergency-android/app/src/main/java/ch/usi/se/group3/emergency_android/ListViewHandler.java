package ch.usi.se.group3.emergency_android;

import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

/**
 * Created by alexandercamenzind on 21/05/2017.
 */

public class ListViewHandler {
    ListView listView;
    public ListViewHandler(freelancer_list fl){
        listView=(ListView) fl.findViewById(R.id.list);
        String[] values = new String[] { "Android List View",
                "Adapter implementation",
                "Simple List View In Android",
                "Create List View Android",
                "Android Example",
                "List View Source Code",
                "List View Array Adapter",
                "Android Example List View"
        };
        Integer[]a = new Integer[FreelancerDataHolder.getFreelancers().length()];
        Log.v("arraylength",""+a.length);
        ArrayAdapter<Integer> arrayAdapter = new FreelancerListViewAdapter(fl.getApplicationContext(),R.layout.freelancer_item,a,fl);

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(fl,
                android.R.layout.simple_list_item_1, android.R.id.text1, values);
        listView.setAdapter(arrayAdapter);
    }
}
