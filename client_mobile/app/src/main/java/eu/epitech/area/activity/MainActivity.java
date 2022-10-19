package eu.epitech.area.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.os.Bundle;
import android.util.Log;
import android.widget.FrameLayout;

import eu.epitech.area.R;
import eu.epitech.area.contants.Constant;
import eu.epitech.area.fragments.AreaCreateFragment;
import eu.epitech.area.fragments.AreaFragment;
import eu.epitech.area.fragments.LoginFragment;
import eu.epitech.area.fragments.ProfileFragment;
import eu.epitech.area.fragments.RegisterFragment;
import eu.epitech.area.models.Request;
import eu.epitech.area.models.Response;
import eu.epitech.area.models.Session;
import eu.epitech.area.models.User;
import eu.epitech.area.services.APIService;
import eu.epitech.area.services.RetrofitService;
import eu.epitech.area.services.AppInterface;
import eu.epitech.area.services.AppPreference;
import retrofit2.Call;
import retrofit2.Callback;


public class MainActivity extends AppCompatActivity implements AppInterface {
    FrameLayout container_layout;

    public static AppPreference appPreference;
    public static APIService apiService;
    public static User user = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        container_layout = findViewById(R.id.fragment_container);
        appPreference = new AppPreference(this);
        apiService = RetrofitService.getApiClient(Constant.baseUrl.API_BASE_URL)
                                    .create(APIService.class);

        if (savedInstanceState != null)
            return;

        if (appPreference.getState() != AppPreference.AppState.LOGIN && appPreference.getState() != AppPreference.AppState.REGISTER && MainActivity.user == null)
            loadSession();
        else
            manageFragment(appPreference.getState());
    }

    @Override
    public void manageFragment(AppPreference.AppState state) {
        switch(state) {
            case AREA:
                getSupportFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, new AreaFragment())
                        .commit();
                break;

            case AREA_CREATE:
                getSupportFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, new AreaCreateFragment())
                        .commit();
                break;
            case PROFILE:
                getSupportFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, new ProfileFragment())
                        .commit();
                break;
            case REGISTER:
                getSupportFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, new RegisterFragment())
                        .commit();
                break;
            default:
                getSupportFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, new LoginFragment())
                        .commit();
                break;
        }
        appPreference.setState(state);
    }

    @Override
    public void loadSession() {
        Session session = appPreference.getSession();
        user = new User(session);
        Call<Response.SelfUser> userCall = MainActivity.apiService.getUser(session.getId(), "Bearer " + session.getAccessToken());
        userCall.enqueue(new Callback<Response.SelfUser>() {
            @Override
            public void onResponse(Call<Response.SelfUser> call, retrofit2.Response<Response.SelfUser> response) {
                try {

                    if (response.body().getError() || response.body().getStatus() != 200)
                        throw new Exception(response.body().getMessage());

                    user.assign(response.body().getUser().getEmail(),
                            response.body().getUser().getFirstName(),
                            response.body().getUser().getLastName(),
                            response.body().getUser().getRole());

                    AppPreference.AppState currState  = appPreference.getState();
                    if (currState == AppPreference.AppState.LOGIN || currState == AppPreference.AppState.REGISTER)
                        manageFragment(AppPreference.AppState.PROFILE);
                    else
                        manageFragment(appPreference.getState());
                } catch(Throwable exception) {
                    String errMessage = exception.getMessage();
                    Log.e("USER", errMessage);
                    if (errMessage.equals("Your token is invalide or expired."))
                        refreshSession();
                    else
                        MainActivity.appPreference.showToast("User Failed: " + errMessage);
                }
            }

            @Override
            public void onFailure(Call<Response.SelfUser> call, Throwable exception) {
                MainActivity.appPreference.showToast("User Failed: " + exception.getMessage());
            }
        });
    }

    @Override
    public void refreshSession() {
        AppPreference.AppState currState  = appPreference.getState();
        if (currState == AppPreference.AppState.LOGIN || currState == AppPreference.AppState.REGISTER)
            return;

        Call<Response.RefreshToken> refreshCall = apiService.refreshToken(new Request.RefreshTokenForm(getSession().getRefreshToken()));
        refreshCall.enqueue(new Callback<Response.RefreshToken>() {
            @Override
            public void onResponse(Call<Response.RefreshToken> call, retrofit2.Response<Response.RefreshToken> response) {
                try {
                    Log.d("REFRESH TOKEN", response.toString());

                    if (response.body().getError() || response.body().getStatus() != 200)
                        throw new Exception(response.body().getMessage());

                    appPreference.setSession(getSession().getId(),
                            response.body().getAccessToken(),
                            getSession().getRefreshToken());
                    loadSession();
                } catch(Throwable exception) {
                    Log.e("REFRESH TOKEN", exception.getMessage());
                    MainActivity.appPreference.showToast("Area Failed: " + exception.getMessage());
                    resetSession();
                }
            }

            @Override
            public void onFailure(Call<Response.RefreshToken> call, Throwable exception) {
                Log.e("REFRESH TOKEN", exception.getMessage());
                MainActivity.appPreference.showToast("Area Failed: " + exception.getMessage());
            }
        });
    }

    @Override
    public Session getSession() {
        return appPreference.getSession();
    }

    @Override
    public void resetSession() {
        appPreference.setSession("", "", "");
        manageFragment(AppPreference.AppState.LOGIN);
        user = null;
    }
}