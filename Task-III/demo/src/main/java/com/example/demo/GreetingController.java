package com.example.demo;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    // Create Variable to store data
    public Iterable<DataSnapshot> userListSnapshot;
    public List<MailUser> userList;
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    // Firebase initialisation
    // Open file to read data  with firebase.key
    InputStream serviceAccount = this.getClass().getClassLoader().getResourceAsStream("project-fb-555-firebase-adminsdk-z6ldc-6acb653960.json");
    // FireBase options set
    FirebaseOptions options = new FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("https://project-fb-555-default-rtdb.asia-southeast1.firebasedatabase.app")
            .build();
    // FireBase init
    FirebaseApp app = FirebaseApp.initializeApp(options);
    // FireBase db load
    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    // Set reference to invintations group in DB
    DatabaseReference ref = database.getReference("subscribers");

    public GreetingController() throws IOException {
//        Addd listener to subsribe on data change
        ref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
//                Get all changes from db
                GreetingController.this.userListSnapshot = dataSnapshot.getChildren();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new Greeting(counter.incrementAndGet(),
                String.format(template, name));
    }

//    Get all mails method
    @RequestMapping("/get_mails")
    public List<MailUser> getEmails() {
            List<MailUser> mailUsers = new ArrayList<MailUser>();
//        For any child in Snapshot get value
            for (DataSnapshot user : this.userListSnapshot) {
//            Convert to class MailUser
                MailUser u = user.getValue(MailUser.class);
                mailUsers.add(u);
            }
//        If there is new users return updated list
            if (mailUsers.size() > 0 ){
                this.userList = mailUsers;
            }
//        Else return the old one
            return this.userList;
        }

        @RequestMapping("/set_mail")
        public String setEmail(@RequestParam("mail") String mail) {
//        Add new entry to DB with new id creation
            DatabaseReference postMail = ref.push().child("email");
            postMail.setValueAsync(mail);
            return "User saved";
    }
}
