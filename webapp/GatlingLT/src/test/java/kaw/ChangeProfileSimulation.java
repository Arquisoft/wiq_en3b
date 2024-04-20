package kaw;

import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import mongo.MongoHandler;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static utils.LoadTestUtil.createUserFeeder;
import static utils.LoadTestUtil.goToLoginPage;

public class ChangeProfileSimulation extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("https://localhost")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate, br")
    .acceptLanguageHeader("en-GB,en;q=0.5")
    .doNotTrackHeader("1")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");

  private Map<CharSequence, String> headers_6 = Map.ofEntries(
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_7 = Map.ofEntries(
    Map.entry("Accept", "application/json, text/plain, */*"),
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_8 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("Sec-Fetch-Dest", "image"),
    Map.entry("Sec-Fetch-Mode", "no-cors"),
    Map.entry("Sec-Fetch-Site", "same-origin"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_9 = Map.ofEntries(
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_17 = Map.ofEntries(
    Map.entry("Access-Control-Request-Headers", "authorization,content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_18 = Map.ofEntries(
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1"),
    Map.entry("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjIxOWYyZjhkZDNiOGYzMDZmN2MwMmYiLCJpYXQiOjE3MTM0Nzk2MjAsImV4cCI6MTcxMzQ4MzIyMH0.pcy2HGRtKJuiIGZh5Ul8B68nwObDEYMvvTyfeRgVit4")
  );
  
  private Map<CharSequence, String> headers_21 = Map.ofEntries(
    Map.entry("If-None-Match", "W/\"7b-rxBuLyih9KgFTHOFB4ha75M9+XA\""),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_22 = Map.ofEntries(
    Map.entry("If-None-Match", "W/\"4d-JyppRuXq68X8hiJkxd4cXu11BPo\""),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private final static String uri1 = "localhost";
  private final static int nUsersStored = 100;
  private final static int waitAfterLogIn = 1;



  private final ScenarioBuilder scn = scenario("kaw.ChangeProfileSimulation")
          .exec( goToLoginPage(), pause(2) )
          .exec(logIn())
          .exec( enterProfileFirstTime(), pause(2) )
          .exec(getAnimalImages(), pause(2))
          .exec(changePP(), pause(2))
          .exec(changeBio(), pause(2))
          .exec(enterProfile());

  // It works but take in mind to change the token in headers_7
  // I have seek ways to do it, but it seems that Gatling does not load the JSON responses in
  // logIn()
  public ChangeProfileSimulation(){
      MongoHandler.getInstance().addNUsers(nUsersStored);
	  setUp(scn.injectOpen(constantUsersPerSec(5).during(20))).protocols(httpProtocol);
      Runtime.getRuntime().addShutdownHook(new Thread(() -> {
        MongoHandler.getInstance().flush();
      }));
  }

  private ChainBuilder logIn(){
    return feed(createUserFeeder(nUsersStored)).exec(http("request_6")
            .options("https://" + uri1 + "/login")
            .headers(headers_6))
            .pause(1)
            .exec(http("request_7")
                    .post("https://" + uri1 + "/login")
                    .headers(headers_7)
                    .formParam("username", "${username}")
                    .formParam("password", "${password}")
                    .check(status().is(200)) // here it would be sth like: .check(jsonPath("$.data.user.token").saveAs("userToken"))
                    // this token is stored in session, then it would be just a matter of retrieving and pasting it
                    // into the header. The bad thing: By a reason which I do not understand, the response from this
                    // POST /login is an HTML!!!! which does not make sense since POSTMAN retrieves JSON
            ).pause(waitAfterLogIn);
          // .exec(session -> {
    //                String responseBody = ((Session)session).get("responseBody").as(String.class);
    //                System.out.println("Response Body: " + responseBody);
    //                return session;
    //            });
  }

  private ChainBuilder enterProfileFirstTime(){
    return feed(createUserFeeder(nUsersStored)).exec(http("request_8")
            .get("https://" + uri1 + "/static/media/default-avatar.02dec56307abe0e7aec6.png")
            .headers(headers_8))
            .exec( http("request_9").get("/history?user=${username}").headers(headers_9))
            .exec( http("request_10").get("/profile?user=${username}").headers(headers_9));
  }

  private ChainBuilder getAnimalImages(){
    return exec(
            http("request_11")
                    .get("https://" + uri1 + "/static/media/elephant.3c62c36619d646ec3202.png")
                    .headers(headers_8)
                    .resources(
                            http("request_12")
                                    .get("https://" + uri1 + "/static/media/goose.cec2967df25be6a336d6.jpg")
                                    .headers(headers_8),
                            http("request_13")
                                    .get("https://" + uri1 + "/static/media/giraffe.7a85def58336a6e0d820.png")
                                    .headers(headers_8),
                            http("request_14")
                                    .get("https://" + uri1 + "/static/media/parrot.08320b82821808cd9f84.png")
                                    .headers(headers_8),
                            http("request_15")
                                    .get("https://" + uri1 + "/static/media/rabbit.0fec6a8fc28328e79949.png")
                                    .headers(headers_8),
                            http("request_16")
                                    .get("https://" + uri1 + "/static/media/fox.9c6a71e2364df2cc5bab.png")
                                    .headers(headers_8)
                    ));
  }

  private ChainBuilder changePP(){
    return feed(createUserFeeder(nUsersStored)).exec(http("request_17")
            .options("/profile")
            .headers(headers_17))
            .exec( http("request_18")
                    .post("/profile")
                    .headers(headers_18)
                    .body(RawFileBody("changeprofilesimulation/0018_request.json"))
            );
  }


  private ChainBuilder changeBio(){
    return feed(createUserFeeder(nUsersStored)).exec(http("request_19")
            .options("/profile")
            .headers(headers_17))
            .exec(http("request_20")
                    .post("/profile")
                    .headers(headers_18)
                    .body(RawFileBody("changeprofilesimulation/0020_request.json"))
            );
  }

  private ChainBuilder enterProfile(){
    return feed(createUserFeeder(nUsersStored)).exec( http("request_21")
            .get("/history?user=${username}")
            .headers(headers_21))
            .exec(http("request_22")
                    .get("/profile?user=${username}")
                    .headers(headers_22));
  }
}
