package com.ej2nytime;
 
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;


public class TestModule extends ReactContextBaseJavaModule {
 
    public TestModule(final ReactApplicationContext reactContext) {
        super(reactContext); // required by React Native
    }

    @Override
    // getName is required to define the name of the module represented in
    // JavaScript
    public String getName() {
        return "Test"; // nombbre con el que lo llamo en reactnative "NativeModules.Test;""
    }

    @ReactMethod
    public void TakeColor(final Callback errorCallback, final Callback successCallback) {
        try {
            double R = Math.random()* 256;
            double G = Math.random()* 256;
            double B = Math.random()* 256;
            System.out.println("Greetings from Java");
            successCallback.invoke("rgb("+R+","+G+","+B+")");
        } catch (final IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}