package eu.epitech.area.services;

import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;

import eu.epitech.area.R;
import eu.epitech.area.models.Response;
import eu.epitech.area.models.Session;

public class AppPreference {
    private SharedPreferences sharedPreferences;
    private SharedPreferences.Editor editor;
    private Context context;

    public enum AppState {
        UNKNOWN, LOGIN, REGISTER, AREA, AREA_CREATE, PROFILE;

        public static AppState toEnum(String str) {
            try {
                return valueOf(str);
            } catch (Exception ex) {
                return UNKNOWN;
            }
        }
    }

    public AppPreference(Context context) {
        this.context = context;
        sharedPreferences = context.getSharedPreferences(String.valueOf(R.string.s_pref_file), Context.MODE_PRIVATE);
        editor = sharedPreferences.edit();
    }

    public void setState(AppState status) {
        editor.putString(String.valueOf(R.string.s_pref_state), status.toString());
        editor.commit();
    }

    public AppState getState() {
        return AppState.toEnum(sharedPreferences.getString(String.valueOf(R.string.s_pref_state), "status"));
    }

    public void setSession(String id, String accessToken, String refreshToken) {
        editor.putString(String.valueOf(R.string.s_pref_id), id);
        editor.putString(String.valueOf(R.string.s_pref_accessToken), accessToken);
        editor.putString(String.valueOf(R.string.s_pref_refreshToken), refreshToken);
        editor.commit();
    }

    public Session getSession() {
        return new Session(sharedPreferences.getString(String.valueOf(R.string.s_pref_id), "id"),
                sharedPreferences.getString(String.valueOf(R.string.s_pref_accessToken), "accessToken"),
                sharedPreferences.getString(String.valueOf(R.string.s_pref_refreshToken), "refreshToken"));
    }

    public void showToast(String message) {
        Toast.makeText(context, message, Toast.LENGTH_LONG).show();
    }
}
