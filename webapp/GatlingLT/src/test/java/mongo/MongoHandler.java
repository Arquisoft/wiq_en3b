package mongo;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MongoHandler {

    private static MongoHandler mongoHandler;
    private Logger logger = LoggerFactory.getLogger(MongoHandler.class);

    public static final String defaultUsername = "user";
    public static final String defaultPassword = "test123456";
    public static final String defaultPasswordHashed = "$2b$10$dfRfG/BhQJ2/n/CFeUtMCO6ngMPCJj0aCgEawYXMbtNhyCx04J8ZC";

    private static final String usersUri = "mongodb://localhost:27019/";
    private static final String usersDBName = "userdb";
    private static final String usersCollectionName = "users";
    
    private MongoHandler(){

    }

    public static MongoHandler getInstance(){
        if(mongoHandler == null){
            mongoHandler = new MongoHandler();
        }
        return mongoHandler;
    }

    public void printUsers(){

        try (MongoClient mongoClient = MongoClients.create(usersUri)) {

            MongoDatabase database = mongoClient.getDatabase(usersDBName);
            MongoCollection<Document> users = database.getCollection(usersCollectionName);

            users.find().forEach(user -> System.out.println(user.toJson()));
        }catch (Exception e){
            logger.error("Printing users failed", e);
        }
    }

    public void addNUsers(int numberUsers){
        try (MongoClient mongoClient = MongoClients.create(usersUri)) {

            MongoDatabase database = mongoClient.getDatabase(usersDBName);
            MongoCollection<Document> users = database.getCollection(usersCollectionName);

            List<Document> userList = new ArrayList<Document>();
            for(int i = 1; i <= numberUsers; i++){

                Document user = new Document("username", defaultUsername + i)
                        .append("password", defaultPasswordHashed)
                                .append("history", new Document("passedQuestions", 0)
                                        .append("failedQuestions",0)
                                        .append("gamesPlayed",0)
                                        .append("timePlayed",0)
                                        .append("points",0))
                        .append("profile", new Document("bio", "")
                                .append("pic","default-avatar.png"))
                        .append("createdAt", new Date());
                userList.add(user);
            }

            users.insertMany(userList);

        }catch (Exception e){
            logger.error(String.format("Inserting %d documents", numberUsers), e);
        }
    }

    public void flush(){
        try (MongoClient mongoClient = MongoClients.create(usersUri)) {
            MongoDatabase database = mongoClient.getDatabase(usersDBName);
            MongoCollection<Document> users = database.getCollection(usersCollectionName);
            users.deleteMany(new Document());
        }catch (Exception e){
            logger.error("When flushing db.", e);
        }
    }



}
