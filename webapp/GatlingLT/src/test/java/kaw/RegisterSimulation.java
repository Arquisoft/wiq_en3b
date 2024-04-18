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

public class RegisterSimulation extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("https://localhost")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate, br")
    .acceptLanguageHeader("en-GB,en;q=0.5")
    .doNotTrackHeader("1")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");



  private Map<CharSequence, String> headers_4 = Map.ofEntries(
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_5 = Map.ofEntries(
    Map.entry("Accept", "application/json, text/plain, */*"),
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "same-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private static final String uri1 = "localhost";
  private static final int waitBeforeRegister = 2;
  private static final int nUsersRegistering = 600;

  private ScenarioBuilder scn = scenario("RegisterSimulation")
          .exec(goToLoginPage(), pause(waitBeforeRegister))
          .exec( http("request_4")
                  .options("https://" + uri1 + "/adduser")
                  .headers(headers_4), register() );


  // Registering 10 users per second during 600s = In the end, 600 users will be registered
  public RegisterSimulation(){
	  setUp(scn.injectOpen(constantUsersPerSec(10).during(60)).protocols(httpProtocol));
      Runtime.getRuntime().addShutdownHook(new Thread(() -> {
          MongoHandler.getInstance().flush();
      }));
  }

  private ChainBuilder register(){

      // Req_5 and Req_6-7 in different lines to use the same user popped by
      // feeder

      return feed(createUserFeeder(nUsersRegistering))
              .exec( http("request_5")
                      .post("https://" + uri1 + "/adduser")
                      .headers(headers_5)
                      .formParam("username", "${username}")
                      .formParam("password", "${password}")
              ).exec( http("request_6")
                              .options("https://" + uri1 + "/login")
                              .headers(headers_4),
                      http("request_7")
                              .post("https://" + uri1 + "/login")
                              .headers(headers_5)
                              .formParam("username", "${username}")
                              .formParam("password", "${password}")

              );


  }


}
