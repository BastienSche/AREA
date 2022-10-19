package eu.epitech.area.fragments;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.fragment.app.Fragment;

import eu.epitech.area.R;
import eu.epitech.area.activity.MainActivity;
import eu.epitech.area.models.Request;
import eu.epitech.area.models.Response;
import eu.epitech.area.models.Session;
import eu.epitech.area.services.AppInterface;
import eu.epitech.area.services.AppPreference;
import retrofit2.Call;
import retrofit2.Callback;

public class ProfileFragment extends Fragment {
    private AppInterface appInterface;
    Button updateBtn, areaBtn, logoutBtn;
    EditText firstNameInput, lastNameInput, emailInput;

    public ProfileFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view =  inflater.inflate(R.layout.fragment_profile, container, false);
        firstNameInput = view.findViewById(R.id.firstNameInput);
        firstNameInput.setText(MainActivity.user.getFirstName());

        lastNameInput = view.findViewById(R.id.lastNameInput);
        lastNameInput.setText(MainActivity.user.getLastName());

        emailInput = view.findViewById(R.id.emailInput);
        emailInput.setText(MainActivity.user.getEmail());

        updateBtn = view.findViewById(R.id.updateBtn);
        updateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                updatePersonalInformation(firstNameInput.getText().toString(), lastNameInput.getText().toString(), emailInput.getText().toString());
            }
        });

        areaBtn = view.findViewById(R.id.areaBtn);
        areaBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                appInterface.manageFragment(AppPreference.AppState.AREA);
            }
        });

        logoutBtn = view.findViewById(R.id.logoutBtn);
        logoutBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                appInterface.resetSession();
            }
        });

        return view;
    }

    private void updatePersonalInformation(String firstName, String lastName, String email) {

        if (TextUtils.isEmpty(email) || TextUtils.isEmpty(firstName) || TextUtils.isEmpty(lastName)) {
            MainActivity.appPreference.showToast("Please fill all fields before login.");
            return;
        }

        Session session = appInterface.getSession();
        Call<Response.SelfUser> sessionCall = MainActivity.apiService.updatePersonalInfo(session.getId(), session.getAccessToken(), new Request.PersonalDataForm(firstName, lastName, email));
        sessionCall.enqueue(new Callback<Response.SelfUser>() {
            @Override
            public void onResponse(Call<Response.SelfUser> call, retrofit2.Response<Response.SelfUser> response) {
                try {
                    Log.d("PERSONAL DATA", response.toString());

                    if (response.body().getError() || response.body().getStatus() != 200)
                        throw new Exception(response.body().getMessage());

                    appInterface.loadSession();
                    MainActivity.appPreference.showToast("Personal Data successfully update !");

                } catch(Throwable exception) {
                    Log.e("PERSONAL DATA", exception.getMessage());
                    MainActivity.appPreference.showToast("Personal Data Failed: " + exception.getMessage());
                }
            }

            @Override
            public void onFailure(Call<Response.SelfUser> call, Throwable exception) {
                Log.e("PERSONAL DATA", exception.getMessage());
                MainActivity.appPreference.showToast("Personal Data Failed: " + exception.getMessage());
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
