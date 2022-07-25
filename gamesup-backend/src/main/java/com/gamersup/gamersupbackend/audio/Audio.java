package com.gamersup.gamersupbackend.audio;


import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.TargetDataLine;
import java.net.DatagramSocket;
import java.net.InetAddress;

/**
 * It's an audio output
 */
public class Audio {

    // port should be input
    public int port = 9999;
    public String address = "127.0.0.1";
    TargetDataLine audioIn;
    private RecordThread recordThread;

    public static AudioFormat getAudioFormat() {
        float sampleRate = 8000.0F;
        int sampleSizeInbites = 16;
        int channel = 2;
        boolean signed = true;
        boolean bigEndian = false;
        return new AudioFormat(sampleRate, sampleSizeInbites, channel, signed, bigEndian);
    }


    /**
     * Initialized audio output as the audio input
     * TODO: Recognize userId then ignore the audio by their own
     */
    public void initAudio() {
        AudioFormat format = getAudioFormat();
        DataLine.Info info = new DataLine.Info(TargetDataLine.class, format);
        if (!AudioSystem.isLineSupported(info)) {
            System.out.println("not support");
            System.exit(0);
        }

        try {
            audioIn = (TargetDataLine) AudioSystem.getLine(info);
            audioIn.open(format);
            audioIn.start();
            recordThread = new RecordThread(true);
            InetAddress inetAddress = InetAddress.getByName(address);
            recordThread.audioIn = audioIn;
            recordThread.dout = new DatagramSocket();
            recordThread.serverIp = inetAddress;
            recordThread.serverPort = port;

            ClientVoice.calling = true;

            recordThread.start();



        } catch (Exception e) {
            // ignore
        }

    }

    public void close() {
        recordThread.calling = false;
    }

    public static void main(String[] args) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {
                Audio audio = new Audio();
                audio.initAudio();
            }
        });
    }
}
