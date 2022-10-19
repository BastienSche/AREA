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

public class LoginFragment extends Fragment {
    private static AppInterface appInterface;
    private EditText emailInput;
    private static EditText passwordInput;
    private Button loginBtn;
    private TextView registerBtn, titleView;

    public LoginFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view =  inflater.inflate(R.layout.fragment_login, container, false);

        emailInput = view.findViewById(R.id.emailInput);
        passwordInput = view.findViewById(R.id.passwordInput);
        loginBtn = view.findViewById(R.id.loginBtn);
        loginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String email = emailInput.getText().toString();
                String password = passwordInput.getText().toString();
                loginUser(email, password);
            }
        });

        registerBtn = view.findViewById(R.id.registerBtn);
        registerBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                appInterface.manageFragment(AppPreference.AppState.REGISTER);
            }
        });
        return view;
    }

    public static void loginUser(String email, String password) {

        if (TextUtils.isEmpty(email) || TextUtils.isEmpty(password)) {
            MainActivity.appPreference.showToast("Please fill all fields before login.");
            return;
        }

        Call<Response.Login> sessionCall = MainActivity.apiService.login(new Request.LoginForm(email, password));
        sessionCall.enqueue(new Callback<Response.Login>() {
            @Override
            public void onResponse(Call<Response.Login> call, retrofit2.Response<Response.Login> response) {
                try {
                    Log.d("LOGIN", response.toString());

                    if (response.body().getError() || response.body().getStatus() != 200)
                        throw new Exception(response.body().getMessage());

                    MainActivity.appPreference.setSession(response.body().getSession().getId(),
                            response.body().getSession().getAccessToken(),
                            response.body().getSession().getRefreshToken());
                    appInterface.loadSession();

                } catch(Throwable exception) {
                    Log.e("LOGIN", exception.getMessage());
                    MainActivity.appPreference.showToast("User Failed: " + exception.getMessage());
                    passwordInput.setText("");
                }
            }

            @Override
            public void onFailure(Call<Response.Login> call, Throwable exception) {
                Log.e("LOGIN", exception.getMessage());
                MainActivity.appPreference.showToast("User Failed: " + exception.getMessage());
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
