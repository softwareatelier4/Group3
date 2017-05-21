package ch.usi.se.group3.emergency_android;


import android.Manifest;
import android.app.Activity;
import android.app.ListActivity;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.TaskStackBuilder;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.EditText;

import org.json.JSONArray;

/**
 * Created by simonreding on 18.05.17.
 */

public class freelancer_list extends Activity {
    ListViewHandler lvh;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.freelancer_display);
        JSONArray freelancers = FreelancerDataHolder.getFreelancers();
//        Log.v("freelancers:",freelancers.toString());
        lvh=new ListViewHandler(this);
    }

    public void btn_location(View view){

    }

    public void btn_background(View view){
        Intent intent = new Intent(this, background.class);
        startService(intent);
    }

    public void btn_notification(View view)
    {
        sendNotification("Emergency Android", "Hello world");
    }


    public void sendNotification(String title, String message){
        NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(this)
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setContentTitle(title)
                        .setContentText(message);

        Intent resultIntent = new Intent(this, freelancer_list.class);

        TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);

        stackBuilder.addParentStack(freelancer_list.class);

        stackBuilder.addNextIntent(resultIntent);
        PendingIntent resultPendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);

        mBuilder.setContentIntent(resultPendingIntent);
        NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        mNotificationManager.notify(0, mBuilder.build());
    }

}
