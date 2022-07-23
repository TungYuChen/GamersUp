package com.gamersup.gamersupbackend.audio;

import javax.sound.sampled.SourceDataLine;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class PlayThread extends Thread{
    public DatagramSocket din;
    public SourceDataLine audioOut;
    byte[] byteBuff = new byte[512];

    @Override
    public void run() {
        DatagramPacket incoming = new DatagramPacket(byteBuff, byteBuff.length);
        while (Server.calling) {
            try {
                din.receive(incoming);
                byteBuff = incoming.getData();
                audioOut.write(byteBuff, 0, byteBuff.length);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        audioOut.close();
        audioOut.drain();
        System.out.println("Stop audio");
    }

}
