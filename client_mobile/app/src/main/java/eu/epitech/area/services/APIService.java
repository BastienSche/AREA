package eu.epitech.area.services;

import eu.epitech.area.models.Request;
import eu.epitech.area.models.Response;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.HTTP;
import retrofit2.http.Header;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;


public interface APIService {
    @POST("auth/login")
    Call<Response.Login> login(@Body Request.LoginForm loginForm);

    @POST("auth/refreshToken")
    Call<Response.RefreshToken> refreshToken(@Body Request.RefreshTokenForm refreshTokenForm);

    @GET("services")
    Call<Response.Services> getServices();

    @POST("users")
    Call<Response.Register> createUser(@Body Request.RegisterForm registerForm);

    @GET("users/{id}")
    Call<Response.SelfUser> getUser(@Path("id") String id, @Header("Authorization") String bearerToken);

    @GET("users/{id}/area")
    Call<Response.AreaList> getArea(@Path("id") String id, @Header("Authorization") String bearerToken);

    @POST("users/{id}/area")
    Call<Response.SelfArea> createArea(@Path("id") String id, @Header("Authorization") String bearerToken, @Body Request.CreateAreaForm areaForm);

    @HTTP(method = "DELETE", path = "users/{id}/area", hasBody = true)
    Call<Response.SelfArea> removeArea(@Path("id") String id, @Header("Authorization") String bearerToken, @Body Request.RemoveAreaForm areaForm);

    @PATCH("users/{id}/updatePersonalInfo")
    Call<Response.SelfUser> updatePersonalInfo(@Path("id") String id, @Header("Authorization") String bearerToken, @Body Request.PersonalDataForm personalDataForm);
}
