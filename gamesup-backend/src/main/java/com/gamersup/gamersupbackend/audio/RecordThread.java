package com.gamersup.gamersupbackend.audio;

import javax.sound.sampled.TargetDataLine;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;


public class RecordThread extends Thread{
    public TargetDataLine audioIn = null;
    public DatagramSocket dout;
    byte[] byteBuff = new byte[512];
    public InetAddress serverIp;
    public int serverPort;

    @Override
    public void run() {
        int i = 0;
        while (ClientVoice.calling) {
            audioIn.read(byteBuff, 0, byteBuff.length);
            DatagramPacket data = new DatagramPacket(byteBuff, byteBuff.length, serverIp, serverPort);
            System.out.println("Sent #" + i++);
            try {
                dout.send(data);
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        audioIn.close();
        audioIn.drain();
        System.out.println("Thread stop");
    }
}
