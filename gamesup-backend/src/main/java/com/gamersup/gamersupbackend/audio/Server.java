package com.gamersup.gamersupbackend.audio;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

@Service
public class Server implements Runnable{
    // ArrayList for connection -> nickname
    private ArrayList<ConnectionHandler> connectionList;

    // create a server by ServerSocket
    private ServerSocket server;

    // if done, close all
    private boolean done = false;

    // thread pool for handling connections
    private ExecutorService pool;

    // port for link, TODO: become input param
    private int port = 9999;

    // buffer for writing and reading audio
    public SourceDataLine audioOut;

    // calling status
    public static boolean calling = false;

    /**
     * the default audio format
     * @return AudioFormat with sample rate, sample size in bite, channel, signed, store in big endian or not
     */
    public static AudioFormat getAudioFormat() {
        float sampleRate = 8000.0F;
        int sampleSizeInbites = 16;
        int channel = 2;
        boolean signed = true;
        boolean bigEndian = false;
        return new AudioFormat(sampleRate, sampleSizeInbites, channel, signed, bigEndian);
    }

    /**
     * When server be created, array list for multiple connections be initialized
     */
    public Server() {
        connectionList = new ArrayList<>();
    }


    /**
     * Start to run the server
     * Server is initialized with port
     * Audio init -> Audio in would be opened, the thread for catch audio input start
     * Thread Pool start
     */
    @Override
    public void run() {
        try {
            server = new ServerSocket(port);
            initAudio();
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

    /**
     * Broadcast the message
     * When someone speak, broadcast the text
     * @param message
     */
    public void broadcast(String message) {
        for (ConnectionHandler ch : connectionList) {
            if (ch != null) {
                ch.sendMessage(message);
            }
        }
    }

    /**
     * Close server and all connection handler
     */
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

    /**
     * initialize Audio for audio out, will catch the datagram socket by port
     */
    public void initAudio() {
        // get audio format
        AudioFormat format = getAudioFormat();
        // get the source data for audio output
        DataLine.Info info = new DataLine.Info(SourceDataLine.class, format);

        if (!AudioSystem.isLineSupported(info)) {
            System.out.println("not support");
            System.exit(0);
        }
        try {
            // setting audio output
            audioOut = (SourceDataLine) AudioSystem.getLine(info);
            audioOut.open(format);
            audioOut.start();
            // create new thread for play the sound
            PlayThread play = new PlayThread();
            // set input as socket input
            play.din = new DatagramSocket(port);
            // assign the audio as our setting
            play.audioOut = audioOut;
            calling = true;
            play.start();

        } catch (Exception e) {

        }

    }


    /**
     * Connection handler for client connect in the group for chatting
     */
    class ConnectionHandler implements Runnable {

        private Socket client;
        private BufferedReader in;
        private PrintWriter out;
        // should be username
        private String nickname;

        /**
         * When new client connected, create a new one
         * @param client
         */
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
                    // we don't support chat room commands
//                    if (message.startsWith("/nick")) {
//                        String[] messageSplit = message.split("", 2);
//                        if (messageSplit.length == 2) {
//                            broadcast(nickname + " renamed themselves to " + messageSplit[1]);
//                            System.out.println(nickname + " renamed themselves to " + messageSplit[1]);
//                            nickname = messageSplit[1];
//                            out.print("Successfully change nickname to " + nickname);
//                        } else {
//                            out.println("No nickname provided");
//                        }
//                    }else if (message.startsWith("/quit")) {
//                        broadcast(nickname + " left the chat ");
//                    } else {
//                        broadcast(nickname + ": " + message);
//                    }
                    broadcast(nickname + ": " + message);
                }
            } catch (IOException e) {
                shutdown();
            }
        }

        public void sendMessage(String message) {
            // TODO: should become string send to frontend
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
