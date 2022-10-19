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
import eu.epitech.area.services.AppInterface;
import eu.epitech.area.services.AppPreference;
import retrofit2.Call;
import retrofit2.Callback;

public class RegisterFragment extends Fragment {
    private static AppInterface appInterface;
    private EditText firstNameInput, lastNameInput, emailInput, passwordInput, passwordCfInput;
    private Button registerBtn;
    private TextView loginBtn;

    public RegisterFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view =  inflater.inflate(R.layout.fragment_registeration, container, false);

        firstNameInput = view.findViewById(R.id.firstNameInput);
        lastNameInput = view.findViewById(R.id.lastNameInput);
        emailInput = view.findViewById(R.id.emailInput);
        passwordInput = view.findViewById(R.id.passwordInput);
        passwordCfInput = view.findViewById(R.id.passwordCfInput);


        registerBtn = view.findViewById(R.id.registerBtn);
        registerBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                registerUser();
            }
        });

        loginBtn = view.findViewById(R.id.loginBtn);
        loginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                appInterface.manageFragment(AppPreference.AppState.LOGIN);
            }
        });
        return view;
    }

    private void registerUser() {
        String firstName = emailInput.getText().toString();
        String lastName = emailInput.getText().toString();
        String email = emailInput.getText().toString();
        String password = emailInput.getText().toString();
        String passwordCf = emailInput.getText().toString();

        if (TextUtils.isEmpty(email) || TextUtils.isEmpty(password)) {
            MainActivity.appPreference.showToast("Please fill all fields before login.");
            return;
        }

        Call<Response.Register> registerCall = MainActivity.apiService.createUser(new Request.RegisterForm(firstName, lastName, email, password, passwordCf));
        registerCall.enqueue(new Callback<Response.Register>() {
            @Override
            public void onResponse(Call<Response.Register> call, retrofit2.Response<Response.Register> response) {
                try {

                    if (response.body().getError() || response.body().getStatus() != 201)
                        throw new Exception(response.body().getMessage());

                    LoginFragment.loginUser(email, password);

                } catch(Throwable exception) {
                    Log.e("PROFILE", exception.getMessage());
                    MainActivity.appPreference.showToast("Register Failed: " + exception.getMessage());
                    passwordInput.setText("");
                }
            }

            @Override
            public void onFailure(Call<Response.Register> call, Throwable exception) {
                Log.e("PROFILE", exception.getMessage());
                MainActivity.appPreference.showToast("Register Failed: " + exception.getMessage());
                passwordInput.setText("");
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
