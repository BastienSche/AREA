package eu.epitech.area.fragments;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.fragment.app.Fragment;

import java.util.Arrays;
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

public class AreaCreateFragment extends Fragment {
    private AppInterface appInterface;
    private Button createBtn, areaBtn;
    private EditText titleInput;
    private Context context;

    private Spinner acSpinner, reacSpinner;
    private List<Response.Action> actions, reactions;
    private Response.Action currAction, currREAction;


    public AreaCreateFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view =  inflater.inflate(R.layout.fragment_area_create, container, false);

        acSpinner = (Spinner) view.findViewById(R.id.actionSpinner);
        reacSpinner = (Spinner) view.findViewById(R.id.reactionSpinner);
        context = inflater.getContext();

        titleInput = view.findViewById(R.id.titleInput);

        fillSpinnerData();

        createBtn = view.findViewById(R.id.createBtn);
        createBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                createArea(titleInput.getText().toString());
                //appInterface.manageFragment(AppPreference.AppState.AREA);
            }
        });

        areaBtn = view.findViewById(R.id.areaBtn);
        areaBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                appInterface.manageFragment(AppPreference.AppState.AREA);
            }
        });

        return view;
    }

    private void createArea(String title) {
        if (TextUtils.isEmpty(title) || currAction == null || currREAction == null) {
            MainActivity.appPreference.showToast("Please fill all fields before create area.");
            return;
        }
        Session session = MainActivity.appPreference.getSession();

        Request.ActionForm action = new Request.ActionForm(currAction.getName(), currAction.getDesc(), currAction.getService());
        Request.ActionForm reaction = new Request.ActionForm(currREAction.getName(), currREAction.getDesc(), currREAction.getService());

        Call<Response.SelfArea> servicesCall = MainActivity.apiService.createArea(session.getId(), session.getAccessToken(), new Request.CreateAreaForm(title, action, reaction));
        servicesCall.enqueue(new Callback<Response.SelfArea>() {
            @Override
            public void onResponse(Call<Response.SelfArea> call, retrofit2.Response<Response.SelfArea> response) {
                try {
                    Log.d("CREATE AREA", response.toString());

                    if (response.body().getError() || response.body().getStatus() != 201)
                        throw new Exception(response.body().getMessage());

                    appInterface.manageFragment(AppPreference.AppState.AREA);
                } catch(Throwable exception) {
                    String errMessage = exception.getMessage();
                    Log.e("CREATE AREA", errMessage);
                    MainActivity.appPreference.showToast("Area Failed: " + exception.getMessage());
                }
            }

            @Override
            public void onFailure(Call<Response.SelfArea> call, Throwable exception) {
                Log.e("CREATE AREA", exception.getMessage());
                MainActivity.appPreference.showToast("Area Failed: " + exception.getMessage());
            }
        });
    }

    private void fillSpinnerData() {
        Call<Response.Services> servicesCall = MainActivity.apiService.getServices();
        servicesCall.enqueue(new Callback<Response.Services>() {
            @Override
            public void onResponse(Call<Response.Services> call, retrofit2.Response<Response.Services> response) {
                try {
                    Log.d("SERVICES", response.toString());

                    if (response.body().getError() || response.body().getStatus() != 200)
                        throw new Exception(response.body().getMessage());

                    actions = response.body().getActions();
                    reactions = response.body().getREActions();

                    String[] actionsPaths = new String[actions.size()];
                    for (int i = 0; i < actions.size(); i++)
                        actionsPaths[i] = actions.get(i).getService().toUpperCase() + ":\n" + actions.get(i).getDesc();

                    ArrayAdapter<String> acAdapter = new ArrayAdapter<String>(context, android.R.layout.simple_spinner_item, actionsPaths);
                    acAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    acSpinner.setAdapter(acAdapter);
                    acSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                        public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                            currAction = actions.get(parentView.getSelectedItemPosition());
                        }
                        public void onNothingSelected(AdapterView<?> parentView) {
                            currAction = null;
                        }
                    });

                    String[] reactionsPaths = new String[reactions.size()];
                    for (int i = 0; i < reactions.size(); i++)
                        reactionsPaths[i] = reactions.get(i).getService().toUpperCase() + ":\n" + reactions.get(i).getDesc();

                    ArrayAdapter<String> reacAdapter = new ArrayAdapter<String>(context, android.R.layout.simple_spinner_item, reactionsPaths);
                    reacAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    reacSpinner.setAdapter(reacAdapter);
                    reacSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                        public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                            currREAction = reactions.get(parentView.getSelectedItemPosition());
                        }
                        public void onNothingSelected(AdapterView<?> parentView) {
                            currREAction = null;
                        }
                    });
                } catch(Throwable exception) {
                    String errMessage = exception.getMessage();
                    Log.e("SERVICES", errMessage);
                    MainActivity.appPreference.showToast("Services Failed: " + exception.getMessage());
                }
            }

            @Override
            public void onFailure(Call<Response.Services> call, Throwable exception) {
                Log.e("SERVICES", exception.getMessage());
                MainActivity.appPreference.showToast("Services Failed: " + exception.getMessage());
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
