package ch.usi.se.group3.emergency_android;


import android.Manifest;
import android.app.Activity;
import android.app.ListActivity;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.TaskStackBuilder;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;


import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.FusedLocationProviderApi;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResult;
import com.google.android.gms.location.LocationSettingsStates;
import com.google.android.gms.location.LocationSettingsStatusCodes;

import org.json.JSONArray;

/**
 * Created by simonreding on 18.05.17.
 */


public class freelancer_list extends Activity implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener,
        com.google.android.gms.location.LocationListener {

    GoogleApiClient googleApiClient;
    Location lastLocation;
    LocationRequest locationRequest;
    FusedLocationProviderApi fusedLocationProviderApi;
    ListViewHandler lvh;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.freelancer_display);
        lvh=new ListViewHandler(this);
        getLocation();
    }

    public void btn_location(View view) {
        getLocation();
        if(lastLocation != null){
            Toast.makeText(getBaseContext(), "location (null) :"+lastLocation.getLatitude()+" , "+lastLocation.getLongitude(), Toast.LENGTH_SHORT).show();
            FreelancerDataHolder.setLocation(lastLocation.getLatitude(),lastLocation.getLongitude());
        }
    }

    public void onConnectionSuspended(int cause) {
        Toast.makeText(getApplicationContext(), "Supended Connection", Toast.LENGTH_SHORT).show();
    }


    private void getLocation() {
        locationRequest = LocationRequest.create();
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        locationRequest.setInterval(10000);
        locationRequest.setFastestInterval(5000);
        fusedLocationProviderApi = LocationServices.FusedLocationApi;
        googleApiClient = new GoogleApiClient.Builder(this)
                .addApi(LocationServices.API)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .build();
        if (googleApiClient != null) {
            googleApiClient.connect();
        }

    }

    @Override
    public void onConnected(Bundle arg0) {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            Toast.makeText(getApplicationContext(), "Rej. Connection", Toast.LENGTH_SHORT).show();
            return;
        }
        fusedLocationProviderApi.requestLocationUpdates(googleApiClient, locationRequest, this);
        lastLocation = fusedLocationProviderApi.getLastLocation(googleApiClient);
        Toast.makeText(getBaseContext(), "location :"+lastLocation.getLatitude()+" , "+lastLocation.getLongitude(), Toast.LENGTH_SHORT).show();
        FreelancerDataHolder.setLocation(lastLocation.getLatitude(),lastLocation.getLongitude());

    }

    @Override
    public void onLocationChanged(Location location) {
        if(location != null){
            lastLocation = location;
            Toast.makeText(getBaseContext(), "location (update):"+location.getLatitude()+" , "+location.getLongitude(), Toast.LENGTH_SHORT).show();
            FreelancerDataHolder.setLocation(lastLocation.getLatitude(),lastLocation.getLongitude());
        }else{
            Toast.makeText(getBaseContext(), "location (null) :"+location.getLatitude()+" , "+location.getLongitude(), Toast.LENGTH_SHORT).show();

        }
   }

    public void onConnectionFailed(ConnectionResult result){
        Toast.makeText(getApplicationContext(),"Failed Connection",Toast.LENGTH_SHORT).show();
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
