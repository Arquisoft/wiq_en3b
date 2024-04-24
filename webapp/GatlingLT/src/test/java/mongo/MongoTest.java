package mongo;

public class MongoTest {

    public static void main(String[] args) throws InterruptedException {
        MongoHandler db = MongoHandler.getInstance();
        System.out.println("Adding 100 users");
        db.addNUsers(100);
        System.out.println("Printing if success");
        db.printUsers();
        System.out.println("Flushing db");
        db.flush();
        System.out.println("Should appear nothing");
        db.printUsers();
    }
}
