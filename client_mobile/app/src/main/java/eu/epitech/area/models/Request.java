package eu.epitech.area.models;
import com.google.gson.annotations.SerializedName;


public class Request {

    public static class LoginForm {
        final String email;
        final String password;
        final String provider;

        public LoginForm(String email, String password) {
            this.email = email;
            this.password = password;
            this.provider = "local";
        }
    }

    public static class RefreshTokenForm {
        final String refreshToken;

        public RefreshTokenForm(String refreshToken) {
            this.refreshToken = refreshToken;
        }
    }

    public static class RegisterForm {
        final String firstName;
        final String lastName;
        final String email;
        final String password;
        final String passwordCf;

        public RegisterForm(String firstName, String lastName, String email, String password, String passwordCf) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.passwordCf = passwordCf;
        }
    }

    public static class PersonalDataForm {
        final String firstName;
        final String lastName;
        final String email;

        public PersonalDataForm(String firstName, String lastName, String email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
        }
    }

    public static class ActionForm {
        final String name;
        final String description;
        final String service;

        public ActionForm(String name, String description, String service) {
            this.name = name;
            this.description = description;
            this.service = service;
        }
    }

    public static class CreateAreaForm {
        final String title;
        final ActionForm action;
        final ActionForm reaction;

        public CreateAreaForm(String title, ActionForm action, ActionForm reaction) {
            this.title = title;
            this.action = action;
            this.reaction = reaction;
        }
    }

    public static class RemoveAreaForm {
        final String id;

        public RemoveAreaForm(String id) {
            this.id = id;
        }
    }
}
