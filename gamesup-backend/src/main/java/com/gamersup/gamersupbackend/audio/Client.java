package com.gamersup.gamersupbackend.audio;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;


public class Client implements Runnable{

    private Socket client;
    private BufferedReader in;
    private PrintWriter out;
    private boolean done = false;
    // should be input
    private int port = 9999;

    /**
     * Create new client with port and link, initialing output writter and input stream
     */
    @Override
    public void run() {
        try {
            client = new Socket("127.0.0.1", port);
            out = new PrintWriter(client.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(client.getInputStream()));

            InputHandler inputHandler = new InputHandler();
            Thread t = new Thread(inputHandler);
            t.start();

            String inMessage;
            while ((inMessage = in.readLine()) != null) {
                System.out.println(inMessage);
            }

        } catch (IOException e) {
            shutdown();
        }
    }

    public void shutdown() {
        done = true;
        try {
            in.close();
            out.close();
            if (!client.isClosed()) {
                client.close();
            }
        } catch (IOException e) {
            // ignore
        }
    }

    /**
     * When input, buffer reader read the data and output it
     */
    class InputHandler implements Runnable {
        @Override
        public void run() {
            try {
                BufferedReader inReader = new BufferedReader(new InputStreamReader(System.in));
                while (!done) {
                    String message = inReader.readLine();
//                    if (message.equals("/quit")) {
//                        inReader.close();
//                        shutdown();
//                    } else {
                        out.println(message);
//                    }
                }
            } catch (IOException e) {
                // TODO: handle
            }
        }
    }

    public static void main(String[] args) {
        Client client = new Client();
        client.run();
    }
}
