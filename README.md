# Sarasota Community Resource Hub

A comprehensive, interactive website showcasing community resources available to residents in Sarasota, Florida.

Events compiled from the following

* https://sarasotaeventscalendar.com/
* https://resend.com/onboarding

Resend api has a template already in java:

import com.resend.*;

public class Main {
    public static void main(String[] args) {
        Resend resend = new Resend("re_cKRf4sGU_F9vEyBzKWEadHp7uQ5Lej46M");

        SendEmailRequest sendEmailRequest = SendEmailRequest.builder()
                .from("onboarding@resend.dev")
                .to("sarasotahub@gmail.com")
                .subject("Hello World")
                .html("<p>Congrats on sending your <strong>first email</strong>!</p>")
                .build();

        SendEmailResponse data = resend.emails().send(sendEmailRequest);
    }
}