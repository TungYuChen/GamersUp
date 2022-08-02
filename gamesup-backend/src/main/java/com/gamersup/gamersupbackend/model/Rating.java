package com.gamersup.gamersupbackend.model;

/**
 * The class Rating stores the data about a game with one rating or a rater with the dot product
 * comparison with the user.
 */
public class Rating implements Comparable<Rating> {
    private long item;
    private double value;

    public Rating(long item, String value) {
        this.item = item;
        this.value = Double.parseDouble(value.trim());
    }

    public Rating(long item, double value) {
        this.item = item;
        this.value = value;
    }

    public long getItem() {
        return item;
    }

    public void setItem(long item) {
        this.item = item;
    }

    public double getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = Double.parseDouble(value.trim());
    }

    @Override
    public int compareTo(Rating o) {
            if (value < o.value)
                return -1;
            if (value > o.value)
                return 1;

            return 0;
    }
}
