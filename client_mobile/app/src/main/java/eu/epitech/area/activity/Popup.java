package eu.epitech.area.activity;

import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.app.Activity;

import android.os.Bundle;
import android.view.Gravity;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;

import androidx.fragment.app.Fragment;

import eu.epitech.area.R;

public class Popup extends Activity {
    PopupWindow popup;
    LinearLayout layout;
    TextView tv;
    LinearLayout.LayoutParams params;
    LinearLayout mainLayout;
    Button but;
    boolean click = true;

    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        popup = new PopupWindow(this);
        layout = new LinearLayout(this);
        mainLayout = new LinearLayout(this);
        tv = new TextView(this);
        but = new Button(this);
        but.setText("Click me!");
        but.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(click) {
                    popup.showAtLocation(mainLayout, Gravity.BOTTOM, 10, 10);
                    popup.update(50, 50, 300, 80);
                    click = false;

                }else{
                    popup.dismiss();
                    click = true;
                }
            }
        });

        params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        layout.setOrientation(LinearLayout.VERTICAL);
        tv.setText("Hi this is a sample text for the popup window");
        layout.addView(tv, params);
        popup.setContentView(layout);
        // popup.showAtLocation(layout, Gravity.BOTTOM, 10, 10);
        mainLayout.addView(but, params);
        setContentView(mainLayout);
    }

        public static void showPopup(LayoutInflater inflater, ViewGroup container, String message) {
            // We need to get the instance of the LayoutInflater, use the context of this activity

            //Inflate the view from a predefined XML layout
            View layout = inflater.inflate(R.layout.popup_layout, container.findViewById(R.id.popup_element));

            // create a 300px width and 470px height PopupWindow
            final PopupWindow pw = new PopupWindow(layout, layout.getWidth()-200, 500, true);
            pw.showAtLocation(layout, Gravity.CENTER, 0, 0);

            // Create the text view
            TextView mResultText = (TextView) layout.findViewById(R.id.popup_text);
            mResultText.setText(message);

            Button cancelButton = (Button) layout.findViewById(R.id.end_data_send_button);
            cancelButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    pw.dismiss();
                }
            });

            ObjectAnimator fadeIn = ObjectAnimator.ofFloat(layout, "alpha", .3f, 1f);
            fadeIn.setDuration(200);

            final AnimatorSet mAnimationSet = new AnimatorSet();
            mAnimationSet.play(fadeIn);
            mAnimationSet.start();
        }


}