package kaw;

import io.gatling.javaapi.core.ChainBuilder;
import io.gatling.javaapi.core.FeederBuilder;
import io.gatling.javaapi.core.ScenarioBuilder;
import io.gatling.javaapi.core.Simulation;
import io.gatling.javaapi.http.HttpProtocolBuilder;
import io.gatling.javaapi.http.HttpRequestActionBuilder;
import mongo.MongoHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.http;
import static io.gatling.javaapi.http.HttpDsl.status;

public class LogInSimulation extends Simulation {

    private final HttpProtocolBuilder httpProtocol = http
            .baseUrl("https://localhost")
            .inferHtmlResources()
            .acceptHeader("*/*")
            .acceptEncodingHeader("gzip, deflate, br")
            .acceptLanguageHeader("en-GB,en;q=0.5")
            .doNotTrackHeader("1")
            .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");

    private final Map<CharSequence, String> headers_0 = Map.ofEntries(
            Map.entry("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"),
            Map.entry("If-None-Match", "\"c053d8fe0e68fd37bce0b7ff0456f990727ebc7c\""),
            Map.entry("Sec-Fetch-Dest", "document"),
            Map.entry("Sec-Fetch-Mode", "navigate"),
            Map.entry("Sec-Fetch-Site", "none"),
            Map.entry("Sec-Fetch-User", "?1"),
            Map.entry("Sec-GPC", "1"),
            Map.entry("Upgrade-Insecure-Requests", "1")
    );

    private final Map<CharSequence, String> headers_1 = Map.ofEntries(
            Map.entry("If-None-Match", "\"49bcb5b12df855e737859bd142aa449b02e9dba4\""),
            Map.entry("Sec-Fetch-Dest", "script"),
            Map.entry("Sec-Fetch-Mode", "no-cors"),
            Map.entry("Sec-Fetch-Site", "same-origin"),
            Map.entry("Sec-GPC", "1")
    );

    private final Map<CharSequence, String> headers_2 = Map.ofEntries(
            Map.entry("Accept", "text/css,*/*;q=0.1"),
            Map.entry("If-None-Match", "\"ec085b48f22f2105c245e16b819a3177f40a9310\""),
            Map.entry("Sec-Fetch-Dest", "style"),
            Map.entry("Sec-Fetch-Mode", "no-cors"),
            Map.entry("Sec-Fetch-Site", "same-origin"),
            Map.entry("Sec-GPC", "1")
    );

    private final Map<CharSequence, String> headers_3 = Map.ofEntries(
            Map.entry("Accept", "image/avif,image/webp,*/*"),
            Map.entry("If-None-Match", "\"836cadd063e11904c198b2cbca88ef9ec072f249\""),
            Map.entry("Sec-Fetch-Dest", "image"),
            Map.entry("Sec-Fetch-Mode", "no-cors"),
            Map.entry("Sec-Fetch-Site", "same-origin"),
            Map.entry("Sec-GPC", "1")
    );

    private final Map<CharSequence, String> headers_4 = Map.ofEntries(
            Map.entry("If-None-Match", "\"23704d00b688cbd85d075356bdadef02ce01e6c5\""),
            Map.entry("Sec-Fetch-Dest", "empty"),
            Map.entry("Sec-Fetch-Mode", "cors"),
            Map.entry("Sec-Fetch-Site", "same-origin"),
            Map.entry("Sec-GPC", "1")
    );

    private final Map<CharSequence, String> headers_5 = Map.ofEntries(
            Map.entry("If-None-Match", "\"c9cd95fabd9f2c1e82fd45cd37539780a99b9470\""),
            Map.entry("Sec-Fetch-Dest", "empty"),
            Map.entry("Sec-Fetch-Mode", "cors"),
            Map.entry("Sec-Fetch-Site", "same-origin"),
            Map.entry("Sec-GPC", "1")
    );

    private final Map<CharSequence, String> headers_6 = Map.ofEntries(
            Map.entry("Access-Control-Request-Headers", "content-type"),
            Map.entry("Access-Control-Request-Method", "POST"),
            Map.entry("Origin", "https://localhost"),
            Map.entry("Sec-Fetch-Dest", "empty"),
            Map.entry("Sec-Fetch-Mode", "cors"),
            Map.entry("Sec-Fetch-Site", "same-site"),
            Map.entry("Sec-GPC", "1")
    );

    private final Map<CharSequence, String> headers_7 = Map.ofEntries(
            Map.entry("Accept", "application/json, text/plain, */*"),
            Map.entry("Content-Type", "application/json"),
            Map.entry("Origin", "https://localhost"),
            Map.entry("Sec-Fetch-Dest", "empty"),
            Map.entry("Sec-Fetch-Mode", "cors"),
            Map.entry("Sec-Fetch-Site", "same-site"),
            Map.entry("Sec-GPC", "1")
    );


    private static final int waitBeforeLogIn = 2;
    private static final int nUsers = 100;

    private final ScenarioBuilder scn = scenario("Load Test - LogIn")
            .exec( goToLoginPage(), pause(waitBeforeLogIn))
            .exec( logIn() );

    public LogInSimulation() {
        MongoHandler.getInstance().addNUsers(nUsers);
        setUp(scn.injectOpen(constantUsersPerSec(10).during(60))).protocols(httpProtocol);
        MongoHandler.getInstance().flush();
    }

    private HttpRequestActionBuilder goToLoginPage(){
        return http("request_0")
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
                                .headers(headers_5)
                );
    }

    private FeederBuilder<Object> createUserFeeder(){
        List<Map<String, Object>> usersData = new ArrayList<>();

        for (int i = 1; i <= nUsers; i++) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("username", MongoHandler.defaultUsername + i);
            userData.put("password", MongoHandler.defaultPassword);
            usersData.add(userData);
        }

        return listFeeder(usersData).random();

    }

    private ChainBuilder logIn(){

        String uri1 = "localhost";

        return feed(createUserFeeder()).exec(http("request_6")
                .options("https://" + uri1 + "/login")
                .headers(headers_6))
                .pause(1)
                .exec(http("request_7")
                        .post("https://" + uri1 + "/login")
                        .headers(headers_7)
                        .formParam("username", "${username}")
                        .formParam("password", "${password}")
                        .check(status().is(200))
                );
    }

}
