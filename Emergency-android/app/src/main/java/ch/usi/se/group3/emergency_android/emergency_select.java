package ch.usi.se.group3.emergency_android;

import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class emergency_select extends AppCompatActivity {
    public void exampleFunction(View view) throws org.json.JSONException {

        EditText username = (EditText) findViewById(R.id.editText2);
        EditText password = (EditText) findViewById(R.id.pweditText);
        EditText ip = (EditText) findViewById(R.id.editIP);


        JSONObject o = new JSONObject("{'userName':'"+ username.getText()+"','password':'"+  password.getText()+"'}");
        String url ="http://" + ip.getText()+ ":4000/userRouting/login";

        JsonObjectRequest req = new JsonObjectRequest(Request.Method.POST, url, o,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response)  {

                        try {
                            EditText ip = (EditText) findViewById(R.id.editIP);
                            FreelancerDataHolder.setFreelancers(response.getJSONArray("freelancers"));
                            FreelancerDataHolder.setIp(ip.getText().toString());
                            startActivity(new Intent(getApplicationContext(), freelancer_list.class));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.v("error", error.toString());



                        Context context = getApplicationContext();
                        CharSequence text = "Wrong IP or Credentials!";
                        int duration = Toast.LENGTH_SHORT;
                        Toast toast = Toast.makeText(context, text, duration);
                        toast.show();

                        EditText username = (EditText) findViewById(R.id.editText2);
                        username.setText("");
                        EditText password = (EditText) findViewById(R.id.pweditText);
                        password.setText("");

                    }
                });
        RequestQueue queue = Volley.newRequestQueue(this);

        queue.add(req);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_emergency_select);
    }

    /**
     * A native method that is implemented by the 'native-lib' native library,
     * which is packaged with this application.
     */
//    public native String stringFromJNI();

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
    }
}
