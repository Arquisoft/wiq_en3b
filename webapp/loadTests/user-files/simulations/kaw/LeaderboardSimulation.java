package kaw;

import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class LeaderboardSimulation extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("https://localhost:8000")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-GB,en;q=0.5")
    .doNotTrackHeader("1")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0");
  
  private Map<CharSequence, String> headers_0 = Map.ofEntries(
    Map.entry("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"),
    Map.entry("If-None-Match", "\"c053d8fe0e68fd37bce0b7ff0456f990727ebc7c\""),
    Map.entry("Sec-GPC", "1"),
    Map.entry("Upgrade-Insecure-Requests", "1")
  );
  
  private Map<CharSequence, String> headers_1 = Map.ofEntries(
    Map.entry("If-None-Match", "\"49bcb5b12df855e737859bd142aa449b02e9dba4\""),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_2 = Map.ofEntries(
    Map.entry("Accept", "text/css,*/*;q=0.1"),
    Map.entry("If-None-Match", "\"ec085b48f22f2105c245e16b819a3177f40a9310\""),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_3 = Map.ofEntries(
    Map.entry("Accept", "image/avif,image/webp,*/*"),
    Map.entry("If-None-Match", "\"836cadd063e11904c198b2cbca88ef9ec072f249\""),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_4 = Map.ofEntries(
    Map.entry("If-None-Match", "\"23704d00b688cbd85d075356bdadef02ce01e6c5\""),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_5 = Map.ofEntries(
    Map.entry("If-None-Match", "\"c9cd95fabd9f2c1e82fd45cd37539780a99b9470\""),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_6 = Map.ofEntries(
    Map.entry("Accept-Encoding", "gzip, deflate, br"),
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "cross-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_7 = Map.ofEntries(
    Map.entry("Accept", "application/json, text/plain, */*"),
    Map.entry("Accept-Encoding", "gzip, deflate, br"),
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "cross-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_8 = Map.ofEntries(
    Map.entry("Accept-Encoding", "gzip, deflate, br"),
    Map.entry("Origin", "https://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "cross-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private String uri1 = "localhost";

  private ScenarioBuilder scn = scenario("LeaderboardSimulation")
    .exec(
      http("request_0")
        .get("https://" + uri1 + "/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("https://" + uri1 + "/static/js/main.9dbc8138.js")
            .headers(headers_1),
          http("request_2")
            .get("https://" + uri1 + "/static/css/main.4fe7b79e.css")
            .headers(headers_2),
          http("request_3")
            .get("https://" + uri1 + "/KaW.png")
            .headers(headers_3),
          http("request_4")
            .get("https://" + uri1 + "/assets/locales/es/translation.json")
            .headers(headers_4),
          http("request_5")
            .get("https://" + uri1 + "/assets/locales/en/translation.json")
            .headers(headers_5)
        ),
      pause(9),
      http("request_6")
        .options("/login")
        .headers(headers_6)
        .resources(
          http("request_7")
            .post("/login")
            .headers(headers_7)
            .body(RawFileBody("kaw/leaderboardsimulation/0007_request.json"))
        ),
      pause(3),
      http("request_8")
        .get("/history/leaderboard")
        .headers(headers_8)
    );

  {
	  setUp(scn.injectOpen(constantUsersPerSec(50).during(60).randomized())).protocols(httpProtocol);
  }
}