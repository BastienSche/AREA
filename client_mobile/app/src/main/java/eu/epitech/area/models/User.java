package eu.epitech.area.models;

import android.util.Log;

import eu.epitech.area.activity.MainActivity;
import retrofit2.Call;
import retrofit2.Callback;

public class User {
    private Session session;
    private String email;
    private String firstName;
    private String lastName;
    private String role;

    public Session getSession() {
        return session;
    }
    public String getEmail() {
        return email;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public String getRole() {
        return role;
    }


    public User(Session session) {
        this.session = session;
    }

    public void assign(String email, String firstName, String lastName, String role) {
        this.email = email;
        this.lastName = lastName;
        this.firstName = firstName;
        this.role = role;
        Log.e("USER", this.toString());
    }

    public String toString() {
        return "User {" +
                session.toString() + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}

