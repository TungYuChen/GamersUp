package com.gamersup.gamersupbackend.audio;

import lombok.AllArgsConstructor;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.SourceDataLine;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.DatagramSocket;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


public class Server implements Runnable{

    private ArrayList<ConnectionHandler> connectionList;
    private ServerSocket server;
    private boolean done = false;
    private ExecutorService pool;
    private int port = 9999;
    public SourceDataLine audioOut;
    public static boolean calling = false;


    public static AudioFormat getAudioFormat() {
        float sampleRate = 8000.0F;
        int sampleSizeInbites = 16;
        int channel = 2;
        boolean signed = true;
        boolean bigEndian = false;
        return new AudioFormat(sampleRate, sampleSizeInbites, channel, signed, bigEndian);
    }

    public Server() {
        connectionList = new ArrayList<>();
    }



    @Override
    public void run() {
        try {
            server = new ServerSocket(port);
            pool = Executors.newCachedThreadPool();
            while (!done) {
                Socket client = server.accept();
                ConnectionHandler handler = new ConnectionHandler(client);
                connectionList.add(handler);
                pool.execute(handler);
            }


        } catch (Exception e) {
            shutdown();
        }
    }

    public void broadcast(String message) {
        for (ConnectionHandler ch : connectionList) {
            if (ch != null) {
                ch.sendMessage(message);
            }
        }
    }

    public void shutdown() {
        try {
            done = true;
            if (!server.isClosed()) {
                server.close();
            }
            for (ConnectionHandler ch : connectionList) {
                ch.shutdown();
            }
        } catch (Exception e) {
            // ignore
        }

    }

    public void initAudio() {
        AudioFormat format = getAudioFormat();
        DataLine.Info info = new DataLine.Info(SourceDataLine.class, format);

        if (!AudioSystem.isLineSupported(info)) {
            System.out.println("not support");
            System.exit(0);
        }
        try {
            audioOut = (SourceDataLine) AudioSystem.getLine(info);
            audioOut.open(format);
            audioOut.start();
            PlayThread play = new PlayThread();
            play.din = new DatagramSocket(port);
            play.audioOut = audioOut;
            this.calling = true;
            play.start();

        } catch (Exception e) {

        }

    }




    class ConnectionHandler implements Runnable {

        private Socket client;
        private BufferedReader in;
        private PrintWriter out;
        private String nickname;
        public ConnectionHandler(Socket client) {
            this.client = client;
        }

        @Override
        public void run() {
            try {
                out = new PrintWriter(client.getOutputStream(), true);
                in = new BufferedReader(new InputStreamReader(client.getInputStream()));
                out.println("Please enter a nickname: ");
                this.nickname = in.readLine();
                System.out.println(nickname + " connected");
                broadcast(nickname + " joined the chat!");
                String message;
                while ((message = in.readLine()) != null) {
                    if (message.startsWith("/nick")) {
                        String[] messageSplit = message.split("", 2);
                        if (messageSplit.length == 2) {
                            broadcast(nickname + " renamed themselves to " + messageSplit[1]);
                            System.out.println(nickname + " renamed themselves to " + messageSplit[1]);
                            nickname = messageSplit[1];
                            out.print("Successfully change nickname to " + nickname);
                        } else {
                            out.println("No nickname provided");
                        }
                    }else if (message.startsWith("/quit")) {
                        broadcast(nickname + " left the chat ");
                    } else {
                        broadcast(nickname + ": " + message);
                    }

                }
            } catch (IOException e) {
                shutdown();
            }
        }

        public void sendMessage(String message) {
            out.println(message);
        }

        public void shutdown() {
            try {
                in.close();
                out.close();
                if (!client.isClosed())
                    client.close();
            } catch (IOException e) {
                // ignore
            }

        }
    }


    public static void main(String[] args) {
        Server server = new Server();
        server.run();
    }
}
