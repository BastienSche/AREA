package eu.epitech.area.services;

import eu.epitech.area.models.Session;

public interface AppInterface {

    void manageFragment(AppPreference.AppState state);
    Session getSession();
    void loadSession();
    void refreshSession();
    void resetSession();
}
