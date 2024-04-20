package kaw;

import java.util.*;

import io.gatling.core.body.RawFileBody;
import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import mongo.MongoHandler;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static utils.LoadTestUtil.createUserFeeder;
import static utils.LoadTestUtil.goToLoginPage;

public class MediumGameSimulation extends Simulation {

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

  private Map<CharSequence, String> headers_9 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("Sec-Fetch-Dest", "image"),
    Map.entry("Sec-Fetch-Mode", "no-cors"),
    Map.entry("Sec-Fetch-Site", "cross-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_11 = Map.ofEntries(
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1"),
    Map.entry("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjIzY2FiZGViM2MwNDhmYjM3NDIzYWMiLCJpYXQiOjE3MTM2MjE3ODUsImV4cCI6MTcxMzYyNTM4NX0.ClTLz5wFuww-AlquO7nF9paX3WBa1TgBCF2p391V84E")
  );
  
  private static final String urlWiki = "https://commons.wikimedia.org/wiki/Special:FilePath";
  private static final int waitAfterLogIn = 2;
  private final static int nUsersStored = 100;
  private final static String uri1 = "localhost";

  private ScenarioBuilder scn = scenario("kaw.MediumGameSimulation")
          .exec( goToLoginPage(), pause(5) )
          .exec( logIn() )
          .exec( requestQuestions(), pause(5))
          .exec( getFlagImage(), pause(5) )
          .exec( getPhysicistImage(), pause(5) )
          .exec( updatingHistory() );

  // Always take in mind the numbers in constantUsersPerSec(5).during(20)
  // and nUsersStored. They must be multiples!! 5*20=100
  // (feeder "pops" each user in createUserFeeder() and injects it in every ${var}, that's why
  // they need to be multiples, if different feeder will reuse the same user, and we wouldn't have
  // "different concurrent users") --> This applies to all classes
  public MediumGameSimulation(){
    MongoHandler.getInstance().addNUsers(nUsersStored);
    setUp(scn.injectOpen(constantUsersPerSec(5).during(20))).protocols(httpProtocol);
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      MongoHandler.getInstance().flush();
    }));
  }

  private ChainBuilder logIn(){
    return feed(createUserFeeder(nUsersStored))
            .exec(http("request_6")
                    .options("https://" + uri1 + "/login")
                    .headers(headers_6))
            .pause(1)
            .exec(http("request_7")
                    .post("https://" + uri1 + "/login")
                    .headers(headers_7)
                    .formParam("username", "${username}")
                    .formParam("password", "${password}")
                    .check(status().is(200))
            ).pause(waitAfterLogIn);
  }

  private ChainBuilder requestQuestions(){
    return exec(http("request_9")
            .get("/questions?size=10&lang=en")
            .headers(headers_9));
  }

  private ChainBuilder getPhysicistImage(){
    return exec(http("request_10")
            .get(urlWiki + "/Nobel%20Prize%202009-Press%20Conference%20KVA-23.jpg")
            .headers(headers_9));
  }

  private ChainBuilder getFlagImage(){
    return exec(http("request_9")
            .get(urlWiki + "/Flag%20of%20Vanuatu.svg")
            .headers(headers_9));
  }

  private ChainBuilder updatingHistory(){
    return exec(http("request_11")
            .post("/history/increment")
            .headers(headers_11)
            .body(RawFileBody("mediumgamesimulation/0011_request.json")) );
  }

}
