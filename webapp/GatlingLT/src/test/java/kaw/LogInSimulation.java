package kaw;

import io.gatling.javaapi.core.ChainBuilder;
import io.gatling.javaapi.core.FeederBuilder;
import io.gatling.javaapi.core.ScenarioBuilder;
import io.gatling.javaapi.core.Simulation;
import io.gatling.javaapi.http.HttpProtocolBuilder;
import io.gatling.javaapi.http.HttpRequestActionBuilder;
import mongo.MongoHandler;
import utils.LoadTestUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.http;
import static io.gatling.javaapi.http.HttpDsl.status;
import static utils.LoadTestUtil.createUserFeeder;
import static utils.LoadTestUtil.goToLoginPage;

public class LogInSimulation extends Simulation {

    private final HttpProtocolBuilder httpProtocol = http
            .baseUrl("https://localhost")
            .inferHtmlResources()
            .acceptHeader("*/*")
            .acceptEncodingHeader("gzip, deflate, br")
            .acceptLanguageHeader("en-GB,en;q=0.5")
            .doNotTrackHeader("1")
            .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0");

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
    private static final int waitAfterLogIn = 10;
    private static final int nUsersStored = 10;

    private final ScenarioBuilder scn = scenario("Load Test - LogIn")
            .exec(goToLoginPage(), pause(waitBeforeLogIn))
            .exec( logIn() );

    // Currently we have 100 users in DB.
    // 10 users/sec are trying to enter into the application during 60s (600 users)
    // we emulate that they stay 10s
    // Obviously, a user account is being used for multiple virtual users (like a user
    // logIn in multiple tabs at the same time)
    // If we want different, just change the parameters below and nUsersStored to make
    // the equation equal.
    public LogInSimulation() {
        MongoHandler.getInstance().addNUsers(nUsersStored);
        setUp(scn.injectOpen(constantUsersPerSec(2).during(5))).protocols(httpProtocol);
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            MongoHandler.getInstance().flush();
        }));
    }


    private ChainBuilder logIn(){

        String uri1 = "localhost";

        return feed(createUserFeeder(nUsersStored)).exec(http("request_6")
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

}
