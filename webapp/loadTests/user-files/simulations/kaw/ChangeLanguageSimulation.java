package kaw;

import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

public class ChangeLanguageSimulation extends Simulation {

  private HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://localhost")
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
    Map.entry("Accept", "audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5"),
    Map.entry("Accept-Encoding", "identity"),
    Map.entry("If-None-Match", "\"c741c826d1b76bda32298bc9275d8fe7dc2e85f3\""),
    Map.entry("Range", "bytes=0-"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_7 = Map.ofEntries(
    Map.entry("Accept-Encoding", "gzip, deflate, br"),
    Map.entry("Access-Control-Request-Headers", "content-type"),
    Map.entry("Access-Control-Request-Method", "POST"),
    Map.entry("Origin", "http://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "cross-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_8 = Map.ofEntries(
    Map.entry("Accept", "application/json, text/plain, */*"),
    Map.entry("Accept-Encoding", "gzip, deflate, br"),
    Map.entry("Content-Type", "application/json"),
    Map.entry("Origin", "http://localhost"),
    Map.entry("Sec-Fetch-Dest", "empty"),
    Map.entry("Sec-Fetch-Mode", "cors"),
    Map.entry("Sec-Fetch-Site", "cross-site"),
    Map.entry("Sec-GPC", "1")
  );
  
  private Map<CharSequence, String> headers_9 = Map.of("Sec-GPC", "1");

  private final static String uri1 = "localhost"; 

  private ScenarioBuilder scn = scenario("SettingsSimulation")
    .exec(
      http("request_0")
        .get("/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("/static/js/main.9dbc8138.js")
            .headers(headers_1),
          http("request_2")
            .get("/static/css/main.4fe7b79e.css")
            .headers(headers_2),
          http("request_3")
            .get("/KaW.png")
            .headers(headers_3),
          http("request_4")
            .get("/assets/locales/es/translation.json")
            .headers(headers_4),
          http("request_5")
            .get("/assets/locales/en/translation.json")
            .headers(headers_5),
          http("request_6")
            .get("/static/media/music.49e6217422242882f810.mp3")
            .headers(headers_6)
        ),
      pause(6),
      http("request_7")
        .options("https://" + uri1 + ":8000/login")
        .headers(headers_7)
        .resources(
          http("request_8")
            .post("https://" + uri1 + ":8000/login")
            .headers(headers_8)
            .body(RawFileBody("kaw/settingssimulation/0008_request.json"))
        ),
      pause(7),
      http("request_9")
        .get("/assets/locales/fr/translation.json")
        .headers(headers_9)
    );

  {
	  setUp(scn.injectOpen(constantUsersPerSec(50).during(60).randomized())).protocols(httpProtocol);
  }
}
