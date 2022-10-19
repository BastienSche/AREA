package eu.epitech.area.models;
import com.google.gson.annotations.SerializedName;

import java.util.List;


public class Response {

    @SerializedName("error")
    private Boolean error;

    @SerializedName("status")
    private int status;

    @SerializedName("code")
    private String code;

    @SerializedName("message")
    private String message;

    public Boolean getError() {
        return error;
    }

    public Integer getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public class Session {
        @SerializedName("id")
        private String id;

        @SerializedName("accessToken")
        private String accessToken;

        @SerializedName("refreshToken")
        private String refreshToken;


        public String getId() {
            return id;
        }

        public String getAccessToken() {
            return accessToken;
        }

        public String getRefreshToken() {
            return refreshToken;
        }

        @Override
        public String toString() {
            return "Session {" +
                    "id='" + id + '\'' +
                    ", accessToken='" + accessToken + '\'' +
                    ", refreshToken='" + refreshToken + '\'' +
                    '}';
        }
    }

    public class Login extends Response {
        @SerializedName("session")
        private Session session;

        public Session getSession() {
            return session;
        }

        public String toString() {
            return session.toString();
        }
    }

    public class RefreshToken extends Response {
        @SerializedName("accessToken")
        private String accessToken;

        public String getAccessToken() {
            return accessToken;
        }
    }

    public class Register extends Response {
        @SerializedName("user")
        private User user;

        public String toString() {
            return user.toString();
        }
    }

    public class User {
        @SerializedName("id")
        private String id;

        @SerializedName("email")
        private String email;

        @SerializedName("firstName")
        private String firstName;

        @SerializedName("lastName")
        private String lastName;

        @SerializedName("role")
        private String role;

        public String getId() {
            return id;
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

        @Override
        public String toString() {
            return "User {" +
                    "id='" + id + '\'' +
                    ", email='" + email + '\'' +
                    ", firstName='" + firstName + '\'' +
                    ", lastName='" + lastName + '\'' +
                    ", role='" + role + '\'' +
                    '}';
        }
    }

    public class SelfUser extends Response {
        @SerializedName("user")
        private User user;


        public User getUser() {
            return user;
        }

        public String toString() {
            return user.toString();
        }
    }

    public class Action {
        @SerializedName("name")
        String name;

        @SerializedName("description")
        String description;

        @SerializedName("service")
        String service;

        public String getName() { return name; }
        public String getDesc() { return description; }
        public String getService() { return service; }

        @Override
        public String toString() {
            return "Action {" +
                    "name='" + name + '\'' +
                    ", description='" + description + '\'' +
                    ", service= " + service + '\'' +
                '}';
        }
    }

    public class Area {
        @SerializedName("id")
        private String id;

        @SerializedName("title")
        private String title;

        @SerializedName("status")
        private String status;

        @SerializedName("action")
        private Action action;

        @SerializedName("reaction")
        private Action reaction;

        public String getId() {
            return id;
        }

        public String getStatus() {
            return status;
        }

        public String getTitle() {
            return title;
        }

        public Action getAction() {
            return action;
        }

        public Action getREAction() {
            return reaction;
        }

        @Override
        public String toString() {
            return "Area {" +
                    "id='" + id + '\'' +
                    ", title='" + title + '\'' +
                    ", status='" + status + '\'' +
                    getAction().toString() + '\'' +
                    getREAction().toString() + '\'' +
                    '}';
        }
    }

    public class SelfArea extends Response {
        @SerializedName("area")
        Area area;

        public Area getAreaList() {
            return area;
        }
    }

    public class AreaList extends Response {
        @SerializedName("area")
        List<Area> area;

        public List<Area> getAreaList() {
            return area;
        }
    }

    public class Services extends Response {
        @SerializedName("actions")
        List<Action> actions;

        @SerializedName("reactions")
        List<Action> reactions;

        public List<Action> getActions() {
            return actions;
        }

        public List<Action> getREActions() {
            return reactions;
        }
    }
}
