package eu.epitech.area.fragments;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import androidx.fragment.app.Fragment;

import java.util.List;

import eu.epitech.area.R;
import eu.epitech.area.activity.MainActivity;
import eu.epitech.area.activity.Popup;
import eu.epitech.area.models.Request;
import eu.epitech.area.models.Response;
import eu.epitech.area.models.Session;
import eu.epitech.area.services.AppInterface;
import eu.epitech.area.services.AppPreference;
import retrofit2.Call;
import retrofit2.Callback;

public class AreaFragment extends Fragment {
    private int idx = 0;
    private AppInterface appInterface;
    private Button createBtn, profileBtn;
    private LinearLayout areaLayout;

    private ViewGroup container;
    private LayoutInflater inflater;


    public AreaFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view =  inflater.inflate(R.layout.fragment_area, container, false);

        profileBtn = view.findViewById(R.id.profileBtn);
        profileBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                appInterface.manageFragment(AppPreference.AppState.PROFILE);
            }
        });

        createBtn = view.findViewById(R.id.createBtn);
        createBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                appInterface.manageFragment(AppPreference.AppState.AREA_CREATE);
            }
        });

        areaLayout = view.findViewById(R.id.areaLayout);
        this.container = container;
        this.inflater = inflater;
        getArea();
        return view;
    }

    private void loadArea(List<Response.Area> areaList) {
        areaLayout.removeAllViewsInLayout();

        for (idx = 0; idx < areaList.size(); idx++) {

            View areaItem = inflater.inflate(R.layout.area_item, container, false);

            TextView areaTitle = (TextView) areaItem.findViewById(R.id.areaTitle);
            areaTitle.setText(areaList.get(idx).getTitle());

            TextView areaAction = (TextView) areaItem.findViewById(R.id.areaAction);
            areaAction.setText("ACTION: " + areaList.get(idx).getAction().getName());

            TextView areaActionDesc = (TextView) areaItem.findViewById(R.id.areaActionDesc);
            areaActionDesc.setText(areaList.get(idx).getAction().getDesc());

            TextView areaREAction = (TextView) areaItem.findViewById(R.id.areaREAction);
            areaREAction.setText("REACTION: " + areaList.get(idx).getREAction().getName());

            TextView areaREActionDesc = (TextView) areaItem.findViewById(R.id.areaREActionDesc);
            areaREActionDesc.setText(areaList.get(idx).getREAction().getDesc());

            Button rmBtn = (Button) areaItem.findViewById(R.id.removeAreaBtn);
            rmBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    removeArea(areaList.get(idx-1).getId());
                }
            });

            Button editBtn = (Button) areaItem.findViewById(R.id.editAreaBtn);
            editBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Popup.showPopup(inflater, container,"test message");
                }
            });
            areaItem.getLayoutParams().width = ViewGroup.LayoutParams.MATCH_PARENT;
            areaLayout.addView(areaItem);
        }
    }

    private void getArea() {
        Session session = appInterface.getSession();
        Call<Response.AreaList> areaCall = MainActivity.apiService.getArea(session.getId(), session.getAccessToken());
        areaCall.enqueue(new Callback<Response.AreaList>() {
            @Override
            public void onResponse(Call<Response.AreaList> call, retrofit2.Response<Response.AreaList> response) {
                try {
                    Log.d("AREA LIST", response.toString());

                    if (response.body().getError() || response.body().getStatus() != 200)
                        throw new Exception(response.body().getMessage());

                    loadArea(response.body().getAreaList());
                } catch(Throwable exception) {
                    String errMessage = exception.getMessage();
                    Log.e("AREA", errMessage);
                    if (errMessage.equals("Your token is invalide or expired.")) {
                        appInterface.refreshSession();
                        getArea();
                    } else
                        MainActivity.appPreference.showToast("Area Failed: " + exception.getMessage());
                }
            }

            @Override
            public void onFailure(Call<Response.AreaList> call, Throwable exception) {
                Log.e("AREA", exception.getMessage());
                MainActivity.appPreference.showToast("Area Failed: " + exception.getMessage());
            }
        });
    }

    private void removeArea(String id) {
        Session session = appInterface.getSession();
        Call<Response.SelfArea> areaCall = MainActivity.apiService.removeArea(session.getId(), session.getAccessToken(), new Request.RemoveAreaForm(id));
        areaCall.enqueue(new Callback<Response.SelfArea>() {
            @Override
            public void onResponse(Call<Response.SelfArea> call, retrofit2.Response<Response.SelfArea> response) {
                try {
                    Log.d("AREA LIST", response.toString());

                    if (response.body().getError() || response.body().getStatus() != 200)
                        throw new Exception(response.body().getMessage());

                    getArea();
                } catch(Throwable exception) {
                    String errMessage = exception.getMessage();
                    Log.e("AREA", errMessage);
                    if (errMessage.equals("Your token is invalide or expired.")) {
                        appInterface.refreshSession();
                        removeArea(id);
                    } else
                        MainActivity.appPreference.showToast("Area Failed: " + exception.getMessage());
                }
            }

            @Override
            public void onFailure(Call<Response.SelfArea> call, Throwable exception) {
                Log.e("AREA", exception.getMessage());
                MainActivity.appPreference.showToast("Area Failed: " + exception.getMessage());
            }
        });
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        Activity activity = (Activity) context;
        appInterface = (AppInterface) activity;
    }

}
